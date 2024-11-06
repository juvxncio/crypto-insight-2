from django.db import models
from django.conf import settings


class Crypto(models.Model):
    nome = models.CharField(max_length=100)
    simbolo = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=20, decimal_places=8)
    volume = models.DecimalField(max_digits=20, decimal_places=8)

    def __str__(self):
        return f'{self.nome} ({self.simbolo})'


class Favorito(models.Model):
    usuario = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE
    )
    moeda_id = models.CharField(max_length=50)
    nome_moeda = models.CharField(max_length=100)
    simbolo = models.CharField(max_length=10)

    class Meta:
        unique_together = ('usuario', 'moeda_id')

    def __str__(self):
        return f'{self.usuario} - {self.nome_moeda}'
