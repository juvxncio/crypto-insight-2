import requests

def buscar_dados_criptomoedas():
    url_api = 'https://api.coingecko.com/api/v3/coins/markets'
    parametros = {
        'vs_currency': 'brl',
        'order': 'market_cap_desc',
        'per_page': 10,
        'page': 1,
        'sparkline': False,
    }
