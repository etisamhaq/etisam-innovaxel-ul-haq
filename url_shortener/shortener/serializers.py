from rest_framework import serializers
from .models import URL

class URLSerializer(serializers.ModelSerializer):
    short_url = serializers.SerializerMethodField()
    
    class Meta:
        model = URL
        fields = ['id', 'original_url', 'short_code', 'created_at', 'updated_at', 
                 'access_count', 'short_url']
        read_only_fields = ['short_code', 'created_at', 'updated_at', 
                          'access_count', 'short_url']

    def get_short_url(self, obj):
        request = self.context.get('request')
        return f"{request.scheme}://{request.get_host()}/s/{obj.short_code}"