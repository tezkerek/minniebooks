from rest_framework import permissions


class IsAdminOrReadOnly(permissions.BasePermission):
    message = "Users can only read data."

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS or request.user.is_admin
