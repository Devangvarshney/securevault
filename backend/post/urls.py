from django.urls import path
from .views import (
    PostDownloadAPIView,
    PostListAPIView,
    PostCreateAPIView,
    PostUpdateAPIView,
    PostDeleteAPIView,
)

urlpatterns = [
    path("", PostListAPIView.as_view()),
    path("create/", PostCreateAPIView.as_view()),
    path("update/<int:pk>/", PostUpdateAPIView.as_view()),
    path("delete/<int:pk>/", PostDeleteAPIView.as_view()),
    path("download/<int:pk>/", PostDownloadAPIView.as_view()),
]