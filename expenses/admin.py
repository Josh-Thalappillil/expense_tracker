from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Expense, Category


@admin.register(User)
class CustomUserAdmin(UserAdmin):
	fieldsets = UserAdmin.fieldsets + (
		("Additional Info", {"fields": ("profile_picture", "occupation")} ),
	)
	list_display = ("username", "email", "first_name", "last_name", "occupation", "is_staff")
	search_fields = ("username", "email", "occupation")


@admin.register(Expense)
class ExpenseAdmin(admin.ModelAdmin):
	list_display = ("user", "category", "amount", "date", "payment_method", "currency", "is_recurring", "created_at")
	list_filter = ("payment_method", "currency", "is_recurring", "date", "category")
	search_fields = ("description", "user__username")
	date_hierarchy = "date"
	readonly_fields = ("created_at", "updated_at")


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
	list_display = ("name", "created_by", "is_default", "priority", "color", "created_at")
	list_filter = ("is_default", "priority")
	search_fields = ("name", "description")
	readonly_fields = ("created_at", "updated_at")
