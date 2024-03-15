from django.contrib import admin

from .models import Movie, Person, StreamingPlatform, Genre, MovieGenre, MovieCastAndCrew, StreamingPlatformMovies, List


class MovieAdmin(admin.ModelAdmin):
    list_display = ["title", "release_date"]


class GenreAdmin(admin.ModelAdmin):
    list_display = ["name"]


# Register your models here.
admin.site.register(Movie, MovieAdmin)
admin.site.register(Person)
admin.site.register(List)
admin.site.register(MovieGenre)
admin.site.register(MovieCastAndCrew)
admin.site.register(StreamingPlatformMovies)
admin.site.register(StreamingPlatform)
admin.site.register(Genre, GenreAdmin)
