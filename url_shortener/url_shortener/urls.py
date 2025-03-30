from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shortener.views import URLViewSet, redirect_to_original, get_url_stats

router = DefaultRouter()
router.register(r'urls', URLViewSet, basename='url')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('s/<str:short_code>/', redirect_to_original, name='redirect'),
    path('api/stats/<str:short_code>/', get_url_stats, name='stats'),
]