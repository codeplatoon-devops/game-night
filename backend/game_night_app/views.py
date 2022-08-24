from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse, JsonResponse
from django.contrib.auth import authenticate, login, logout
from rest_framework.decorators import api_view
# pip install stream-chat
import stream_chat
import requests
import os
from dotenv import load_dotenv
from .models import AppUser, Event, EventGame, EventRequest, EventUser, Group, GroupList, GroupRequest
import random
from django.contrib.auth.decorators import login_required


load_dotenv()



# Create your views here.
def send_the_homepage(request):
    theIndex = open('static/index.html').read()
    return HttpResponse(theIndex)

@api_view(['GET'])
def create_chat_user_token(request):
    try:
        user_email= request.user.email
        user = AppUser.objects.get(email = user_email)
        user_id= str(user.id)
        print('IN TOKEN ON DJANGO, user', user, 'user id', user_id)
        server_client = stream_chat.StreamChat(api_key=os.environ['chatapikey'], api_secret=os.environ['secretchatkey'])
        token = server_client.create_token(user_id)
        print('IN CREATE CHAT USER TOKEN, TOKEN IS', token)
        return JsonResponse({'succes':'true', 'token': token})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to create token, {str(e)}'})

@api_view(['GET'])
def stream_api(request):
    api=os.environ['stream_key']
    print('IN STREAM API REQUEST', api, 'type', type(api))
    try:
        return JsonResponse({'succes':'true', 'api': api})
    except Exception as e:
        return JsonResponse({'success': "false", 'reason': f'failed to send key, {str(e)}'})

    
@api_view(['POST'])
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
def create_event_request(request):
    print('YOU ARE IN THE POST REQUEST ON DJANGO FOR CREATE EVENT REQUESTS')
    user_email = request.user.email
    friend_email = request.data['friend_email']
    # could give the user the option to invite an entire group or send to specific individuals - the rest of the code assumes an individual, but I would think group invite would be nice as well.
    # would need if we do group invite:::: group_code = request.data['group_code']
    event_code = request.data['event_code']
    print('USER EMAIL', user_email, 'FRIEND EMAIL', friend_email, 'event code', event_code)
    user = AppUser.objects.get(email = user_email)
    friend = AppUser.objects.get(email = friend_email)
    event = Event.objects.get(code = code)
    if event is not None:
        if friend is not None:
            try:
                event_request = EventRequest(sender = user, receiver = friend, event = event)
                event_request.full_clean
                event_request.save()
                print('YOUR NEW EVENT REQUEST IS', event_request)
                return JsonResponse({'success': "True", 'action':'event request created in db'})
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
        else:
            return JsonResponse({'success': "False", 'reason': 'friends account doesnt exist'})
    else:
        return JsonResponse({'success': "False", 'reason': 'event doesnt exist'})

@api_view(['GET'])
def view_event_request(request):
    print('YOU ARE IN THE GET REQUEST ON DJANGO FOR VIEW EVENT REQUESTS')
    user_email = request.user.email
    user = AppUser.objects.get(email = user_email)
    # view any requests sent to the user
    event_requests = EventRequest.objects.filter(receiver= user, is_active = True)
    if event_requests:
        list_of_event_requests=[]
        for item in event_requests:
            #sends back the emails of all pending event requests
            sender = item.sender
            list_of_event_requests.append(sender.email)
        print('list of event_requests:', list_of_event_requests)
        try:
            return JsonResponse({'success': "True", 'event_requests': list_of_event_requests})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': f'something went wrong, {str(e)}'})
    else:
        return JsonResponse({'success': "False", 'reason': "you don't have any group requests"})

@api_view(['POST'])
def log_out(request):
    logout(request)
    print('USER IS LOGGED OUT')
    return JsonResponse({'user logged out': True})

@api_view(['PUT'])
def log_in(request):
    username= request.data['username']
    password = request.data['password']
    user = authenticate(username=username, password=password)
    print('user is', user)
    if user is not None:
        if user.is_active:
            try:
                login(request._request, user)
                print(f"{username} IS LOGGED IN!!!!!!!!!")
                return JsonResponse({'success': "True", 'action': 'user logged in'}) 
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': f'failed to login, {str(e)}'})
        else:
            return JsonResponse({'success': "False", 'reason': 'This account has been disabled, please sign-up again'})
    else:
        return JsonResponse({'success': "False", 'reason': "This account doesn't exist, please sign-up"})    


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




