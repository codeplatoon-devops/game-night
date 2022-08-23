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
    username=models.CharField(max_length=16, unique=True, verbose_name="Username")
    first_name=models.CharField(max_length=16, verbose_name="First name")
    last_name=models.CharField(max_length=16, verbose_name="Last name")

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f"ID: {self.id}, Name: {self.first_name} {self.last_name}, username: {self.username}, email: {self.email}"

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

class Event(models.Model):
    owner=models.ForeignKey(AppUser, default=None, on_delete=models.CASCADE)
    name=models.CharField(max_length=32,blank=True, null=True, default=None, verbose_name="Name")
    code=models.CharField(max_length=8,blank=True, null=True, default=None, verbose_name="Code")
    category=models.CharField(max_length=16, verbose_name="Category")
    max_attendees=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum attendees")
    private=models.BooleanField(default=False, blank=True, null=True, verbose_name="Private game") # or choice between 'public' and 'private'?
    address=models.ForeignKey(Address, on_delete=models.CASCADE, related_name='Addresses') 
    date_time=models.DateTimeField(blank=True, null=True, default=None, verbose_name="Game date and time")
    all_day=models.BooleanField(default=False, blank=True, null=True, verbose_name="All day")
    about=models.TextField(blank=True, null=True, default=None, verbose_name="About")

    def __str__(self):
        return f"ID: {self.id}, Name: {self.name}, Category: {self.category}, Address: {self.address}, DateTime: {self.date_time}, Private: {self.private}"

# class Game(models.Model):
#     title=models.CharField(max_length=32, blank=False, unique=True, verbose_name="Title")
#     player_num=models.IntegerField(blank=True, null=True, default=None, verbose_name="Number of Players")
#     description=models.TextField(blank=True, null=True, default=None, verbose_name="Description")

#     def __str__(self):
#         return f"ID: {self.id}, Title: {self.title}"

class EventGame(models.Model):
    game=models.CharField(max_length=32, blank=False, unique=True, verbose_name="Game")
    # game=models.ForeignKey(Game, on_delete=models.CASCADE, related_name='games') # through='Game'?
    event=models.ForeignKey(Event, on_delete=models.CASCADE, related_name='eventgames') # through='Event'?

    def __str__(self):
        return f"ID: {self.id}, Game: {self.game}, Event: {self.event}"

# Not sure I interpreted the requirements for this model correctly?
class EventUser(models.Model):
    # owner=models.ForeignKey(AppUser, on_delete=models.CASCADE)
    attendee=models.ManyToManyField(AppUser, related_name="attendees") # through='User'?
    # event=models.ManyToManyField(Event, related_name="events") # through='Event'?

    def __str__(self):
        return f"ID: {self.id}, Attendee: {self.attendee}"

class Group(models.Model):
    name=models.CharField(max_length=32, blank=False,default=None, unique=True, verbose_name="Name")
    code=models.CharField(max_length=8, blank=False, default=None, unique=True, verbose_name="Code")
    member=models.ManyToManyField(AppUser, blank=True, related_name='members')
    
    def __str__(self):
        return f"ID: {self.id}, Name: {self.name}, Code: {self.code}"

class GroupList(models.Model):
    owner = models.OneToOneField(AppUser, default=None, on_delete = models.CASCADE, related_name='owner')
    group = models.ManyToManyField(Group, blank=True, related_name='Listgroups')
    # not sure how to create a __str__ for this?

class GroupRequest(models.Model):
    sender = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Groupsender')
    receiver = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Groupreceiver')
    # is_active = models.BooleanField(blank=True, default=True)
    group=models.ForeignKey(Group, default=None, on_delete = models.CASCADE, related_name='Requestgroups')
    
    def __str__(self):
        return f"ID: {self.id}, Group: {self.group}, Sender: {self.sender}, Receiver: {self.receiver}"

    class Meta:
        unique_together = (('sender', 'receiver'))

class EventRequest(models.Model):
    sender = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Eventsender')
    receiver = models.ForeignKey(AppUser, on_delete = models.CASCADE, related_name='Eventreceiver')
    event=models.ForeignKey(Event, on_delete = models.CASCADE, related_name='event')

    def __str__(self):
        return f"ID: {self.id}, Event: {self.event}, Sender: {self.sender}, Receiver: {self.receiver}"

    class Meta:
        unique_together = (('sender', 'receiver'))

# fields returned from https://api.boardgameatlas.com/api/
# class GameDetail(models.Model):
#     gameid=models.CharField(max_length = 10, unique=True, verbose_name="Game ID") # primary_key=True?
#     handle=models.CharField(max_length = 32, blank=True, null=True, default=None, verbose_name="Handle") # required?
#     url=models.URLField(max_length = 64, blank=True, null=True, default=None, verbose_name="URL") #CharField instead?
#     edit_url=models.URLField(max_length = 64, blank=True, null=True, default=None, verbose_name="Edit URL") #CharField instead?
#     name=models.CharField(max_length = 32, blank=True, null=True, default=None, verbose_name="Name") #required?
#     price=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="Price") # games > $1000?
#     price_ca=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="Canada Price")
#     price_uk=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name=" UK Price")
#     price_au=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="Australia Price")
#     msrp=models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True, default=None, verbose_name="MSRP")
#     discount=models.DecimalField(max_digits=3, decimal_places=2, blank=True, null=True, default=None, verbose_name="Discount")
#     year_published=models.IntegerField(blank=True, null=True, default=None, verbose_name="Year Published")
#     min_players=models.IntegerField(blank=True, null=True, default=None, verbose_name="Minimum Players")
#     max_players=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum Players")
#     min_playtime=models.IntegerField(blank=True, null=True, default=None, verbose_name="Minimum Playtime")
#     max_playtime=models.IntegerField(blank=True, null=True, default=None, verbose_name="Maximum Playtime")
#     min_age=models.IntegerField(blank=True, null=True, default=None, verbose_name="Minimum Age")
#     description=models.TextField(blank=True, null=True, default=None)
    # Do we want to include more?

    # def __str__(self):
    #     return f"ID: {self.id}, Name: {self.name}"