# Generated by Django 4.1.7 on 2023-03-27 10:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_minniebooksuser_profilepicture'),
    ]

    operations = [
        migrations.DeleteModel(
            name='User',
        ),
        migrations.RenameField(
            model_name='minniebooksuser',
            old_name='dateJoined',
            new_name='date_joined',
        ),
        migrations.RenameField(
            model_name='minniebooksuser',
            old_name='firstName',
            new_name='first_name',
        ),
        migrations.RenameField(
            model_name='minniebooksuser',
            old_name='lastName',
            new_name='last_name',
        ),
        migrations.RenameField(
            model_name='minniebooksuser',
            old_name='profilePicture',
            new_name='profile_picture',
        ),
        migrations.AddField(
            model_name='minniebooksuser',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='minniebooksuser',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]
