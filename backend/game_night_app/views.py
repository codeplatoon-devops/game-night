from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
# pip install stream-chat
import stream_chat
from dotenv import load_dotenv
import os

load_dotenv()



# Create your views here.
def send_the_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['GET'])
def create_chat_user_token(request):
    try:
        user_email= request.user.email
        user = AppUser.Objects.get(email = email)
        user_id= user.id
        server_client = stream_chat.StreamChat(api_key=os.environ['chatapikey'], api_secret=os.environ['secretchatkey'])
        token = server_client.create_token(user_id)
        print('IN CREATE CHAT USER TOKEN, TOKEN IS', token)
        return JsonResponse({'succes':'true', 'token': token})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to create token, {str(e)}'})


# Alisha comments:

# source ~/VEnvirons/GameNight/bin/activate
# pip install -r requirements.txt
# http://127.0.0.1:8000/
