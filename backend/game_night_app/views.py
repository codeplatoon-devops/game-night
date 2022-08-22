from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
import requests
import os
from dotenv import load_dotenv

load_dotenv()



# Create your views here.
def send_the_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['POST'])
def log_out(request):
    logout(request)
    return JsonResponse({'user logged out': True})

@api_view(['GET'])
def bga_games(request):
    api_id = str(os.getenv('GM_CLIENT_ID'))
    name = request.query_params['name']
    url = 'https://api.boardgameatlas.com/api/search?'
    payload = {
        'client_id': api_id,
        'name': name,
        'exact': True,
        'limit': 2,
        'fields': 'name,price,url,description_preview,players,playtime,thumb_url,description'

    }
    raw_response = requests.get(url, params=payload)
    json_response = raw_response.json()
    return JsonResponse(json_response)
