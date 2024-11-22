from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .coin_gecko import buscar_dados_criptomoedas, CoinGeckoAPI
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import Favorito
from rest_framework.exceptions import ValidationError

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_criptomoedas(request):
    dados = buscar_dados_criptomoedas()
    if dados is not None:
        return Response(dados)
    else:
        return Response(
            {'erro': 'Falha ao buscar dados da API'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"detail": "Email e senha são obrigatórios."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, username=email, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = refresh.access_token

            return Response({
                "access_token": str(access_token),
                "refresh_token": str(refresh),
            }, status=status.HTTP_200_OK)

        return Response({"detail": "Credenciais inválidas."}, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response(
            {'detail': 'Logout realizado com sucesso!'},
            status=status.HTTP_200_OK,
        )


class FavoritarMoedaView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        usuario = request.user
        moeda_id = request.data.get('moeda_id')
        nome_moeda = request.data.get('nome_moeda')
        simbolo = request.data.get('simbolo')

        if not moeda_id or not nome_moeda or not simbolo:
            raise ValidationError(
                'Os campos moeda_id, nome_moeda e simbolo são obrigatórios.'
            )

        favorito, created = Favorito.objects.get_or_create(
            usuario=usuario,
            moeda_id=moeda_id,
            defaults={'nome_moeda': nome_moeda, 'simbolo': simbolo},
        )

        if created:
            return Response(
                {'detail': 'Moeda favoritada com sucesso!'},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {'detail': 'Essa moeda já está nos favoritos.'},
                status=status.HTTP_200_OK,
            )


class RemoverFavoritoView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, moeda_id):
        usuario = request.user
        try:
            favorito = Favorito.objects.get(usuario=usuario, moeda_id=moeda_id)
            favorito.delete()
            return Response(
                {'detail': 'Moeda removida dos favoritos com sucesso!'},
                status=status.HTTP_200_OK,
            )
        except Favorito.DoesNotExist:
            return Response(
                {'detail': 'Favorito não encontrado.'},
                status=status.HTTP_404_NOT_FOUND,
            )

class ListarFavoritosView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        favoritos = Favorito.objects.filter(usuario=request.user)
        data = [
            {
                "moeda_id": favorito.moeda_id,
                "nome_moeda": favorito.nome_moeda,
                "simbolo": favorito.simbolo,
            }
            for favorito in favoritos
        ]
        return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def moeda_detalhes(request, moeda_id):
    api = CoinGeckoAPI()
    dados = api.get_detalhes_moedas(moeda_id)
    if dados:
        resultado = {
            "nome": dados.get("name"),
            "preco_atual": dados["market_data"]["current_price"]["brl"],
            "variacao_percentual_1d": dados["market_data"]["price_change_percentage_24h"],
            "variacao_percentual_7d": dados["market_data"]["price_change_percentage_7d"],
            "variacao_percentual_1m": dados["market_data"]["price_change_percentage_30d"],
            "capitalizacao_mercado": dados["market_data"]["market_cap"]["brl"],
            "volume_24h": dados["market_data"]["total_volume"]["brl"]
        }
        return Response(resultado)
    return Response({"detail": "Moeda não encontrada."}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def moeda_historico(request, moeda_id):
    intervalo = request.query_params.get('interval', '7d')
    api = CoinGeckoAPI()
    historico = api.get_historico_de_preco(moeda_id, intervalo)
    if historico:

        resultado = {
            "precos": historico["prices"]
        }
        return Response(resultado)
    return Response({"detail": "Histórico de preços não encontrado."}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_profile(request):
    if request.user.is_authenticated:
        user = request.user
        return Response({
            "username": user.username,
            "email": user.email
        })
    else:
        return Response({"error": "User not authenticated"}, status=401)