from django.db import models

class Crypto(models.Model):
    nome = models.CharField(max_length=100)
    simbolo = models.CharField(max_length=100)
    preco = models.DecimalField(max_digits=20, decimal_places=8)
    volume = models.DecimalField(max_digits=20, decimal_places=8)

    def __str__(self):
        return f'{self.nome} ({self.simbolo})'