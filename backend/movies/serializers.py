from .models import Movie, Person
from rest_framework import serializers


class MovieSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Movie
        fields = "__all__"


class PersonSerializer(serializers.HyperlinkedModelSerializer):
    id = serializers.IntegerField(read_only=True)

    class Meta:
        model = Person
        fields = "__all__"
