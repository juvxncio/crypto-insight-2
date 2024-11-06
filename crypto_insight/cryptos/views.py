from django.shortcuts import render
from django.http import JsonResponse
from .coin_gecko import buscar_dados_criptomoedas
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token


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