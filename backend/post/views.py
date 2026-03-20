from rest_framework import generics, permissions
from .models import Post
from .serializers import PostSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response

class PostListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Yahan se filter(user=...) hata diya kyunki model mein user nahi hai
        return Post.objects.all()

class PostCreateAPIView(generics.CreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        # Yahan se user=self.request.user hata diya
        serializer.save()

class PostUpdateAPIView(generics.UpdateAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()

class PostDeleteAPIView(generics.DestroyAPIView):
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Post.objects.all()
    
class PostDownloadAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        try:
            # Yahan se bhi user filter hata diya
            post = Post.objects.get(pk=pk)
            return Response({
                "file_url": post.file.url
            })
        except Post.DoesNotExist:
            return Response({"error": "File not found"}, status=404)