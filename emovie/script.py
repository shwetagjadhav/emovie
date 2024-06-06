from datetime import datetime, timedelta
from django.utils import timezone
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emovie.settings')

django.setup()

from back.models import Show, Seat


shows_data = [
('12-03 PM',  1, 1),
('03-06 PM',  1, 1),
('09-12 PM',  2, 2),
('12-03 PM',  2, 2),
('03-06 PM',  2, 2),
('09-12 PM',  1, 3),
('12-03 PM',  1, 3),
('03-06 PM',  1, 3),
('09-12 PM',  4, 4),
('12-03 PM',  4, 4),
('03-06 PM',  4, 4),
('12-03 PM',  5, 5),
('03-06 PM',  5, 5),
('09-12 PM',  6, 6),
('12-03 PM',  6, 6),
('03-06 PM',  6, 6),
('09-12 PM',  7, 7),
('12-03 PM',  7, 7),
('03-06 PM',  7, 7),
('03-06 PM',  8, 8),
('12-03 PM',  8, 9),
('03-06 PM',  8, 9),
('09-12 PM',  2, 10),
('12-03 PM',  2, 10),
('03-06 PM',  2, 10),
('09-12 PM',  3, 11),
('12-03 PM',  3, 11),
('03-06 PM',  3, 11),
('09-12 PM',  2, 12),
('12-03 PM',  2, 12),
('03-06 PM', 2, 12),
('03-06 PM', 5, 13),
('06-09 PM', 5, 13),
('03-06 PM', 6, 14),
('12-03 PM', 7, 15),
('03-06 PM', 7, 15),
('09-12 PM', 8, 16),
('12-03 PM', 8, 16),
('09-12 PM', 1, 17),
('12-03 PM', 1, 17),
('03-06 PM', 1, 17),
('09-12 PM', 2, 18),
('12-03 PM', 2, 18),
('03-06 PM', 2, 18),
('09-12 PM', 3, 19),
('12-03 PM', 3, 19),
('09-12 PM', 4, 20),
('12-03 PM', 4, 20),
('09-12 PM', 5, 21),
('12-03 PM', 5, 21),
('03-06 PM', 5, 21),
('09-12 PM', 6, 22),
('12-03 PM', 6, 22),
('03-06 PM', 6, 22),
('09-12 PM', 7, 23),
('12-03 PM', 7, 23),
('03-06 PM', 7, 23),
('09-12 PM', 8, 24),
('12-03 PM', 8, 24),
('03-06 PM', 8, 24)
]

seats_data = [
(200,20)
]

from django.db.models import Max
lastShowId = Show.objects.aggregate(Max('id'))['id__max'] or 0
lastSeatId = Seat.objects.aggregate(Max('id'))['id__max'] or 0


def add_shows_and_seats():
    current_date = datetime.now().date()
    end_date = current_date + timedelta(weeks=1)
    while current_date < end_date:
        lastShowId = Show.objects.aggregate(Max('id'))['id__max'] or 0
        lastSeatId = Seat.objects.aggregate(Max('id'))['id__max'] or 0
        for time, show_id, screen_id in shows_data:
            date = current_date
            show, created = Show.objects.get_or_create(
                id = lastShowId + 1,
                time=time,
                date=date,
                movie_id=show_id,
                screen_id=screen_id,
            )
        
            seat, created = Seat.objects.get_or_create(
                id = lastSeatId + 1,
                show=show,
                price=180, 
                seatcount=20, 
            )
            if created:
                print(f"Added seat: {seat}")
            if created:
                print(f"Added show: {show}")
            lastSeatId += 1
            lastShowId += 1
        current_date += timedelta(days=1)

add_shows_and_seats()
