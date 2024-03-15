import argparse
import csv
import json
import os
import re
from typing import List

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
    "supernatural power",
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




def map_keyword_to_subgenre(keyword: str) -> [str, bool]:
    match keyword:
        case "demonic possession":
            return "Possession"
        case "demonic":
            return "Demon"
        case "ghost":
            return "Ghosts"
        case "disney channel movie":
            return "Disney Channel Movie"
        case _:
            if keyword in genre_list:
                return keyword.title(), True
            return ""


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Import a CSV file into the movie database")
    parser.add_argument("-f", "--file", metavar="file_path", required=True, dest="file_path",
                        help="File path to CSV file")

    args = parser.parse_args()
    if not args.file_path:
        print("Cannot import without filepath")

    file_path = args.file_path
    with open(file_path, "r", newline="\n") as file:
        reader = csv.DictReader(file, delimiter="|")

        for row in reader:
            movie_data = {**row, cast_and_crew: [], genres: []}
            movie = Movie({**movie_data})
            # We don't want the cast from here, since they need to be Models for Django

            cast_and_crew: List[Person] = []
            cast_string = re.sub(r"(\B'|'\B)", "\"", row.get("cast_and_crew"))
            for cast_member in json.loads(cast_string):
                person = Person({**cast_member})
                cast_and_crew.append(cast_member)

            genres: List[Genre] = []
            genre_string = row.get("genres").replace("'", "\"")
            for genre in json.loads(genre_string):
                if genre.lower() not in ["comedy", "thriller", "sci-fi"]:
                    continue
                genre = Genre(name=genre, slug=genre.lower())
                genres.append(genre)

            keyword_string = row.get("keywords").replace("'", "\"")
            for keyword in json.loads(keyword_string):
                subgenre = map_keyword_to_subgenre(keyword)
                if subgenre:
                    subgenre = Genre(name=subgenre, slug=subgenre.lower())
                    genres.append(subgenre)

            movie.cast_and_crew = cast_and_crew
            movie.genres = genres

            print(movie)
