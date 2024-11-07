import requests


def buscar_dados_criptomoedas():
    url = 'https://api.coingecko.com/api/v3/coins/markets'
    params = {
        'vs_currency': 'brl',
        'order': 'market_cap_desc',
        'per_page': 10,
        'page': 1,
        'sparkline': False,
    }

    resposta = requests.get(url, params=params)

    if resposta.status_code == 200:
        return resposta.json()
    else:
        return None

class CoinGeckoAPI:
    def __init__(self):
        self.base_url = "https://api.coingecko.com/api/v3"

    def get_detalhes_moedas(self, coin_id):
        url = f"{self.base_url}/coins/{coin_id}"
        params = {
            "localization": "false",
            "tickers": "false",
            "market_data": "true",
            "community_data": "false",
            "developer_data": "false",
            "sparkline": "false"
        }
        response = requests.get(url, params=params)
        return response.json() if response.status_code == 200 else None
    
    def get_historico_de_preco(self, coin_id, interval):
        url = f"{self.base_url}/coins/{coin_id}/market_chart"
        days = {
            "1d": "1",
            "7d": "7",
            "1m": "30"
        }.get(interval, "7")
        params = {
            "vs_currency": "brl",
            "days": days
        }
        response = requests.get(url, params=params)
        return response.json() if response.status_code == 200 else None