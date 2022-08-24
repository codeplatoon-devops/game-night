from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('chattoken', views.create_chat_user_token),
    path('group/create', views.create_group),
    path('group/join', views.join_group),
    path('groups/view', views.view_groups),
    path('group/code', views.group_code),
    path('grouprequest/create', views.create_group_request),
    path('grouprequest/view', views.view_group_request),
    path('eventrequest/create', views.create_event_request),
    path('eventrequest/view', views.view_event_request),
    path('logout', views.log_out),
    path('login', views.log_in),
    path('signup', views.sign_up),
    path('whoami', views.whoami),
    path('games', views.bga_games),
    path('streamapi', views.stream_api),

]
