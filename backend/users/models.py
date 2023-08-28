import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=None, editable=False)
    first_name = models.CharField(max_length=100, blank=True, default="")
    last_name = models.CharField(max_length=100, blank=True, default="")
    email = models.EmailField()
    password = models.CharField(max_length=128, blank=True, null=True)
