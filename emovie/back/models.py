from django.db import models
from tokenize import group
from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from .managers import CustomUserManager
from django.conf import settings  
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token 


class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_("email address"), unique=True)
    name = models.CharField(max_length=50, null=True)
    password = models.CharField(_("password"), max_length=128)
    phone = models.CharField(null=True, max_length = 10)
    address = models.CharField(max_length=50, null=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    objects = CustomUserManager()


    groups = models.ManyToManyField(
        Group,
        related_name="customuser_groups",  
        verbose_name=_("groups"),
        blank=True,
        help_text=_(
            "The groups this user belongs to. A user will get all permissions "
            "granted to each of their groups."
        ),
        related_query_name="user",
    )

    user_permissions = models.ManyToManyField(
        Permission,
        related_name="customuser_permissions",  
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_query_name="user",
    )

    def __str__(self):
        return self.email

 
class City(models.Model):
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
 

class Theater(models.Model):
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
 

class Screen(models.Model):
    name = models.CharField(max_length=100)
    theater = models.ForeignKey(Theater, on_delete=models.CASCADE)
 

class Movie(models.Model):
    name = models.CharField(max_length=100)
    runtime = models.CharField(max_length=100)
    release = models.DateField()
    desc = models.TextField()
    lang = models.CharField(max_length=20)
    genre = models.CharField(max_length=20)
 

class Show(models.Model):
    time = models.CharField(max_length=100)
    date = models.DateField()
    screen = models.ForeignKey(Screen, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    
 
class Seat(models.Model):
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    price = models.IntegerField()
    seatcount = models.IntegerField()
 

class Reservation(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    show = models.ForeignKey(Show, on_delete=models.CASCADE)
    rescode = models.TextField()