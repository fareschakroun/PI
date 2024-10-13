from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-ro0vd$wf)9^yr+1efl4z!o-_eo#w8kwjpha9q5a$m6t96xgukk'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = []


INSTALLED_APPS = [
    # ...
    'corsheaders',
]

MIDDLEWARE = [
    # ...
    'corsheaders.middleware.CorsMiddleware',
    #'django.middleware.common.CommonMiddleware',
    # ...
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:8899',
    'http://localhost:8222'
]

CORS_ALLOW_ALL_ORIGINS = True

ROOT_URLCONF = 'matchingCV.urls'



# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'anasmanagement',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',  # Leave it as an empty string for localhost
        'PORT': '',  # Leave it as an empty string for default port
    },
    'user': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'boothandsupplier',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': 'localhost',  # Leave it as an empty string for localhost
        'PORT': '',  # Leave it as an empty string for default port
    }
}



LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = 'static/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
