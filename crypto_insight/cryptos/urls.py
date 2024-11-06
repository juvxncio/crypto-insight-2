from django.urls import path
from .views import listar_criptomoedas
from . import views

urlpatterns = [
    path('criptomoedas/', listar_criptomoedas, name='listar_criptomoedas'),
    path('logout/', views.LogoutView.as_view(), name='logout'),
]