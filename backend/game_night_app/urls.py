from django.urls import path
from . import views

urlpatterns = [
    path('', views.send_the_homepage),
    path('grouprequest/create', views.create_group_request),
    path('grouprequest/view', views.view_group_request),
    path('eventrequest/create', views.create_event_request),
    path('eventrequest/view', views.view_event_request),
    path('logout', views.log_out),
    path('login', views.log_in),
    path('signup', views.sign_up),
    path('whoami', views.whoami),
    path('games', views.bga_games),
    path('calendar', views.calendar),

]
