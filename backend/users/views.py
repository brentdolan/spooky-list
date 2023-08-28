from rest_framework.generics import GenericAPIView
from rest_framework.response import Response

from users.serializers import UserSerializer


# Create your views here.

class RegisterAPI(GenericAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        print("REQUEST => ", request.data)
        print("ARGS => ", args)
        print("KWARGS => ", kwargs)
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response({
                "message": "Failed to create user."
            }, status=500)

        user = serializer.save()
        print(user)
        return Response({
            "user": {
                "id": user.id,
                "email": user.email
            }
        })

