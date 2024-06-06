from os import path

from django.contrib import admin
from django.urls import include, path
from back import views


urlpatterns = [  
    path('admin/', admin.site.urls),
    path('movie/<int:id>', views.movieDetails, name='movie'),
    path('movie', views.searchMovie, name='search'),
    path('movieCity', views.movieCity, name='movieCity'), 
    path('showbydate/<int:id>', views.showByDate, name='showbydate'), 
    path('bookmovie/<int:id>', views.bookShow, name='bookShow'),
    path('userdata', views.userDetails, name='userdata'), 
    path("register/", views.registration_view, name="register"),
    path("login/", views.UserLoginView.as_view(), name="login"),
    path("logout/", views.logout_user.as_view(), name="logout"),
    path("updatepass/",  views.PasswordUpdateView.as_view(), name="updatepass")
]