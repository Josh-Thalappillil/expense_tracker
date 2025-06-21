# filepath: c:\Users\Nigruto\Documents\Coding\expense_tracker\expenses\urls.py
from rest_framework.routers import DefaultRouter
from .views import ExpenseViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'expenses', ExpenseViewSet, basename='expense')
router.register(r'categories', CategoryViewSet, basename='category')

urlpatterns = router.urls