from django.db import models
from django.contrib.auth.models import AbstractUser

# requires 'pip install django-localflavor'
# INSTALLED_APPS = (
    # ...
   # 'localflavor',
# )
# from localflavor.models import USStateField

class AppUser(AbstractUser):
    email = models.EmailField(
        verbose_name='email address',
        max_length=64,
        unique=True,
    )
    username=models.CharField(max_length=16, verbose_name="Username")
    first_name=models.CharField(max_length=16, verbose_name="First name")
    last_name=models.CharField(max_length=16, verbose_name="Last name")

    USERNAME_FIELD = 'username' # is this what we want? Or just email?
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return f"ID: {self.id}, Name: {self.first_name} {self.last_name}, username: {self.username}, email: {self.email}"

class Event(models.Model):
    CATEGORY1 = 'C1' # What categories do we want?
    CATEGORY2 = 'C2' # Do we want DB to enforce categories?
    CATEGORY3 = 'C3'
    CATEGORY4 = 'C4'
    CATEGORY5 = 'C5'
    CATEGORY_CHOICES = [
        (CATEGORY1, 'Category 1'),
        (CATEGORY2, 'Category 2'),
        (CATEGORY3, 'Category 3'),
        (CATEGORY4, 'Category 4'),
        (CATEGORY5, 'Category 5'),
    ]
    category=models.CharField(max_length=2, choices=CATEGORY_CHOICES, default=CATEGORY1, verbose_name="Category")
    max_participants=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum Participants")
    private=models.BooleanField(default=False, blank=True, null=True, verbose_name="Private game?") # or choice between 'public' and 'private'?
    location=models.CharField(max_length=32, blank=True, null=True, default=None, verbose_name="Game location") 
    date_time=models.DateTimeField(blank=True, null=True, default=None, verbose_name="Game date and time")
    about=models.TextField(blank=True, null=True, default=None, verbose_name="About")

    def __str__(self):
        return f"ID: {self.id}, Category: {self.category}, Location: {self.location}, DateTime: {self.date_time}, Private: {self.private}"

# do we want to use from localflavor.models import USStateField or just a 2-character CharField?
# do we also want to use localflavor.us.models.USZipCodeField?
# allow any other fields to be null/blank?
class Address(models.Model):
    address_1 = models.CharField(max_length=128, verbose_name="Address")
    address_2 = models.CharField( max_length=128, blank=True, null=True, default=None, verbose_name="Address cont'd")
    city = models.CharField(max_length=64, verbose_name="City")
    state = models.CharField(max_length=2, verbose_name="State")
    zip_code = models.CharField(max_length=5, verbose_name="Zip code")

    def __str__(self):
        return f"ID: {self.id}, Address: {self.address_1}, {self.address_2}, City: {self.city}, State: {self.state}, Zip code: {self.zip_code}"

class Game(models.Model):
    title=models.CharField(max_length=32, blank=False, unique=True, verbose_name="Title")
    player_num=models.IntegerField(blank=True, null=True, default=None, verbose_name="Number of Players")
    description=models.TextField(blank=True, null=True, default=None, verbose_name="Description")

    def __str__(self):
        return f"ID: {self.id}, Title: {self.title}"

class EventGame(models.Model):
    game=models.ForeignKey(Game, on_delete=models.CASCADE, related_name='games') # through='Game'?
    event=models.ForeignKey(Event, on_delete=models.CASCADE, related_name='eventgames') # through='Event'?

    def __str__(self):
        return f"ID: {self.id}, Game: {self.game}, Event: {self.event}"

## Not sure I interpreted the requirements for this model correctly?
class EventUser(models.Model):
    owner=models.ForeignKey(AppUser, on_delete=models.CASCADE)
    attendee=models.ManyToManyField(AppUser, related_name="attendees") # through='User'?
    event=models.ManyToManyField(Event, related_name="events") # through='Event'?

    def __str__(self):
        return f"ID: {self.id}, Owner: {self.owner}, Event: {self.event}"

class GroupList(models.Model):
    user = models.OneToOneField(AppUser, on_delete = models.CASCADE, related_name='owner')
    groups = models.ManyToManyField(AppUser, blank=True, related_name='groups')

class GroupRequest(models.Model):
    sender = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='sender')
    receiver = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='receiver')
    is_active = models.BooleanField(blank=True, default=True)
    class Meta:
        unique_together = (('sender', 'receiver'))

# fields returned from https://api.boardgameatlas.com/api/
class GameDetail(models.Model):
    gameid=models.CharField(max_length = 10, unique=True, verbose_name="Game ID") # primary_key=True?
    handle=models.CharField(max_length = 32, blank=True, null=True, default=None, verbose_name="Handle") # required?
    url=models.URLField(max_length = 64, blank=True, null=True, default=None, verbose_name="URL") #CharField instead?
    edit_url=models.URLField(max_length = 64, blank=True, null=True, default=None, verbose_name="Edit URL") #CharField instead?
    name=models.CharField(max_length = 32, blank=True, null=True, default=None, verbose_name="Name") #required?
    price=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="Price") # games > $1000?
    price_ca=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="Canada Price")
    price_uk=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name=" UK Price")
    price_au=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="Australia Price")
    msrp=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="MSRP")
    discount=models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True, default=None, verbose_name="Discount")
    year_published=models.IntegerField(blank=True, null=True, default=None, verbose_name="Year Published")
    min_players=models.IntegerField(blank=True, null=True, default=None, verbose_name="Minimum Players")
    max_players=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum Players")
    min_playtime=models.IntegerField(blank=True, null=True, default=None, verbose_name="Minimum Playtime")
    max_playtime=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum Playtime")
    min_age=models.IntegerField(blank=True, null=True, default=None, verbose_name="Minimum Age")
    description=models.TextField(blank=True, null=True, default=None)
    # Do we want to include more?

    def __str__(self):
        return f"ID: {self.id}, Name: {self.name}"