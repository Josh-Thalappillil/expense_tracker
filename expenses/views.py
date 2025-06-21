from rest_framework import viewsets
from django.shortcuts import render
from .models import Expense, Category
from .serializers import ExpenseSerializer,CategorySerializer
from rest_framework.permissions import IsAuthenticated

class ExpenseViewSet(viewsets.ModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Expense.objects.none()
        return Expense.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    def get_queryset(self):
        if not self.request.user.is_authenticated:
            return Category.objects.none()
        return Category.objects.filter(created_by=self.request.user)
    