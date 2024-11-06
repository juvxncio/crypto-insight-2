from django.shortcuts import render
from django.http import JsonResponse
from .coin_gecko import buscar_dados_criptomoedas
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import Favorito
from rest_framework.exceptions import ValidationError


@permission_classes([IsAuthenticated])
def listar_criptomoedas(request):
    dados = buscar_dados_criptomoedas()
    if dados is not None:
        return JsonResponse(dados, safe=False)
    else:
        return JsonResponse({'erro': 'Falha ao buscar dados da API'}, status=500)
    
class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"detail": "Logout realizado com sucesso!"}, status=status.HTTP_200_OK)

class FavoritarMoedaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario = request.user
        moeda_id = request.data.get('moeda_id')
        nome_moeda = request.data.get('nome_moeda')
        simbolo = request.data.get('simbolo')

        if not moeda_id or not nome_moeda or not simbolo:
            raise ValidationError("Os campos moeda_id, nome_moeda e simbolo são obrigatórios.")

        favorito, created = Favorito.objects.get_or_create(
            usuario=usuario,
            moeda_id=moeda_id,
            defaults={'nome_moeda': nome_moeda, 'simbolo': simbolo}
        )

        if created:
            return Response({"detail": "Moeda favoritada com sucesso!"}, status=status.HTTP_201_CREATED)
        else:
            return Response({"detail": "Essa moeda já está nos favoritos."}, status=status.HTTP_200_OK)

class RemoverFavoritoView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, moeda_id):
        usuario = request.user
        try:
            favorito = Favorito.objects.get(usuario=usuario, moeda_id=moeda_id)
            favorito.delete()
            return Response({"detail": "Moeda removida dos favoritos com sucesso!"}, status=status.HTTP_200_OK)
        except Favorito.DoesNotExist:
            return Response({"detail": "Favorito não encontrado."}, status=status.HTTP_404_NOT_FOUND)