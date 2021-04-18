from django.utils.translation import gettext_lazy as _
from django.db import models

from slowch.models import BaseMixins
from user.models import Account


class Article(models.Model, BaseMixins):
    title = models.CharField(_("title"), max_length=100, null=False)
    raw_content = models.TextField(_("raw content"), max_length=10000,
                                   null=False, blank=False)
    html_content = models.TextField(_("html content"), max_length=20000,
                                    null=True, blank=True)
    author = models.ForeignKey(to=Account, verbose_name=_("author"),
                               on_delete=models.SET_NULL, null=True)

