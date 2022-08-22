from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('chattoken', views.create_chat_user_token),
    path('grouprequest/create', views.create_group_request),
    path('grouprequest/view', views.view_group_request),
    path('logout', views.log_out),
    path('games', views.bga_games),
]
