import datetime
from email.utils import parsedate
import time
import uuid
from django.contrib import admin
from django.contrib.auth import get_user_model

from django.db import models
from django.db.models import Q

cast_filter = ~models.Q(role="director")


# Create your models here.
class Person(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    first_name = models.CharField()
    last_name = models.CharField()
    movies = models.ManyToManyField(
        "Movie",
        related_name="+",
        default=None,
        blank=True,
        through="MovieCastAndCrew"
    )

    def full_name(self):
        full_name = self.__str__()
        return full_name

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Movie(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    release_date = models.DateField(blank=True, default=datetime.date.min)
    rating = models.CharField(blank=True, default="")
    length_minutes = models.IntegerField(blank=True, default=0)
    poster = models.URLField(blank=True, default="")
    amazon_link = models.URLField(blank=True, default="")
    trigger_warning = models.CharField(blank=True, default="")
    # Relationships
    where_to_watch = models.ManyToManyField(
        "StreamingPlatform",
        related_name="+",
        default=None,
        blank=True,
        through="StreamingPlatformMovies"
    )
    genres = models.ManyToManyField(
        "Genre",
        related_name="+",
        default=None,
        blank=True,
        through="MovieGenre"
    )
    cast_and_crew = models.ManyToManyField(
        Person,
        related_name="+",
        default=None,
        blank=True,
        through="MovieCastAndCrew"
    )

    def director(self):
        return (
            MovieCastAndCrew.objects
            .filter(
                movie_id=self.id,
                role="director"
            )
            .first()
        )

    def user_watched(self, user_id):
        return (
            UserWatchedMovies.objects.filter(user_id=user_id, movie_id=self.id).count() > 0
        )

    def on_user_list(self, list_id):
        print(list_id, self.id)
        return (
            MovieList.objects.filter(list_id=list_id, movie_id=self.id).count() > 0
        )

    def other_recommendations(self):
        recommendation_ids = []
        gallery_row_length = 6

        # Fetch other movies in Genre
        genre_ids = [genre.id for genre in self.genres.all()]
        genre_other_movies = (
            MovieGenre.objects.
            filter(genre_id__in=genre_ids).
            exclude(movie_id=self.id).
            all()[:gallery_row_length]
        )

        # Add to recommendations list
        for movie_genre in genre_other_movies:
            recommendation_ids.append(movie_genre.movie_id)

        # Fetch other movies by Director
        director_other_movies = []
        if self.director() is not None:
            director_id = self.director().id
            director_other_movies = (
                MovieCastAndCrew.objects.
                filter(
                    role="director",
                    person_id=director_id
                ).
                exclude(movie_id=self.id).
                all()[:gallery_row_length]
            )

        # Add to recommendations list
        for movie_director in director_other_movies:
            recommendation_ids.append(movie_director.movie_id)

        # Fetch the full movie objects from the list of IDs
        return [movie for movie in (
            Movie.objects.
            filter(id__in=recommendation_ids).
            all()[:gallery_row_length]
        )]

    def __str__(self):
        if Movie.objects.filter(title=self.title).count() > 1:
            return f'{self.title} ({self.release_date.year if self.release_date else "Year Unknown"})'
        else:
            return self.title


class StreamingPlatform(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")
    name = models.CharField(max_length=100)
    base_url = models.URLField(blank=True, default="")
    movies = models.ManyToManyField(
        Movie,
        related_name="+",
        default=None,
        blank=True,
        through="StreamingPlatformMovies"
    )


class Genre(models.Model):
    id = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")
    name = models.CharField(max_length=100)
    slug = models.SlugField(blank=True, default="")
    movies = models.ManyToManyField(
        Movie,
        related_name="+",
        default=None,
        blank=True,
        through="MovieGenre",
    )

    def __str__(self):
        return self.name


class List(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4(), editable=False)
    user_id = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    movies = models.ManyToManyField(
        Movie,
        related_name="+",
        default=None,
        blank=True,
        through="MovieList"
    )


# JOIN TABLES

class MovieGenre(models.Model):
    class Meta:
        db_table = "movies_movie_genre"

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    genre = models.ForeignKey("Genre", on_delete=models.CASCADE)


class StreamingPlatformMovies(models.Model):
    class Meta:
        db_table = "movies_streaming_platform_movies"

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    streaming_platform = models.ForeignKey("StreamingPlatform", on_delete=models.CASCADE)


class MovieCastAndCrew(models.Model):
    class Meta:
        db_table = "movies_movie_cast_and_crew"

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    role = models.CharField(blank=True, default="cast")


class MovieList(models.Model):
    class Meta:
        db_table = "movies_movie_list"

    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    list = models.ForeignKey(List, on_delete=models.CASCADE)
    date_added = models.DateTimeField(default=datetime.datetime.now())
    date_watched = models.DateTimeField(default=None, blank=True, null=True)


class UserWatchedMovies(models.Model):
    class Meta:
        db_table = "movies_user_watched_movies"

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    movie: Movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    date_watched = models.DateTimeField(default=datetime.datetime.now())

    def data(self):
        parsed_date = ""
        
        if self.date_watched:
            date_watched_date = str(self.date_watched).split(" ")[0] # YYYY-MM-DD
            year, month, day = date_watched_date.split("-") # [YYYY, MM, DD]
            parsed_date = f"{month}/{day}/{year}" # "MM/DD/YYYY"

        return {
            "id": self.movie.id,
            "date_watched": parsed_date,
            "title": self.movie.title,
            "poster": self.movie.poster,
        }


class UserStreamingPlatform(models.Model):
    class Meta:
        db_table = "movies_user_streaming_platform"

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    streaming_platform = models.ForeignKey(StreamingPlatform, on_delete=models.CASCADE)


class UserStreamingPlatformInline(admin.TabularInline):
    model = UserStreamingPlatform
    extra = 1
