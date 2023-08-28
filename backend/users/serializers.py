from rest_framework import serializers
from django.contrib.auth import get_user_model
from rest_framework.response import Response

UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(required=True)
    password = serializers.CharField(write_only=True, required=False)

    def create(self, validated_data):
        user_fields = {
            "id": "",
            "email": "",
            "first_name": "",
            "last_name": ""
        }

        for field, _ in user_fields.items():
            if field not in validated_data:
                print(f"FAILED WITHOUT {field}: {validated_data}")
                return Response(status=500, data={"Message": f"Required field missing: {field}"})
            user_fields[field] = validated_data[field]

        print("USER FIELDS => ", user_fields)
        user = UserModel.objects.create_user(**{**user_fields, "username": user_fields["email"]})

        return user

    class Meta:
        model = UserModel
        fields = ('id', 'password', 'email', 'first_name', 'last_name')
        write_only_fields = ('password',)
