from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
from django.views.decorators.http import require_http_methods
from PyPDF2 import PdfReader
from django.http import HttpResponse
#from .models import Document
from io import BytesIO
import nltk
from googletrans import Translator
import codecs
from unidecode import unidecode
import re
import pdfplumber
import pytesseract
from PIL import Image
from io import BytesIO
from pdf2image import convert_from_bytes
import subprocess
import PyPDF2
import cv2
import numpy as np
from spacy.matcher import Matcher
import pandas as pd
import io
from pdf2image import convert_from_path
import PyPDF2
import base64
import os
import paddleocr
from paddleocr import PaddleOCR
from django.db import connections
from django.http import HttpResponse

@csrf_exempt
@require_http_methods(['GET'])
def getOffers(request, input):
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM offer ")
    offers = cursor.fetchall()
    cursor.close()
    nlp = spacy.load('fr_core_news_sm')
    lis_offers_applied = []
    for offer in offers:
            id_off = offer[0]
            description_off=offer[1]
            exhibitor_id_off=offer[2]
            file_off=offer[3]
            last_date_application_off=offer[4]
            nbr_candidature_off=offer[5]
            offer_off=offer[6]
            titre_off = offer[7]
            doc = nlp(description_off.lower())
            mots_filtres = [token.lemma_ for token in doc if
                            token.is_alpha and token.text.lower() not in nlp.Defaults.stop_words]
            offre_traitee = ' '.join(mots_filtres)
            mots_offre_traitee = set(mots_filtres)
            print(mots_offre_traitee)
            lis_offers_applied.append({'idOffer': id_off, 'description': description_off, })
            #lis_offers_applied.append({'idOffer': id_off, 'description': description_off, 'exhibitorId': exhibitor_id_off, 'file': file_off,
            #'lastDateApplication': last_date_application_off, 'nbr_candidature': nbr_candidature_off, 'offer': offer_off, 'titre': titre_off, })
            #print(lis_offers_applied)
    return JsonResponse(lis_offers_applied, safe=False)


#convertir blob en pdf
def convert_blob_to_pdf(blob_pdf, output_path):
    # Décoder le BLOB PDF en données binaires
    pdf_data = base64.b64decode(blob_pdf)

    # Écrire les données binaires dans un fichier PDF
    with open('temp.pdf', 'wb') as file:
        file.write(blob)

    print("Conversion terminée. Le PDF a été enregistré sous", output_path)

#Convertir pdf a image
# Convertir les pages du PDF en images
def convert_pdf_to_images(pdf_bytesio):
    images = convert_from_bytes(pdf_bytesio)
    return images


def perform_ocr(images):
    #ocr = paddleocr.OCR()
    ocr = PaddleOCR()
    res = []
    for i,image in enumerate(images):
        print(type(image))
        image_path = f'image_{i}.jpg'
        image.save(image_path, 'JPEG')
        print(f'Chemin de l\'image {i}: {image_path}')
        result = ocr.ocr(image_path)
        for line in result:
            for word in line:
                print(word[1][0])
                #translation_description = []
                #translator = Translator()
                #translation_description = translator.translate(str(word[1]), src="fr", dest="en")
                #print(translation_description.text)
                #res.append(translation_description.text)
                res.append(word[1][0])
    return res


