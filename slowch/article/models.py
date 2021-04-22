from django.utils.translation import gettext_lazy as _
from django.db import models

from user.models import Account


class BaseMixins(models.Model):
   created_at = models.DateTimeField(auto_now_add=True)
   modified_at = models.DateTimeField(auto_now=True)

   class Mata:
       abstract = True


class Article(BaseMixins):
    title = models.CharField(_("title"), max_length=100, null=False)
    raw_content = models.TextField(_("raw content"), max_length=10000,
                                   null=False, blank=False)
    html_content = models.TextField(_("html content"), max_length=20000,
                                    null=True, blank=True)
    author = models.ForeignKey(to=Account, verbose_name=_("author"),
                               on_delete=models.SET_NULL, null=True)

    def __str__(self) -> str:
        return self.title

