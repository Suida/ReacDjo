from django.utils.translation import gettext_lazy as _
from django.db import models
from django.contrib.auth.models import User


class Gender(models.IntegerChoices):
    UNKNOWN = 0, _("unknown")
    MALE = 1, _("male")
    FEMALE = 2, _("female")


class Role(models.IntegerChoices):
    ADMIN = 0, _('admin')
    NORMAL = 1, _('normal')
    NORMAL_PLUS = 2, _('normal plus')


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.IntegerField(choices=Gender.choices, default=Gender.UNKNOWN)
    role = models.IntegerField(choices=Role.choices, default=Role.NORMAL)

    def __str__(self) -> str:
        return self.user.username
