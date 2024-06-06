import re
from django.http import Http404, HttpResponseBadRequest, HttpResponseNotAllowed, HttpResponseNotFound, HttpResponseRedirect, JsonResponse
from django.shortcuts import get_object_or_404, render
from django.db.models import Prefetch
from .serializers import PasswordUpdateSerializer, UserSerializer
from .models import City,Movie, Show, Screen, Theater,Seat, Reservation
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect
from django.http import HttpResponse
import json
from .models import CustomUser
from rest_framework.decorators import api_view
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import render
from django.http import JsonResponse
from .models import Show
from datetime import datetime

 
# 1
@csrf_exempt
def movieDetails(request, id):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    token_key = auth_header.split(' ')[1] if auth_header else None
    if token_key and Token.objects.filter(key=token_key).exists():
        try:
            movie = get_object_or_404(Movie, pk=id)
            shows = Show.objects.filter(movie=movie)
            if not shows.exists():
                return JsonResponse({'error': 'Movie not shown in any city'}, status=404)
            city_name = request.GET.get('city')
            if not city_name:
                city_name = 'Pune'
            print(city_name)
            theaters = Theater.objects.filter(city__name=city_name)
            shows = shows.filter(screen__theater__in=theaters)
            if not shows.exists():
                return JsonResponse({'error': 'Movie not shown in the selected city'}, status=404)
            data = {
            'id': movie.pk,
            'name' : movie.name,
            'runtime':movie.runtime,
            'desc': movie.desc,
            'genre': movie.genre,
            'lang': movie.lang,
            'date' : movie.release,
            }
            return JsonResponse(data)
        except Http404:
            return HttpResponseNotFound('Movie not found')
    else:
        return JsonResponse({'error':'Not Authenticated User'}, status=401)

 
