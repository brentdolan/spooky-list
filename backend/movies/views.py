from webbrowser import get
from django.db.models import Count
from django.contrib.auth import get_user_model
from users.views import NOT_FOUND_RESPONSE, MeAPI
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, permissions


from .models import Movie, UserWatchedMovies
from .serializers import MovieSerializer

USER_MODEL = get_user_model()

def query_param(view_set, param_name: str = ""):
    if not str:
        return None

    else:
        return view_set.request.query_params.get(param_name, None)


# Create your views here.
class MovieViewSet(viewsets.ModelViewSet):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def retrieve(self, request, pk=None):
        user = MeAPI.get_user_from_cookie(request)
        user_primary_list = user.list_set.first()

        movie: Movie = Movie.objects.filter(id=pk).first()

        if not pk or not movie:
            return NOT_FOUND_RESPONSE
        
        serialized_movie = MovieSerializer(movie)
        print(movie.on_user_list(user_primary_list.id))

        return Response(data={
            **serialized_movie.data,
            "is_watched": movie.user_watched(user.id),
            "is_on_list": movie.on_user_list(user_primary_list.id)
        })

    @action(methods=["get"], detail=False, url_path="homefeed", permission_classes=[permissions.AllowAny])
    def homefeed(self, request):
        family_friendly_ids = [80, 121, 1, 67, 91, 13]
        most_popular_ids = [73, 155, 125, 46, 88, 29]
        deep_cut_ids = [19, 85, 171, 128, 109, 172]

        family_friendly_movies = (
            Movie.objects.filter(id__in=family_friendly_ids).all()
        )

        most_popular_movies = (
            Movie.objects.filter(id__in=most_popular_ids).all()
        )

        deep_cut_movies = (
            Movie.objects.filter(id__in=deep_cut_ids).all()
        )

        def to_response_obj(movie):
            return {
                "id": movie.id,
                "title": movie.title,
                "poster": movie.poster
            }

        return Response(data={
            "most_popular": [to_response_obj(movie) for movie in most_popular_movies],
            "family_friendly": [to_response_obj(movie) for movie in family_friendly_movies],
            "deep_cuts": [to_response_obj(movie) for movie in deep_cut_movies]
        })
