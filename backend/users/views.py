import datetime
import os

import jwt
from django.contrib.auth import get_user_model
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.viewsets import GenericViewSet

from movies.models import Movie, List, MovieList
from users.serializers import UserSerializer

SUPABASE_JWT_SECRET = os.environ.get("SUPABASE_JWT_SECRET")

UNAUTHORIZED_RESPONSE = Response(data={"message": "Unauthorized"}, status=401)
INTERNAL_SERVER_ERROR_RESPONSE = Response(data={"message": "Internal Server Error"}, status=500)
NOT_FOUND_RESPONSE = Response(data={"message": "Not found"}, status=400)


# Create your views here.

class RegisterAPI(GenericViewSet):
    serializer_class = UserSerializer

    def create(self, request, *args, **kwargs):
        existing_user = (
            get_user_model()
            .objects
            .filter(id=request.data.get("id"), email=request.data.get("email"))
            .first()
        )

        if existing_user:
            return Response({
                "user": {
                    "id": existing_user.id,
                    "email": existing_user.email
                }
            })

        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response({
                "message": "Failed to create user."
            }, status=500)

        user = serializer.save()

        user_primary_list = List(user_id=user.id)
        user_primary_list.save()

        return Response({
            "user": {
                "id": user.id,
                "email": user.email,
                "primary_list_id": user_primary_list.id
            }
        })


class MeAPI(GenericViewSet):
    serializer_class = UserSerializer

    @staticmethod
    def get_user_from_cookie(request) -> get_user_model():
        if 'HTTP_USER_COOKIE' in request.META:
            cookie = request.META.get("HTTP_USER_COOKIE")
            decoded_cookie = jwt.decode(
                cookie,
                SUPABASE_JWT_SECRET,
                algorithms=["HS256"],
                audience="authenticated"
            )

            exp = decoded_cookie.get("exp", "")
            exp_timestamp = datetime.datetime.fromtimestamp(exp)

            if datetime.datetime.now() > exp_timestamp:
                return None

            username = decoded_cookie.get("email")
            user_id = decoded_cookie.get("sub")

            user = get_user_model().objects.filter(id=user_id, email=username).first()

            return user

    def list(self, request, *args, **kwargs):
        if 'HTTP_USER_COOKIE' in request.META:
            user = self.get_user_from_cookie(request)

            if not user:
                return UNAUTHORIZED_RESPONSE

            return Response(data={
                "email": user.email,
                "first_name": user.first_name,
                "last_name": user.last_name,
            })
        else:
            return UNAUTHORIZED_RESPONSE

    @action(methods=["post"], detail=False, url_path="watched", permission_classes=[permissions.AllowAny])
    def mark_as_watched(self, request, *args, **kwargs):
        user = self.get_user_from_cookie(request)

        if not user:
            return UNAUTHORIZED_RESPONSE

        movie_id = request.data.get("movie_id")
        movie = Movie.objects.filter(id=movie_id).first()

        if not movie:
            return NOT_FOUND_RESPONSE

        user.watched_movies.add(movie)
        user.save()

        for user_list in user.list_set.all():
            for list_movie in user_list.movies.all():
                if list_movie.id == movie.id:
                    user_list_movie = MovieList.objects.filter(movie_id=movie.id, list__id=user_list.id).first()
                    user_list_movie.date_watched = datetime.datetime.now()
                    user_list_movie.save()

        return Response(data={
            "message": "OK"
        })

    @action(methods=["post"], detail=False, url_path="list", permission_classes=[permissions.AllowAny])
    def add_to_primary_list(self, request, *args, **kwargs):
        user: get_user_model() = self.get_user_from_cookie(request)

        if not user:
            return UNAUTHORIZED_RESPONSE

        movie_id = request.data.get("movie_id")
        movie = Movie.objects.filter(id=movie_id).first()

        if not movie:
            return NOT_FOUND_RESPONSE

        user_primary_list: List = user.list_set.first()
        user_primary_list.movies.add(movie, through_defaults={})

        return Response(data={
            "message": "OK"
        })
