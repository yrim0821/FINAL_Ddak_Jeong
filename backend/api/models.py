from django.db import models
from django.contrib.auth.models import User
import re

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    favorite = models.CharField(max_length=500, default="00")

    # @property
    # def favorite_array(self):
    #     print(re.sub("'[]", '', self.favorite))
    #     return re.sub("'[]", '', self.favorite)


#  wrapper for create user Profile
def create_profile(**kwargs):
    print("enter create_profile")
    print(kwargs)
    user = User.objects.create_user(
        username=kwargs['username'],
        password=kwargs['password'],
        is_active=True,
    )
    print(user)
    profile = Profile.objects.create(
        user=user,
        favorite=kwargs['favorite']
    )
    print("finish create_profile")
    return profile

class Movie(models.Model):
    id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=200)
    genres = models.CharField(max_length=500)

    @property
    def genres_array(self):
        return self.genres.strip().split('|')

class Post(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    title = models.CharField(max_length=100)
    content = models.TextField()

class PostComment(models.Model):
    user = models.ForeignKey(User, on_delete = models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    content = models.TextField()

