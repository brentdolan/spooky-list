from django.db.models import QuerySet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from .models import Movie
from .serializers import MovieSerializer


def query_param(view_set, param_name: str = ""):
    if not str:
        return None

    else:
        return view_set.request.query_params.get(param_name, None)


# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def get_queryset(self) -> QuerySet:
        if query_param(self, "group_by") == "category":
            # TODO: Group by categories
            return Movie.objects.all()
        else:
            return Movie.objects.all()

    @action(methods=['get'], detail=False)
    def by_category(self, _):
        categories = {
            "body_horror": [],
            "family_friendly": []
        }

        movies = Movie.objects.all()

        for movie in movies:
            if movie.title in categories:
                categories[movie.title].append(movie.title)

        return Response(categories)
