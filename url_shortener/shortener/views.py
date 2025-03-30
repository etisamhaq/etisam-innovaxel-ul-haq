from rest_framework import viewsets, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import redirect
from .models import URL
from .serializers import URLSerializer

class URLViewSet(viewsets.ModelViewSet):
    queryset = URL.objects.all()
    serializer_class = URLSerializer
    lookup_field = 'short_code'

    def perform_create(self, serializer):
        short_code = URL.generate_short_code()
        serializer.save(short_code=short_code)

@api_view(['GET'])
def redirect_to_original(request, short_code):
    try:
        url = URL.objects.get(short_code=short_code)
        url.access_count += 1
        url.save()
        return redirect(url.original_url)
    except URL.DoesNotExist:
        return Response(
            {'error': 'Short URL not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(['GET'])
def get_url_stats(request, short_code):
    try:
        url = URL.objects.get(short_code=short_code)
        serializer = URLSerializer(url, context={'request': request})
        return Response(serializer.data)
    except URL.DoesNotExist:
        return Response(
            {'error': 'Short URL not found'}, 
            status=status.HTTP_404_NOT_FOUND
        )