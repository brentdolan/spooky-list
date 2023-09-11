from django.contrib import admin

# Register your models here.
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from movies.models import UserStreamingPlatform, UserWatchedMovies
from .models import User


class UserStreamingPlatformInline(admin.TabularInline):
    model = UserStreamingPlatform
    extra = 1


class UserWatchedMoviesInline(admin.TabularInline):
    model = UserWatchedMovies
    extra = 1


class CustomUserAdmin(UserAdmin):
    inlines = (*UserAdmin.inlines, UserStreamingPlatformInline, UserWatchedMoviesInline)


admin.site.register(User, CustomUserAdmin)
