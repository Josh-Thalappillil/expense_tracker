from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    occupation = models.CharField(max_length=30, blank=True, null=True)
    last_login = models.DateTimeField(blank=True, null=True)
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='expenses_user_set',  
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='user',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='expenses_user_permissions',  
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='user',
    )
    
class Expense(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('credit_card', 'Credit Card'),
        ('bank_transfer', 'Bank Transfer'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.SET_NULL, null=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True)
    date = models.DateField()
    is_recurring = models.BooleanField(default=False)
    payment_method = models.CharField(max_length=30, choices=PAYMENT_METHOD_CHOICES, default='credit_card')
    currency = models.CharField(max_length=30, default='AUD')
    receipt = models.ImageField(upload_to='receipts/', null=True, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)  
    updated_at = models.DateTimeField(auto_now=True)      

    def __str__(self):
        return f"{self.user.username} - {self.amount}"

class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    created_by = models.ForeignKey(User, on_delete=models.CASCADE)
    is_default = models.BooleanField(default=False)
    priority = models.IntegerField(default=0)
    color = models.CharField(max_length=7, default="#3182ce")  
    created_at = models.DateTimeField(auto_now_add=True)        
    updated_at = models.DateTimeField(auto_now=True)            

    def __str__(self):
        return self.name
