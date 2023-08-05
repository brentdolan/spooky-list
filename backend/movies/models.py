from django.db import models


# Create your models here.
class Person(models.Model):
    first_name = models.CharField()
    last_name = models.CharField()

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Movie(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, default="")
    release_date = models.DateField(blank=True, default=None)
    length_minutes = models.IntegerField(blank=True, default=0)
    poster = models.URLField(blank=True, default="")
    amazon_link = models.URLField(blank=True, default="")

    # Relationships
    directed_by = models.ManyToManyField(Person, db_table="movie_directors", related_name="directed", default=None, blank=True)
    cast = models.ManyToManyField(Person, db_table="movie_cast", related_name="appeared_in", default=None, blank=True)

    def __str__(self):
        return f'{self.title} ({self.release_date if self.release_date else "Year Unknown"})'
