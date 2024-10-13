from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
from django.views.decorators.http import require_http_methods

@csrf_exempt
@require_http_methods(['GET'])
def afficher_donnees(request, input):
    cursor = connection.cursor()
    cursor.execute("SELECT id, id_candidat,offer_id FROM application WHERE id_candidat = %s", (input,))
    list_application_by_user = cursor.fetchall()
    cursor.close()
    nlp = spacy.load('fr_core_news_sm')
    offers_candidat = []
    lis_offers_applied = []
    lis_offers = []
    res_final = []
    for app in list_application_by_user:
        id_application = app[0]
        id_candidat = app[1]
        id_offer = app[2]
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM offer WHERE id = %s", (id_offer,))
        offers_for_candidat = cursor.fetchall()
        cursor.close()
        for offer in offers_for_candidat:
            id_off = offer[0]
            description_off=offer[1]
            exhibitor_id_off=offer[2]
            file_off=offer[3]
            last_date_application_off=offer[4]
            nbr_candidature_off=offer[5]
            offer_off=offer[6]
            titre_off = offer[7]
            doc = nlp(titre_off.lower())
            mots_filtres = [token.lemma_ for token in doc if
                            token.is_alpha and token.text.lower() not in nlp.Defaults.stop_words]
            offre_traitee = ' '.join(mots_filtres)
            mots_offre_traitee = set(mots_filtres)
            #lis_offers_applied.append({'idOffer': id_off, 'titre': titre_off, })
            lis_offers_applied.append({'idOffer': id_off, 'description': description_off, 'exhibitorId': exhibitor_id_off, 'file': file_off,
            'lastDateApplication': last_date_application_off, 'nbr_candidature': nbr_candidature_off, 'offer': offer_off, 'titre': titre_off, })

    cursor = connection.cursor()
    cursor.execute("SELECT * FROM offer")
    list_offers = cursor.fetchall()
    cursor.close()

    for offer in list_offers:
        id_o = offer[0]
        description_o=offer[1]
        exhibitor_id_o=offer[2]
        file_o=offer[3]
        last_date_application_o=offer[4]
        nbr_candidature_o=offer[5]
        offer_o=offer[6]
        titre_o = offer[7]
        doc = nlp(titre_o.lower())
        mots_filtres = [token.lemma_ for token in doc if
                        token.is_alpha and token.text.lower() not in nlp.Defaults.stop_words]
        offre_traitee = ' '.join(mots_filtres)
        mots_offres_traitee = set(mots_filtres)
        lis_offers.append({'idOffer': id_o, 'description': description_o, 'exhibitorId': exhibitor_id_o, 'file': file_o,
        'lastDateApplication': last_date_application_o, 'nbr_candidature': nbr_candidature_o, 'offer': offer_o, 'titre': titre_o, })
        #print(lis_offers)

    historique_offres = lis_offers_applied
    offre_demploi = lis_offers

    compatibilite = evaluer_rebel(historique_offres, offre_demploi)
    print(compatibilite)
    res = [offre for offre in compatibilite if offre['id'] not in [o['idOffer'] for o in historique_offres]]
    res = sorted(res, key=lambda offre: offre['pourcentage'], reverse=True)
    return JsonResponse(res, safe=False)


def evaluer_rebel(historique_offres, offre_demploi):
    result = []

    historique_phrases = [offre['titre'] for offre in historique_offres]
    offre_phrases = [offre['titre'] for offre in offre_demploi]

    print(offre_demploi,"AAAAA")

    occurrences_mots = Counter()
    for phrase in historique_phrases:
        occurrences_mots.update(phrase.lower().split())

    for offre_demp in offre_demploi:
        titre_offre = offre_demp['titre']
        mots_offre = titre_offre.lower().split()
        if len(historique_offres) > 0:
            pourcentage = sum(occurrences_mots[mot] for mot in mots_offre) / len(historique_offres) * 100
        else :
            pourcentage = 0
        if (pourcentage>49):
            result.append({'id': offre_demp['idOffer'], 'pourcentage': pourcentage})
        #'description': offre_demp['description'],  
        #'exhibitorId': offre_demp['exhibitorId'], 
        #'file': offre_demp['file'], 
        #'lastDateApplication': offre_demp['lastDateApplication'], 
        #'nbr_candidature': offre_demp['nbr_candidature'],
        #'offer': offre_demp['offer'],   
        #'titre': offre_demp['titre'], 'pourcentage': pourcentage})
        #{'idOffer': id_o, 'description': description_o, 'exhibitorId': exhibitor_id_o, 'file': file_o,
        #'lastDateApplication': last_date_application_o, 'nbr_candidature': nbr_candidature_o, 'offer': offer_o, 'titre': titre_o, }

    return result