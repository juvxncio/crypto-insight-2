from django.urls import path
from .views import listar_criptomoedas, FavoritarMoedaView, RemoverFavoritoView
from . import views

urlpatterns = [
    path('criptomoedas/', listar_criptomoedas, name='listar_criptomoedas'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
    path('favoritar/', FavoritarMoedaView.as_view(), name='favoritar-moeda'),
    path('remover-favorito/<str:moeda_id>/', RemoverFavoritoView.as_view(), name='remover-favorito'),
]