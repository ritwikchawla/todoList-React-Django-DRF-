"""
WSGI config for Server project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Server.settings')

application = get_wsgi_application()
# add this vercel variable
<<<<<<< HEAD
app = application
=======
app = application
>>>>>>> 92b89afad7f6f4bdb118f6d35dc51dae20a04d09