# 2
@csrf_exempt
def searchMovie(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    token_key = auth_header.split(' ')[1] if auth_header else None
    if token_key and Token.objects.filter(key=token_key).exists():
        name = request.GET.get('name')
        if not name:
            return HttpResponseBadRequest('Movie name not Provided')
        stripped_name = name.strip()
        name = stripped_name
        current_city_name = request.GET.get('city', 'Pune')
        if not current_city_name: 
            current_city_name = "Pune"
        try:
            movie = get_object_or_404(Movie, name=name)
        except Http404:
            return JsonResponse({'error': 'Movie '+ name +' not available in the selected city.'})
        if current_city_name:
            pattern = r'^[a-zA-Z]*$'
            if not re.match(pattern, current_city_name):
                return HttpResponseBadRequest("Not A City Name")
            try:
                city = City.objects.get(name=current_city_name)
                showids = Movie.objects.filter(show__screen__theater__city=city).distinct()
                movie = showids.filter(name=name).first()
                if movie:
                    data = {
                        'id': movie.pk,
                        'name': movie.name,
                        'runtime': movie.runtime,
                        'desc': movie.desc,
                        'genre': movie.genre,
                        'lang': movie.lang,
                        'date': movie.release,
                    }
                    return JsonResponse(data)
                else:
                    return JsonResponse({'error': 'Movie '+ name +' not available in the selected city.'})
            except City.DoesNotExist:
                return JsonResponse({'error': 'City not found'}, status=404)
            except Movie.DoesNotExist:
                return JsonResponse({'error': 'No movies available in this city'})
        else:
            return JsonResponse({'error': 'City name not provided'}, status=400)
    else:
        return JsonResponse({'error':'Not Authenticated User'}, status=401) 

 
# 3
@csrf_exempt
def movieCity(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    token_key = auth_header.split(' ')[1] if auth_header else None
    if token_key and Token.objects.filter(key=token_key).exists():
        city_name = request.GET.get('city')
        pattern = r'^[a-zA-Z]*$'
        if not city_name:
            city_name = "Pune"
        if(city_name == None or city_name == 'null'):
            city_name = 'Pune'
        stripped_name = city_name.strip()
        city_name = stripped_name.title()
        
        if not re.match(pattern, city_name):
            return HttpResponseBadRequest("Not A City Name")
        
        if city_name:
            try:
                city = City.objects.get(name=city_name)
                showids = Movie.objects.filter(show__screen__theater__city=city,show__date__gte= datetime.today().date()).distinct()
                data = {
                    'movies': [{'id': movie.id, 'name': movie.name, 'runtime': movie.runtime} for movie in showids],
                    'cities': [{'id': city.id, 'name': city.name} for city in City.objects.all()],
                }
                return JsonResponse(data)
            except City.DoesNotExist:
                return HttpResponseNotFound('City not found')
            except Movie.DoesNotExist:
                return JsonResponse({'error': 'No movies available in this city'})
        else:
            return HttpResponseBadRequest('City name not provided')
    else:
        return JsonResponse({'error':'Not Authenticated User'}, status=401)
 
 
# 4
@csrf_exempt
def bookShow(request, id):
    if request.method != 'POST':
        return HttpResponseNotAllowed(['POST'])
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    token_key = auth_header.split(' ')[1] if auth_header else None
    if token_key and Token.objects.filter(key=token_key).exists():
        if request.method == 'POST':
            try:
                show = get_object_or_404(Show, pk=id)
                avseat = Seat.objects.get(show=show)
                if show.date < datetime.today().date():
                    return HttpResponseBadRequest("Past Shows can not be booked")
                if(avseat.seatcount <= 0):
                    return JsonResponse({'error': 'Show is housefull'})
                request_body = request.body
                try:
                    data = json.loads(request_body)
                    numseats = data.get('numseats', 0)
                    if numseats is None:
                        return HttpResponseBadRequest("Provide Seat Count")
                    if(type(numseats)!= int):
                        return HttpResponseBadRequest("Seat Count Is Not A Number")
                    if int(numseats) <= 0:
                        return HttpResponseBadRequest("Seat Count Must Be Positive Integer") 
                    userid = (data.get('user'))
                    if userid is None:
                        return HttpResponseBadRequest()
                    if(type(userid)!= int or userid<=0):
                        return HttpResponseBadRequest()
                    try:
                        user = get_object_or_404(CustomUser, pk=userid)
                        if numseats <= avseat.seatcount and avseat.seatcount - numseats >=  0:
                            seatList = " ".join(str(avseat.seatcount - i) for i in range(numseats))
                            avseat.seatcount -= numseats
                            avseat.save()
                            ticket = Reservation.objects.create(user=user, show=show, rescode=seatList)
                            return JsonResponse({'success': 'Ticket booked successfully'})
                        else:
                            return JsonResponse({'error': 'There are only '+str(avseat.seatcount)+' seats left'})
                    except:
                         return HttpResponseNotFound("User Not Found")
                except:
                    return HttpResponseBadRequest()   
            except Http404:
                return HttpResponseNotFound("Show Not Found")
        else:
            return JsonResponse({'error': 'Invalid request method'})
    else:
        return JsonResponse({'error':'Not Authenticated User'}, status=401)
 
 
# 5
@csrf_exempt
def userDetails(request):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    token_key = auth_header.split(' ')[1] if auth_header else None
    if token_key and Token.objects.filter(key=token_key).exists():
        userid = request.GET.get('userId')
        user = CustomUser.objects.get(pk=userid)
        reservation = Reservation.objects.filter(user=user)
        reservation_data = [
        {
            'show': {
                'movie_name': res.show.movie.name,
                'show_time': res.show.time,
                'show_date': res.show.date,
                'screen_name': res.show.screen.name,
                'theater_name': res.show.screen.theater.name,
                'city': res.show.screen.theater.city.name,
            },
            'rescode': res.rescode
        } for res in reservation
        ]
        return JsonResponse({'reservations': reservation_data}) 
    else:
        return JsonResponse({'error':'Not Authenticated User'}, status=401)
 
 

# 6
@csrf_exempt
def showByDate(request,id):
    if request.method != 'GET':
        return HttpResponseNotAllowed(['GET'])
    auth_header = request.META.get('HTTP_AUTHORIZATION', '')
    token_key = auth_header.split(' ')[1] if auth_header else None
    if token_key and Token.objects.filter(key=token_key).exists():
        try:
            movie = get_object_or_404(Movie, pk=id)
            cityname = request.GET.get('city','Pune')
            if not cityname:
                cityname = "Pune"
            print(cityname)
            city = get_object_or_404(City, name=cityname)
            print("11")
            date = request.GET.get('date')
            if not date:
                return JsonResponse({'error': 'No date provided'}, status=400)
            current_date = datetime.today().date()
            try:
                date_obj = datetime.strptime(date, '%Y-%m-%d')
                date_obj = date_obj.date()
            except ValueError:
                return JsonResponse({'error': 'Invalid date format'}, status=400)
            if current_date > date_obj:
                return JsonResponse({'error': 'Past Shows Are Not Available'}, status=400)
            shows = Show.objects.filter(movie=movie, screen__theater__city=city, date=date_obj).prefetch_related(
                Prefetch('screen__theater', queryset=Theater.objects.all(), to_attr='theater_info')
            )
            theater_shows = {}
            for show in shows:
                theater = show.screen.theater
                theater_id = theater.id
                if theater_id not in theater_shows:
                    theater_shows[theater_id] = {
                        'theater': {
                            'name': theater.name,
                            'loc': theater.city.name,
                            'state': theater.city.state,
                        },
                        'show_times': []
                    }
                price = Seat.objects.get(show=show).price
                show_data = {
                    'id': show.pk,
                    'time': show.time,
                    'price': price
                }    
                theater_shows[theater_id]['show_times'].append(show_data)
        except Exception as e:
            print(e)
            return HttpResponseBadRequest("ddd")
        datath = []
        for theater_id, theater_data in theater_shows.items():
            datath.append(theater_data)
        if(datath == []):
            return JsonResponse({'error': 'No shows available for '+date})
        
        return JsonResponse({'data':datath}, safe=False)
    else:
        return JsonResponse({'error':'Not Authenticated User'}, status=401)
    


# 7
class UserRegistrationView(APIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    authentication_classes = [TokenAuthentication]
 
 
 
# 8
class UserLoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            user_data = {
                'id': user.id,
                'name': user.name,
                'email': user.email,
                'phone': user.phone,
                'address': user.address,
            }
            return Response({'token': token.key, 'user': user_data})
        else:
            return Response({'error': 'Invalid credentials'}, status=401)

 
 
# 9
class logout_user(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        try:
            request.user.auth_token.delete()
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response({'success': 'Logged out successfully'}, status=status.HTTP_200_OK)
 
 
 
 # 10
@api_view(['POST'])
def registration_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
 

 # 11
CustomUser = get_user_model()
class PasswordUpdateView(APIView):
    def put(self, request, *args, **kwargs):
        serializer = PasswordUpdateSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            new_password = serializer.validated_data.get('new_password')
            try:
                user = CustomUser.objects.get(email=email)
                user.set_password(new_password)
                user.save()
                return JsonResponse({"message": "Password updated successfully."}, status=200)
            except CustomUser.DoesNotExist:
                return JsonResponse({"error": "User with this email does not exist."}, status=404)
        return JsonResponse(serializer.errors, status=400)