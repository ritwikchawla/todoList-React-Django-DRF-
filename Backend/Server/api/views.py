from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import TodoSerializer
from .models import Todo

# Create your views here.
@api_view(['GET'])
def home(request):
   return Response({"Api is running":"Port 8000"})

@api_view(['GET','POST'])
def getAllTodos(request):
   if request.method == 'GET':
    todo_list = Todo.objects.all()
    serializer = TodoSerializer(todo_list,many=True)
    return Response(serializer.data)
   elif request.method == 'POST':
     serializer = TodoSerializer(data=request.data)
     if serializer.is_valid():
       serializer.save()
       return Response(serializer.data,status=status.HTTP_201_CREATED)
     return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','PUT','DELETE'])   
def getTodoById(request,todo_id):
  try:
    todoItem = Todo.objects.get(id=todo_id)
  except todoItem.DoesNotExist:
    return Response({'error':'ID does not exist'},status=status.HTTP_404_NOT_FOUND)
  
  if request.method == 'GET':
    serializer = TodoSerializer(todoItem)
    return Response(serializer.data)
  
  elif request.method == 'PUT':
    serializer = TodoSerializer(todoItem,data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(data=serializer.data,status=status.HTTP_202_ACCEPTED)
    return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
  
  elif request.method == 'DELETE':
    todoItem.delete()
    return Response(data={'message':'Todo Item deleted'},status=status.HTTP_204_NO_CONTENT)