# Generated by Django 3.2 on 2021-04-17 06:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='gender',
            field=models.IntegerField(choices=[(0, 'unknown'), (1, 'male'), (2, 'female')], default=0),
        ),
    ]
