from django.utils import timezone
from django.db.models.signals import post_migrate
from django.dispatch import receiver
from django.conf import settings
from .models import Seat
from django.db.models import F



@receiver(post_migrate)
def set_seatcount(sender, **kwargs):
    seatcount_value = getattr(settings, 'SEATCOUNT_VALUE', 20)
    Seat.objects.update(seatcount=seatcount_value)
