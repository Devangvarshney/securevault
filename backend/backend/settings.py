import os
from pathlib import Path
from datetime import timedelta
from dotenv import load_dotenv

# 1. BASE_DIR setup
BASE_DIR = Path(__file__).resolve().parent.parent

# --- Isse Replace Karein ---
import os
from pathlib import Path
from dotenv import load_dotenv

# Base Directory: C:\Users\devan\Desktop\assignment\backend
BASE_DIR = Path(__file__).resolve().parent.parent

# .env file root folder mein hai (backend ke bahar)
# BASE_DIR.parent ka matlab hai "assignment" folder
env_path = os.path.join(BASE_DIR.parent, '.env')

if os.path.exists(env_path):
    load_dotenv(env_path)
    print("✅ .env file found and loaded!")
else:
    # Backup: Agar .env backend ke andar hi ho
    load_dotenv(os.path.join(BASE_DIR, '.env'))
    print("⚠️ Searching .env in BASE_DIR...")

# Final Verification
print(f"DEBUG: CLOUD_NAME = {os.getenv('CLOUD_NAME')}")

# 3. SECURITY SETTINGS

SECRET_KEY = os.environ.get("SECRET_KEY")
DEBUG = os.environ.get("DEBUG") == "True"
ALLOWED_HOSTS = os.environ.get("ALLOWED_HOSTS", "*").split(",")

# 4. APPLICATION DEFINITION
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    
    # Cloudinary Storage (Hamesha staticfiles se upar)
    'cloudinary_storage',
    'django.contrib.staticfiles',
    'cloudinary',
    
    # Your Apps
    'accounts',
    'rest_framework',
    'post',
    'corsheaders',
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# 5. CORS & URLS
CORS_ALLOW_ALL_ORIGINS = True
ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# 6. DATABASE
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# 7. AUTHENTICATION & REST FRAMEWORK
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    ),
}

SIMPLE_JWT = {
    'AUTH_HEADER_TYPES': ('Bearer',),
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
}

# 8. CLOUDINARY CONFIGURATION
CLOUDINARY_STORAGE = {
    'CLOUD_NAME': os.getenv('CLOUD_NAME'),
    'API_KEY': os.getenv('API_KEY'),
    'API_SECRET': os.getenv('API_SECRET'),
    'RESOURCE_TYPES': 'auto',
}

# Ye line Django ko batati hai ki files Cloudinary par bhejni hain
# settings.py ke bilkul niche paste karein
STORAGES = {
    "default": {
        "BACKEND": "cloudinary_storage.storage.MediaCloudinaryStorage",
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

# 9. STATIC & MEDIA FILES
STATIC_URL = 'static/'
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# 10. OTHER SETTINGS
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
