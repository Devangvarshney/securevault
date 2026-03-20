from rest_framework import serializers
from .models import Post



class PostSerializer(serializers.ModelSerializer):
    file = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'name', 'file', 'created_at']

    def get_file(self, obj):
        if obj.file:
            return obj.file.url # Ye hamesha correct Cloudinary URL dega
        return None