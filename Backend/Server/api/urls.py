from django.urls import path
from . import views

urlpatterns = [
    path('',views.home),
    path('todos/',views.getAllTodos),
    path('todo/<int:todo_id>',views.getTodoById),
]
