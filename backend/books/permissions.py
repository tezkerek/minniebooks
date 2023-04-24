from rest_framework import permissions

class IsAdminOrReadOnly(permissions.BasePermission):
    message = "Users can only read data."

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.user.is_admin:
            return True
        else:
            return False