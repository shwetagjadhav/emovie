from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import CustomUser

class RegistrationForm(UserCreationForm):
    email = forms.EmailField(max_length=60)
    class Meta:
        model = CustomUser
        fields = ("email", "name", "password1", "password2", "phone", "address")
        