@api_view(['POST'])
def sign_up(request):
    print('IN DJANGO SIGN UP, REQUEST.DATA IS', request.data)
    user_email=request.data['email']
    username = request.data['username']
    password = request.data['password']
    first_name = request.data['firstname']
    last_name = request.data['lastname']
    print('IN DJANGO SIGN UP', user_email, username, first_name, last_name)
    try:
        all_users = AppUser.objects.all()
        all_user_emails=[]
        for user in all_users:
            all_user_emails.append(user.email)
        if user_email in all_user_emails:
            return JsonResponse({'success': "False", 'reason': 'This email already exists, please log-in'})
        else:
            # https://docs.djangoproject.com/en/4.1/ref/contrib/auth/
            newUser = AppUser.objects.create_user(username=username, password=password, email=user_email, last_name= last_name, first_name=first_name)
            newUser.full_clean
            newUser.save()
            list= GroupList(owner = newUser)
            list.full_clean
            list.save()
            print('new user is', newUser, 'new list is', list)
            return JsonResponse({'success': "True", 'action': 'user signed up, list created'})
    except Exception as e:
        return JsonResponse({'success': "False", 'reason': str(e)})

def whoami(request):
    if request.user.is_authenticated:
        print('user authenticated')
        data = serializers.serialize("json", [request.user], fields=['email', 'username'])
        return HttpResponse(data)
    else:
        return JsonResponse({'user': False})

@login_required
@api_view(['GET'])
def group_code(request):
    all_groups = Group.objects.all()
    all_codes = []
    for group in all_groups:
        all_codes.append(group.code)
    code = str(random.randint(10001,99999999))
    while code in all_codes:
        code = str(random.randint(10001,99999999))
    return JsonResponse({'success': 'True', 'group_code': code})

@login_required
@api_view(['POST'])
def create_group(request):
    new_group_name=request.data['name']
    code = request.data['code']
    user = AppUser.objects.get(email = request.user.email)
    try:
        new_group = Group(name = new_group_name, code = code, member = user)
        new_group.full_clean()
        new_group.save()
        print('new group is', new_group)
        # adding the group to their group list
        list = GroupList.objects.get(onwer = user)
        list.group.add(new_group)
        list.save()
        return JsonResponse({'success': "True", 'action': "group created"})
    except Exception as e:
        return JsonResponse({'success': "False", 'reason': str(e)})


@login_required
@api_view(['PUT'])
# accepts a group request
def join_group(request):
    user = AppUser.objects.get(email = request.user.email)
    friend= AppUser.objects.get(email = request.data['friend_email'])
    code = request.data['code']
    list = GroupList.objects.get(owner = user)
    all_groups = Group.objects.all()
    all_codes = []
    for group in all_groups:
        all_codes.append(group.code)
    if code in all_codes:
        if friend != None:
            try:
                group = Group.objects.get(code= code)
                group.member.add(user)
                # not sure I have this right:
                print('group members are', group.member.all())
                # adding this group to their list:
                list.group.add(group)
                list.save()
                # not sure I have this part right:
                print('group has been added to list', group.listgroups)
                # setting the group request to inactive:
                group_request = GroupRequest.objects.get(sender = friend, receiver = user)
                group_request.is_active = False
                group_request.save()
                print('group request is active should now be false', group_request.is_active)
                return JsonResponse({'success': "True", 'action': "group created"})
            except Exception as e:
                return JsonResponse({'success': "False", 'reason': str(e)})
        else:
            return JsonResponse({'success': False, 'reason': 'friends account no longer exists'})
    else:
        return JsonResponse({'success': "False", 'reason': 'this group code doesnt exist'})

@login_required
@api_view(['GET'])
def view_groups(request):
    user = AppUser.objects.get(email = request.user.email)
    groups = Group.objects.filter(member = user)
    if len(groups)>0:
        list_of_groups=[]
        for group in groups:
            list_of_groups.append(group.name)
        print('list of groups line 304:', list_of_groups)
        try:
            return JsonResponse({'success': 'True', 'groups': list_of_groups})
        except Exception as e:
            return JsonResponse({'success': "False", 'reason': str(e)})
    else:
        return JsonResponse({'success': False, 'reason': "you don't have any groups"})


# Alisha comments:
# source ~/VEnvirons/GameNight/bin/activate
# pip install -r requirements.txt
# http://127.0.0.1:8000/
