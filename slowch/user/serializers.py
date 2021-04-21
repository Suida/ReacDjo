from django.contrib.auth.models import User
from rest_framework import serializers
from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'password',
        ]
        extra_kwargs = {
            'password': {
                'write_only': True,
            },
        }


class AccountSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    def create(self, validated_data):
        user = User.objects.create(**validated_data.pop('user'))
        validated_data['user'] = user
        return super().create(validated_data)

    class Meta:
        model = models.Account
        fields = [
            'id',
            'gender',
            'user',
            'role',
        ]

