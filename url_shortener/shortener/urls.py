from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from shortener.views import URLViewSet, redirect_to_original

router = DefaultRouter()
router.register(r'urls', URLViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('s/<str:short_code>/', redirect_to_original, name='redirect'),
]