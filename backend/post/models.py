# post/models.py
from django.db import models
from cloudinary.models import CloudinaryField # Isse import karein

class Post(models.Model):
    name = models.CharField(max_length=255)
    # FileField ki jagah CloudinaryField use karein aur resource_type='raw' force karein
    file = CloudinaryField(
        'file', 
        resource_type='raw', 
        folder='vault/documents/'
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name