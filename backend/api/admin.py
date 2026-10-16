from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser, Profile, Category, Product, Order, OrderItem

@admin.register(CustomUser)
class CustomUserAdmin(BaseUserAdmin):
    model = CustomUser
    
    # 1. FORCE THE OVERRIDE FOR admin.E033
    ordering = ('email',)
    
    # 2. OVERRIDE FIELDS (Removes hidden username lookups)
    list_display = ('email', 'first_name', 'last_name', 'is_staff')
    search_fields = ('email', 'first_name', 'last_name')
    list_filter = ('is_staff', 'is_active')

    # 3. COMPLETE RE-WRITE OF FIELDSETS (Stripped of username)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'date_of_birth', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    
    # 4. RE-WRITE OF USER CREATION FIELDS
    add_fieldsets = (
        (None, {
            'classes': ('collapse',),
            'fields': ('email', 'first_name', 'last_name', 'password'),
        }),
    )

admin.site.register(Profile)
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Order)
admin.site.register(OrderItem)