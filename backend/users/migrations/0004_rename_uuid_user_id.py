# Generated by Django 4.2.4 on 2023-08-21 00:04

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_remove_user_id_alter_user_uuid'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='uuid',
            new_name='id',
        ),
    ]