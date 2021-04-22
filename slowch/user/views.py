import time

from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Account
from . import serializers


class AccountView(ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = serializers.AccountSerializer

    @action(methods=['GET'], detail=False)
    def wait(self, request, *args, **kwargs):
        time.sleep(2)
        print(self.queryset)
        return Response([])

