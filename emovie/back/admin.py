from django.contrib import admin
from .models import City, Theater, Screen, Show, Movie, Reservation, Seat
# Register your models here.

# admin.site.register(User)
admin.site.register(City)
admin.site.register(Theater)
admin.site.register(Screen)
admin.site.register(Show)
admin.site.register(Movie)
admin.site.register(Seat)
admin.site.register(Reservation)