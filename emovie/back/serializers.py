from rest_framework import serializers
from .models import CustomUser
from rest_framework.authtoken.models import Token
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import CustomUser
 
 
 
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from rest_framework import serializers
from .models import CustomUser
import re
 
class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'confirm_password', 'name', 'phone', 'address')
        extra_kwargs = {'password': {'write_only': True}}
 
    def validate_email(self, value):
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Invalid email format.")
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        domain_pattern = re.compile(r'^[a-zA-Z0-9.]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')
        if not domain_pattern.match(value):
            raise serializers.ValidationError("Email domain is not valid.")
        return value
   
    def validate_name(self, value):
        pattern = re.compile(r'^[A-Za-z]+(?: [A-Za-z]+)?$')
        if not pattern.match(value):
            raise serializers.ValidationError("Name is not in the standard format.")
       
        digit_pattern = re.compile(r'\d')
        if digit_pattern.search(value):
            raise serializers.ValidationError("Name contains digits.")
        return value
   
    def validate_password(self, value):
        pattern = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*\_=\+\-]).{8,20}$')
        if not pattern.match(value):
            raise serializers.ValidationError("Password is not in the standard format.")
        return value
   
    def validate(self, data):
       
        password = data.get('password')
        confirm_password = data.get('confirm_password')
        if password and confirm_password and password != confirm_password:
            raise serializers.ValidationError("New password and confirm password do not match.")
        return data
   
    def validate_address(self, value):
        pattern = re.compile(r'^(?!.*(.)\1{3,})(\w*\s*[\#\-\,\/\.\(\)\&]*)+$')
        if not pattern.match(value):
            raise serializers.ValidationError("Address is not in the standard format.")
        return value
       
    def validate_phone(self, value):
        if not re.fullmatch(r'[6-9]\d{9}', value):
            raise serializers.ValidationError("Enter a valid phone number")
        return value
   
    def create(self, validated_data):
        user = CustomUser(
            email=validated_data['email'],
            name=validated_data['name'],
            phone=validated_data['phone'],
            address=validated_data['address'])
        user.set_password(validated_data['password'])
        user.save()
        return user
 
CustomUser = get_user_model()
class PasswordUpdateSerializer(serializers.Serializer):
    email = serializers.EmailField()
    new_password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
 
    def validate_new_password(self, value):
        pattern = re.compile(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$')
        if not pattern.match(value):
            raise serializers.ValidationError("Password is not in the standard format.")
        return value
 
    def validate(self, data):
       
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')
        if new_password and confirm_password and new_password != confirm_password:
            raise serializers.ValidationError("New password and confirm password do not match.")
        return data
 
    def validate_email(self, value):
        try:
            user = CustomUser.objects.get(email=value)
        except CustomUser.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials.")
        return value
 
    def update(self, instance, validated_data):
        instance.set_password(validated_data['new_password'])
        instance.save()
        return instance