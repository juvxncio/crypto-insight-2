import requests

def buscar_dados_criptomoedas():
    url = "https://api.coingecko.com/api/v3/coins/markets"
    params = {
        'vs_currency': 'brl',
        'order': 'market_cap_desc',
        'per_page': 10,
        'page': 1,
        'sparkline': False
    }

    resposta = requests.get(url, params=params)

    if resposta.status_code == 200:
        return resposta.json()
    else:
        return None
