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
    
@api_view(['PUT'])
def create_group_request(request):
    print('YOU ARE IN THE PUT REQUEST ON DJANGO FOR CREATE GROUP REQUESTS')
    user_email = request.user.email
    friend_email = request.data['friend_email']
    code = request.data['group_code']
    print('USER EMAIL', user_email, 'FRIEND EMAIL', friend_email, 'code', code)
    # could send multiple emails at once and grab from frontend if we wanted and create a request for each person in the array
    user = AppUser.objects.get(email = user_email)
    friend = AppUser.objects.get(email = friend_email)
    group = Group.objects.get(code = code)
    if group is not None:
        if friend is not None:
            try:
                group_request = GroupRequest(sender = user, receiver = friend, group = group)
                group_request.full_clean
                group_request.save()
                print('YOUR NEW GROUP REQUEST IS', group_request)
                return JsonResponse({'success': "True", 'action':'group request created in db'})
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
        else:
            return JsonResponse({'success': "False", 'reason': 'friends account doesnt exist'})
    else:
        return JsonResponse({'success': "False", 'reason': 'group doesnt exist'})

@api_view(['GET'])
def view_group_request(request):
    print('YOU ARE IN THE GET REQUEST ON DJANGO FOR VIEW GROUP REQUESTS')
    user_email = request.user.email
    user = AppUser.objects.get(email = user_email)
    # view any requests sent to the user
    group_requests = GroupRequest.objects.filter(receiver= user, is_active = True)
    if group_requests:
        list_of_group_requests=[]
        for item in group_requests:
            #sends back the emails of all pending group requests
            sender = item.sender
            list_of_group_requests.append(sender.email)
        print('list of group_requests:', list_of_group_requests)
        try:
            return JsonResponse({'success': "True", 'group_requests': list_of_group_requests})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
    else:
        return JsonResponse({'success': "False", 'reason': "you don't have any group requests"})

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