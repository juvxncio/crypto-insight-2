from django.urls import path
from .views import listar_criptomoedas

urlpatterns = [
    path('criptomoedas/', listar_criptomoedas, name='listar_criptomoedas'),
]