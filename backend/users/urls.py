from django.urls import path
from .views import RegisterAPI, MeAPI

urlpatterns = [
    path("register", RegisterAPI.as_view(), name="register"),
    path("me", MeAPI.as_view(), name="me")
]
