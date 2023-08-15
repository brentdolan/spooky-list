# Generated by Django 4.2.4 on 2023-08-13 21:54

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('slug', models.SlugField(blank=True, default='')),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField(blank=True, default='')),
                ('release_date', models.DateField(blank=True, default=datetime.date(1, 1, 1))),
                ('rating', models.CharField(blank=True, default='')),
                ('length_minutes', models.IntegerField(blank=True, default=0)),
                ('poster', models.URLField(blank=True, default='')),
                ('amazon_link', models.URLField(blank=True, default='')),
                ('trigger_warning', models.CharField(blank=True, default='')),
            ],
        ),
        migrations.CreateModel(
            name='MovieCastAndCrew',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('role', models.CharField(blank=True, default='cast')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
            ],
            options={
                'db_table': 'movies_movie_cast_and_crew',
            },
        ),
        migrations.CreateModel(
            name='StreamingPlatform',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('base_url', models.URLField(blank=True, default='')),
            ],
        ),
        migrations.CreateModel(
            name='StreamingPlatformMovies',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
                ('streaming_platform', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.streamingplatform')),
            ],
            options={
                'db_table': 'movies_streaming_platform_movies',
            },
        ),
        migrations.AddField(
            model_name='streamingplatform',
            name='movies',
            field=models.ManyToManyField(blank=True, default=None, related_name='+', through='movies.StreamingPlatformMovies', to='movies.movie'),
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField()),
                ('last_name', models.CharField()),
                ('movies', models.ManyToManyField(blank=True, default=None, related_name='+', through='movies.MovieCastAndCrew', to='movies.movie')),
            ],
        ),
        migrations.CreateModel(
            name='MovieGenre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('genre', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.genre')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.movie')),
            ],
            options={
                'db_table': 'movies_movie_genre',
            },
        ),
        migrations.AddField(
            model_name='moviecastandcrew',
            name='person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='movies.person'),
        ),
        migrations.AddField(
            model_name='movie',
            name='cast_and_crew',
            field=models.ManyToManyField(blank=True, default=None, related_name='+', through='movies.MovieCastAndCrew', to='movies.person'),
        ),
        migrations.AddField(
            model_name='movie',
            name='genres',
            field=models.ManyToManyField(blank=True, default=None, related_name='+', through='movies.MovieGenre', to='movies.genre'),
        ),
        migrations.AddField(
            model_name='movie',
            name='where_to_watch',
            field=models.ManyToManyField(blank=True, default=None, related_name='+', through='movies.StreamingPlatformMovies', to='movies.streamingplatform'),
        ),
        migrations.AddField(
            model_name='genre',
            name='movies',
            field=models.ManyToManyField(blank=True, default=None, related_name='+', through='movies.MovieGenre', to='movies.movie'),
        ),
    ]
