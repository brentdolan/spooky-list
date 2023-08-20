import argparse
import csv
import json
import os
import re
from typing import List

from django.core.management import BaseCommand

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "api.settings")

from movies.models import Movie, Person, Genre

genre_list = [
    "home invasion",
    "survival",
    "paranoia",
    "isolation",
    "slasher",
    "haunted house",
    "ghosts",
    "possession",
    "demon",
    "witches",
    "occult",
    "folk horror",
    "found footage",
    "body horror",
    "backwoods slasher",
    "gore",
    "cannibalism",
    "monster",
    "alien",
    "zombie",
    "virus",
    "gothic",
    "lovecraftian",
    "post apocalypse",
]


def map_keyword_to_subgenre(keyword: str) -> str:
    match keyword:
        case "demonic possession":
            return "Possession"
        case "ghost":
            return "Ghosts"
        case "backwoods slasher":
            return "Slasher"
        case _:
            if keyword in genre_list:
                return keyword.title()
            return ""


all_genres = Genre.objects.all()
genre_map = {g.name: g for g in all_genres}

all_people = Person.objects.all()
people_map = {p.__str__(): p for p in all_people}


def slugify(string: str):
    return string.lower().replace(" ", "-")


def pull_movie_data(filepath):
    all_movies = []

    with open(filepath, "r", newline="\n") as file:
        reader = csv.DictReader(file, delimiter="|")

        for row in reader:
            movie = {**row, "cast_and_crew": [], "genres": []}
            # movie = Movie({**movie_data})
            # We don't want the cast from here, since they need to be Models for Django

            # Scan cast and crew for directors and cast
            director: Person
            cast_and_crew = []
            # We want to replace any single quote OTHER THAN those in a name, which `\B` helps with
            cast_string = re.sub(r"(\B'|'\B)", "\"", row.get("cast_and_crew"))
            for cast_member in json.loads(cast_string):
                first_name = cast_member.get("first_name")
                last_name = cast_member.get("last_name")
                full_name = f"{first_name} {last_name}"

                # Create a person if they aren't in the DB, else use the one that exists
                person: Person
                if full_name in people_map:
                    person = people_map[full_name]
                else:
                    person = Person(first_name=first_name, last_name=last_name)
                    people_map[full_name] = person

                # Separate cast from directors for later
                if cast_member.get("role", "cast") == "director":
                    director = person
                else:
                    cast_and_crew.append(person)

            genres = []
            # Scan genres
            genre_string = row.get("genres").replace("'", "\"")
            for genre_name in json.loads(genre_string):
                # Skip the random ones like 'Adventure' or 'Fantasy'. This isn't Lord of the Rings.
                if genre_name.lower() not in ["comedy", "thriller", "sci-fi"]:
                    continue

                # Use existing genre if it exists -- otherwise, skip
                genre: Genre
                if genre_name.lower() in genre_map:
                    genre = genre_map[genre_name.lower()]
                else:
                    genre = Genre(name=genre_name.title(), slug=slugify(genre_name))
                    genre_map[genre_name.lower()] = genre

                genres.append(genre)

            # Scan keywords for trigger warnings and subgenres
            keyword_string = row.get("keywords").replace("'", "\"")
            for keyword in json.loads(keyword_string):
                subgenre_name = map_keyword_to_subgenre(keyword)

                # Need trigger warnings
                if "rape" in keyword.lower():
                    movie["trigger_warning"] = "Sexual Assault"

                # If the keyword doesn't have a subgenre we care about, skip
                if subgenre_name == "":
                    continue

                # Use existing genre if it exists -- otherwise, skip
                subgenre: Genre
                if subgenre_name.lower() in genre_map:
                    subgenre = genre_map[subgenre_name.lower()]
                else:
                    subgenre = Genre(name=subgenre_name, slug=slugify(subgenre_name))
                    genre_map[subgenre_name.lower()] = subgenre

                genres.append(subgenre)

            movie["genres"] = genres
            movie["cast_and_crew"] = cast_and_crew
            movie["director"] = director
            all_movies.append(movie)

    return all_movies


def save_genres():
    for genre in genre_map.values():
        if genre.id is not None:
            continue

        genre.save()


def save_people():
    for person in people_map.values():
        if person.id is not None:
            continue

        person.save()


def save_movies(movie_list):
    for movie in movie_list:
        movie_to_add = Movie(
            id=movie.get("id"),
            title=movie.get("title"),
            description=movie.get("description"),
            release_date=movie.get("release_date"),
            length_minutes=movie.get("length_minutes"),
            poster=movie.get("poster"),
            amazon_link=movie.get("amazon_link"),
            trigger_warning=movie.get("trigger_warning", ""),
            rating=movie.get("rating")
        )

        movie_to_add.save()

        if movie.get("director", None):
            movie_to_add.cast_and_crew.add(movie.get("director"), through_defaults={"role": "director"})

        if len(movie.get("cast_and_crew", [])) > 0:
            movie_to_add.cast_and_crew.set(movie.get("cast_and_crew", []), through_defaults={"role": "cast"})
        else:
            print("NO CAST => ", movie)

        if len(movie.get("genres", [])) > 0:
            movie_to_add.genres.set(movie.get("genres", []))
        else:
            print("NO GENRES => ", movie)


class Command(BaseCommand):
    def add_arguments(self, parser):
        parser.add_argument("-f", "--file", metavar="file_path", required=True, dest="file_path",
                            help="File path to CSV file")

    def handle(self, *args, **kwargs):
        if not kwargs["file_path"]:
            print("Cannot import without filepath")

        file_path = kwargs["file_path"]
        all_movies = pull_movie_data(file_path)
        save_genres()
        save_people()
        save_movies(all_movies)
