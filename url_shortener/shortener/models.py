from django.db import models
import random
import string

class URL(models.Model):
    original_url = models.URLField()
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    access_count = models.IntegerField(default=0)

    @classmethod
    def generate_short_code(cls):
        length = 6
        while True:
            short_code = ''.join(random.choices(string.ascii_letters + string.digits, k=length))
            if not cls.objects.filter(short_code=short_code).exists():
                return short_code