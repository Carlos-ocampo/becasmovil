# Generated by Django 4.0.4 on 2022-05-28 21:23

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_beca_categoria'),
    ]

    operations = [
        migrations.AddField(
            model_name='beca',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='beca',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
