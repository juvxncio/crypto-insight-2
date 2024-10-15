from django.shortcuts import render
from django.http import JsonResponse
from .coin_gecko import buscar_dados_criptomoedas

def listar_criptomoedas(request):
    dados = buscar_dados_criptomoedas()
    if dados is not None:
        return JsonResponse(dados, safe=False)
    else:
        return JsonResponse({'erro': 'Falha ao buscar dados da API'}, status=500)