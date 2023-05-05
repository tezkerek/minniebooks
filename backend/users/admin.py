# surse cod:
# https://docs.djangoproject.com/en/4.1/topics/auth/customizing/

from django import forms
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.core.exceptions import ValidationError

from .models import MinnieBooksUser, FriendRequest


class UserCreationForm(forms.ModelForm):
    password = forms.CharField(label="Password", widget=forms.PasswordInput)
    confirmPassword = forms.CharField(
        label="Password confirmation", widget=forms.PasswordInput
    )

    class Meta:
        model = MinnieBooksUser
        fields = ("email",)

    def check_password(self):
        password = self.cleaned_data.get("password")
        confirmPassword = self.cleaned_data.get("confirmPassword")
        if password != confirmPassword:
            raise ValidationError("Passwords do not match!")
        return password

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        if commit:
            user.save()
        return user


class UserChangeFrom(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = MinnieBooksUser
        fields = ("email", "password", "is_active", "is_admin")


class UserAdmin(BaseUserAdmin):
    form = UserChangeFrom
    add_form = UserCreationForm

    list_display = ("email", "is_admin")
    list_filter = ("is_admin",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Personal info",
            {
                "fields": (
                    "first_name",
                    "last_name",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_admin",
                    "is_employee",
                )
            },
        ),
    )

    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password", "confirmPassword"),
            },
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)
    filter_horizontal = ()


admin.site.register(MinnieBooksUser, UserAdmin)
admin.site.register(FriendRequest)

admin.site.unregister(Group)