#SCRAP CV POUR ETUDIANT
@csrf_exempt
@require_http_methods(['GET'])
def getCV(request, id_offer,id_user):
    content=""
    # load pre-trained model
    nlp = spacy.load('en_core_web_sm')
    #noun_chunks = nlp.noun_chunks
    with connections['default'].cursor() as cursor:
        query="SELECT description FROM offer WHERE id = %s"
        cursor.execute(query, [id_offer])
        description=cursor.fetchall()
        print(description)
        # Traiter le résultat de la requête
        
        # Exécution de la deuxième requête sur la deuxième base de données
    with connections['user'].cursor() as cursor:
        query="SELECT cv FROM user_credential WHERE id = %s"
        cursor.execute(query, [id_user])
        blob_content=cursor.fetchall()
            # Traiter le résultat de la requête
    print(description)
    #print(blob_content)
        

        #traduction de la description
    translation_description = []
    translator = Translator()
    translation_description = translator.translate(str(description), src="fr", dest="en")
        #output_path = 'D:/Anas INFO/Esprit/4SAE10/SEM2/PI/CVPDF/output.pdf'  # Spécifiez le chemin d'enregistrement souhaité

        # Appeler la fonction pour convertir le BLOB PDF en PDF et spécifier le chemin d'enregistrement
        #convert_blob_to_pdf(blob_content, output_path)
        # 2. Enregistrer le blob en tant que fichier PDF temporaire
    temp_pdf_path = 'temp.pdf'  # Chemin du fichier temporaire PDF
    with open(temp_pdf_path, 'wb') as file:
        file.write(blob_content[0][0])


        #pdf_bytesio = BytesIO(blob_content)

        # Convertir le PDF en images
        #images = convert_pdf_to_images(blob_content)

        # Effectuer la reconnaissance de texte
        
        # Specify the path to the Poppler binaries
    poppler_path = r'D:\Anas INFO\Esprit\4SAE10\SEM2\PI\poppler-24.02.0\Library\bin'
        # 3. Convertir le fichier PDF en image
        # Set the environment variable for Poppler
    os.environ["PATH"] += os.pathsep + poppler_path

        # Convert PDF to images
    images = convert_from_path(temp_pdf_path, dpi=200, poppler_path=poppler_path)

        #perform_ocr(images)
        # Sélectionnez la première page pour convertir en image
    res = perform_ocr(images)
        # Extraire uniquement le texte en minuscules
    text_extracted_lower = [item.split(',')[0].strip("('\"").lower() for item in res]

    texte_interessant = []
        #start_index = text_extracted_lower.index("experiences professionnelles") + 1
        #end_index = text_extracted_lower.index("competences")
        #start_index = text_extracted_lower.index("work experience") + 1
        #end_index = text_extracted_lower.index("skills")
        #texte_interessant = text_extracted_lower[start_index:end_index]

        # reading the csv file
    skills = [
            'python',
            'javascript',
            'java',
            'c++',
            'c#',
            'ruby',
            'go',
            'swift',
            'kotlin',
            'typescript',
            'php',
            'rust',
            'r',
            'matlab',
            'perl',
            'objective-c',
            'scala',
            'lua',
            'groovy',
            'haskell',
            'angular',
            'ionic',
            'react',
            'mongodb',
            'spring',
            'spring boot'
        ] 

    translation_cv = []
    translator = Translator()
    translation_cv = translator.translate(str(text_extracted_lower), src="fr", dest="en")

    nlp_text = nlp(translation_cv.text)

        # removing stop words and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]

    skillset = []
    skillsOffer = []

    nlp_description = nlp(translation_description.text)

        # removing stop words and implementing word tokenization
    tokenss = [token.text for token in nlp_description if not token.is_stop]

    for token in tokenss:
        if token.lower() in skills:
            skillsOffer.append(token.lower())

        
        # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token.lower())
    
    skillset = list(set(skillset))
    #return [i.capitalize() for i in set([i.lower() for i in skillset])]
    print("Skillset",skillset)
    print("skillsOffer",skillsOffer)

    communs = []
    res = 0 

    for mot in skillset:
        if mot.lower() in skillsOffer:
            communs.append(mot.lower())
    if (len(skillsOffer)==0):
        res = 0
    else:    
        res = len(communs)/len(skillsOffer)*100

    print(res)
        # Afficher le texte récupéré
    print(texte_interessant)

        
    #return JsonResponse(text_extracted_lower , safe=False)
    return JsonResponse(res , safe=False)



