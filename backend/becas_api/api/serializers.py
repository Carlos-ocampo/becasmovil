from django.contrib.auth.models import User, Group
from rest_framework import serializers
from api.models import *


class  PaisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pais
        fields = '__all__'
        
class  UniversidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Universidad
        fields = '__all__'

class  BecaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Beca
        fields = '__all__'
        

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']