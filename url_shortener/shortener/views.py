from rest_framework import viewsets
from rest_framework.response import Response
from django.shortcuts import redirect
from .models import URL
from .serializers import URLSerializer

class URLViewSet(viewsets.ModelViewSet):
    queryset = URL.objects.all()
    serializer_class = URLSerializer

    def perform_create(self, serializer):
        short_code = URL.generate_short_code()
        serializer.save(short_code=short_code)

def redirect_to_original(request, short_code):
    try:
        url = URL.objects.get(short_code=short_code)
        url.access_count += 1
        url.save()
        return redirect(url.original_url)
    except URL.DoesNotExist:
        return Response({'error': 'URL not found'}, status=404)