from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import permissions

from rest_framework.response import Response
from api.models import * # MODELS
from api.serializers import  * # Serializers
from django.shortcuts import redirect
# API 

def redirection(request):
    return redirect('/api/')

# Home view
def apimain(request):
    return render(request, 'main.html')

## Pais
### List, Create
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def pais_list(request):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
     
    if request.method == 'GET':
        all_apis = Pais.objects.all()
        pais_serializer = PaisSerializer(all_apis, many=True)
        return Response(pais_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'POST':
        pais_serializer = PaisSerializer(data=request.data)
        if pais_serializer.is_valid():
            pais_serializer.save()
            return Response(pais_serializer.data, status=status.HTTP_201_CREATED)
        return Response(pais_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Read Delete Update
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def pais_detail(request, pk):
    
    try:
        pais_to_view =  Pais.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET': # Retrive
        pais_serializer = PaisSerializer(pais_to_view)
        return Response(pais_serializer.data ,status=status.HTTP_200_OK)
        
    elif request.method == 'PUT': # update
        pais_serializer = PaisSerializer(pais_to_view, request.data)
        if pais_serializer.is_valid():
            pais_serializer.save()
            return Response(pais_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(pais_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE': # Delete
        pais_to_view.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
        

## Universidad
### List, Create
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def universidad_list(request):
    if request.method == 'GET': # List
        all_universidades = Universidad.objects.all()
        universidad_serializer = UniversidadSerializer(all_universidades, many=True)
        return Response(universidad_serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'POST': # Create
        universidad_serializer = UniversidadSerializer(data=request.data)
        if universidad_serializer.is_valid():
            universidad_serializer.save()
            return Response(universidad_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(universidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Read Delete Update
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def universidad_detail(request, pk):
    
    try:
        universidad_to_view =  Universidad.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET': # Retrive
        universidad_serializer = UniversidadSerializer(universidad_to_view)
        return Response(universidad_serializer.data ,status=status.HTTP_200_OK)
        
    elif request.method == 'PUT': # update
        universidad_serializer = UniversidadSerializer(universidad_to_view, request.data)
        if universidad_serializer.is_valid():
            universidad_serializer.save()
            return Response(universidad_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(universidad_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE': # Delete
        universidad_to_view.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    
# Beca
### List, Create
@api_view(['GET', 'POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def beca_list(request):
    if request.method == 'GET': # List
        all_becas = Beca.objects.all()
        becas_serializer = BecaSerializer(all_becas, many=True)
        return Response(becas_serializer.data, status=status.HTTP_200_OK)
        
    elif request.method == 'POST': # Create
        becas_serializer = BecaSerializer(data=request.data)
        if becas_serializer.is_valid():
            becas_serializer.save()
            return Response(becas_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(becas_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
### Read Delete Update
@api_view(['GET', 'PUT', 'DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def beca_detail(request, pk):
    
    try:
        becas_to_view =  Beca.objects.get(pk=pk)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET': # Retrive
        becas_serializer = BecaSerializer(becas_to_view)
        return Response(becas_serializer.data ,status=status.HTTP_200_OK)
        
    elif request.method == 'PUT': # update
        becas_serializer = BecaSerializer(becas_to_view, request.data)
        if becas_serializer.is_valid():
            becas_serializer.save()
            return Response(becas_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(becas_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    elif request.method == 'DELETE': # Delete
        becas_to_view.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]