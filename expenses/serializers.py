from rest_framework import serializers
from .models import Expense, Category

class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_color = serializers.CharField(source='category.color', read_only=True)
    receipt = serializers.ImageField(required=False, allow_null=True)
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Expense
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        validated_data['user'] = user
        return super().create(validated_data)

    def validate_amount(self, value):
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than zero.")
        return value

    def validate_description(self, value):
        if not value:
            raise serializers.ValidationError("Description cannot be empty.")
        return value

    def validate_currency(self, value):
        if not value:
            raise serializers.ValidationError("Currency cannot be empty.")
        return value

    def validate_date(self, value):
        if value is None:
            raise serializers.ValidationError("Date is required.")
        return value
    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'
        read_only_fields = ['created_by']

    def create(self, validated_data):
        validated_data['created_by'] = self.context['request'].user
        return super().create(validated_data)

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Category name cannot be empty.")
        if len(value) > 50:
            raise serializers.ValidationError("Category name cannot exceed 50 characters.")
        return value

    def validate_description(self, value):
        if value and len(value) > 500:
            raise serializers.ValidationError("Description cannot exceed 500 characters.")
        return value