#SCRAP CV POUR ENTREPRISE
@csrf_exempt
@require_http_methods(['GET'])
def getCVE(request, id_candidature,id_user):
    content=""
    # load pre-trained model
    nlp = spacy.load('en_core_web_sm')
    #noun_chunks = nlp.noun_chunks

    with connections['default'].cursor() as cursor:
        query="SELECT offer_id FROM application WHERE id = %s"
        cursor.execute(query, [id_candidature])
        id_candid=cursor.fetchall()
        queryy = "SELECT description FROM offer WHERE id = %s"
        cursor.execute(queryy, [id_candid])
        description = cursor.fetchall() 
        print(description)
        # Traiter le résultat de la requête
        
        # Exécution de la deuxième requête sur la deuxième base de données
    with connections['user'].cursor() as cursor:
        query="SELECT cv FROM user_credential WHERE id = %s"
        cursor.execute(query, [id_user])
        blob_content=cursor.fetchall()
            # Traiter le résultat de la requête
    print(description)


        #traduction de la description
    translation_description = []
    translator = Translator()
    translation_description = translator.translate(str(description), src="fr", dest="en")
        #output_path = 'D:/Anas INFO/Esprit/4SAE10/SEM2/PI/CVPDF/output.pdf'  # Spécifiez le chemin d'enregistrement souhaité

        # Appeler la fonction pour convertir le BLOB PDF en PDF et spécifier le chemin d'enregistrement
        #convert_blob_to_pdf(blob_content, output_path)
        # 2. Enregistrer le blob en tant que fichier PDF temporaire
    temp_pdf_path = 'temp.pdf'  # Chemin du fichier temporaire PDF
    with open(temp_pdf_path, 'wb') as file:
        file.write(blob_content[0][0])

        #pdf_bytesio = BytesIO(blob_content)

        # Convertir le PDF en images
        #images = convert_pdf_to_images(blob_content)

        # Effectuer la reconnaissance de texte
        
        # Specify the path to the Poppler binaries
    poppler_path = r'D:\Anas INFO\Esprit\4SAE10\SEM2\PI\poppler-24.02.0\Library\bin'
        # 3. Convertir le fichier PDF en image
        # Set the environment variable for Poppler
    os.environ["PATH"] += os.pathsep + poppler_path

        # Convert PDF to images
    images = convert_from_path(temp_pdf_path, dpi=200, poppler_path=poppler_path)

        #perform_ocr(images)
        # Sélectionnez la première page pour convertir en image
    res = perform_ocr(images)
        # Extraire uniquement le texte en minuscules
    text_extracted_lower = [item.split(',')[0].strip("('\"").lower() for item in res]

    texte_interessant = []
        #start_index = text_extracted_lower.index("experiences professionnelles") + 1
        #end_index = text_extracted_lower.index("competences")
        #start_index = text_extracted_lower.index("work experience") + 1
        #end_index = text_extracted_lower.index("skills")
        #texte_interessant = text_extracted_lower[start_index:end_index]

        # reading the csv file
    skills = [
            'python',
            'javascript',
            'java',
            'c++',
            'c#',
            'ruby',
            'go',
            'swift',
            'kotlin',
            'typescript',
            'php',
            'rust',
            'r',
            'matlab',
            'perl',
            'objective-c',
            'scala',
            'lua',
            'groovy',
            'haskell',
            'angular',
            'ionic',
            'react',
            'mongodb',
            'spring',
            'spring boot'
        ] 

    translation_cv = []
    translator = Translator()
    translation_cv = translator.translate(str(text_extracted_lower), src="fr", dest="en")

    nlp_text = nlp(translation_cv.text)

        # removing stop words and implementing word tokenization
    tokens = [token.text for token in nlp_text if not token.is_stop]

    skillset = []
    skillsOffer = []

    nlp_description = nlp(translation_description.text)

        # removing stop words and implementing word tokenization
    tokenss = [token.text for token in nlp_description if not token.is_stop]

    for token in tokenss:
        if token.lower() in skills:
            skillsOffer.append(token.lower())

        
        # check for one-grams (example: python)
    for token in tokens:
        if token.lower() in skills:
            skillset.append(token.lower())
    
    skillset = list(set(skillset))
    #return [i.capitalize() for i in set([i.lower() for i in skillset])]
    print("Skillset",skillset)
    print(skillsOffer)

    communs = []
    res = 0 

    for mot in skillset:
        if mot.lower() in skillsOffer:
            communs.append(mot.lower())
    if (len(skillsOffer)==0):
        res = 0
    else:    
        res = len(communs)/len(skillsOffer)*100

    print(res)
        # Afficher le texte récupéré
    print(texte_interessant)

        
    #return JsonResponse(text_extracted_lower , safe=False)
    return JsonResponse(res , safe=False)





#RECHERCHE MOT DANS CV
@csrf_exempt
@require_http_methods(['GET'])
def rechercheMotCV(request, id_user, mot_rechercher):
    content=""
    occurrences=0
    with connections['user'].cursor() as cursor:
        query="SELECT cv FROM user_credential WHERE id = %s"
        cursor.execute(query, [id_user])
        blob_content=cursor.fetchall()
            # Traiter le résultat de la requête
        nlp = spacy.load('fr_core_news_sm')
        translator = Translator()
        mot_rechercher_translated = translator.translate(mot_rechercher, src="fr", dest="en")
        res_mot_recherche=mot_rechercher_translated.text
        decoded_text_mot = unidecode(res_mot_recherche)
        print(decoded_text_mot)
        #decoded_text_mot=mot_rechercher
        if decoded_text_mot:
            pdf_reader = PdfReader(BytesIO(blob_content[0][0]))
            # Faites quelque chose avec le lecteur PDF, par exemple :
            num_pages = len(pdf_reader.pages)
            for page_number, page in enumerate(pdf_reader.pages, start=1):
                content += f"Page {page_number} : \n{page.extract_text()} \n"
            translator = Translator()
            translation = translator.translate(content.lower(), src="fr", dest="en")
            res=translation.text
            decoded_text = unidecode(res)
            print(decoded_text)
            occurrences=0
            #decoded_text = res.encode('latin-1', errors='replace').decode('utf-8', errors='replace')
            #decoded_text = codecs.escape_decode(res, 'unicode_escape')[0].decode('utf-8')
            #print(content.lower())
            #if (mot_rechercher.lower() in content.lower()):
            #        print(mot_rechercher)
            #        val=val+1
            #print(val)
            #occurrences = occurrences+decoded_text.lower().count(decoded_text_mot.lower())
            occurrences = occurrences+decoded_text.lower().count(mot_rechercher.lower())
            print(occurrences)
            ress=[]
            ress.append({'idApp': id_user, 'occ': occurrences, })

    return JsonResponse(ress , safe=False)