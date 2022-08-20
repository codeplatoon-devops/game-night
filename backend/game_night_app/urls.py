from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('chattoken', views.create_chat_user_token),
]
