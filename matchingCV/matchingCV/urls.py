"""
URL configuration for matchingCV project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .donnees import afficher_donnees
#from .matchCV import getOffers
from .matchCV import getCV
from .matchCV import getCVE
from .matchCV import rechercheMotCV

app_name = 'matchingCV'

urlpatterns = [
    #path('admin/', admin.site.urls),
    path('donnees/<str:input>', afficher_donnees, name='afficher_donnees'),
    path('match/<str:id_offer>/<str:id_user>', getCV, name='getCV'),
    path('matchE/<str:id_candidature>/<str:id_user>', getCVE, name='getCVE'),
    path('recherche/<str:id_user>/<str:mot_rechercher>', rechercheMotCV, name='rechercheMotCV'),
]
