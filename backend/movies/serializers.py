from .models import Movie, Person
from rest_framework import serializers


class RecommendationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = "__all__"


class MovieSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    other_recommendations = RecommendationSerializer(many=True)
    genres = serializers.SlugRelatedField(
        many=True,
        read_only=True,
        slug_field="name"
    )

    class Meta:
        model = Movie
        fields = [
            "id",
            "title",
            "description",
            "release_date",
            "rating",
            "length_minutes",
            "poster",
            "amazon_link",
            "trigger_warning",
            "where_to_watch",
            "genres",
            "cast_and_crew",
            # "other_recommendations",
        ]


class PersonSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Person
        fields = "__all__"
