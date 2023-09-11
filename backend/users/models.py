import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models

from movies.models import StreamingPlatform, Movie


# Create your models here.
class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4(), editable=False)
    first_name = models.CharField(max_length=100, blank=True, default="")
    last_name = models.CharField(max_length=100, blank=True, default="")
    email = models.EmailField()
    password = models.CharField(max_length=128, blank=True, null=True)
    watched_movies = models.ManyToManyField(
        Movie,
        related_name="+",
        default=None,
        blank=True,
        through="movies.UserWatchedMovies"
    )
    streaming_platforms = models.ManyToManyField(
        StreamingPlatform,
        related_name="+",
        default=None,
        blank=True,
        through="movies.UserStreamingPlatform"
    )

