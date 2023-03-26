# Generated by Django 4.1.7 on 2023-03-26 15:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('users', '0003_minniebooksuser_profilepicture'),
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('publisher', models.CharField(max_length=100)),
                ('bookCover', models.FileField(upload_to='files/bookcovers')),
            ],
        ),
        migrations.CreateModel(
            name='Review',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=2048)),
                ('stars', models.IntegerField()),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.book')),
                ('reader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.minniebooksuser')),
            ],
        ),
        migrations.CreateModel(
            name='Quote',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=2048)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.book')),
                ('uploader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.minniebooksuser')),
            ],
        ),
        migrations.CreateModel(
            name='ProgressUpdate',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(max_length=20)),
                ('message', models.CharField(max_length=512)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.book')),
                ('reader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.minniebooksuser')),
            ],
        ),
        migrations.CreateModel(
            name='LikeDislike',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('value', models.IntegerField(default=-1)),
                ('reader', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.minniebooksuser')),
                ('review', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.review')),
            ],
        ),
        migrations.CreateModel(
            name='BookRecommandation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=512)),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='books.book')),
                ('receiver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='receiver', to='users.minniebooksuser')),
                ('sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.minniebooksuser')),
            ],
        ),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FirstName', models.CharField(max_length=50)),
                ('LastName', models.CharField(max_length=50)),
                ('Description', models.CharField(max_length=2048)),
                ('Picture', models.FileField(upload_to='files/authors')),
                ('Books', models.ManyToManyField(to='books.book')),
            ],
        ),
        migrations.AddConstraint(
            model_name='review',
            constraint=models.CheckConstraint(check=models.Q(('stars__gte', 0), ('stars__lte', 5)), name='verifyValidStars'),
        ),
        migrations.AddConstraint(
            model_name='likedislike',
            constraint=models.CheckConstraint(check=models.Q(('value__gte', -1), ('value__lte', 1)), name='verifyValidLikeValue'),
        ),
    ]
