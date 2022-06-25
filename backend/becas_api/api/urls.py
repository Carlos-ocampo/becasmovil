from django.urls import path
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

app_name = 'api'

urlpatterns = [
    path('', views.apimain, name='main'),
    
    path('paises/', views.pais_list),
    path('paises/<int:pk>', views.pais_detail),
    
    path('universidad/', views.universidad_list),
    path('universidad/<int:pk>', views.universidad_detail),
    
    path('beca/', views.beca_list),
    path('beca/<int:pk>', views.beca_detail),
    
    path('logout/', views.logout),
]

urlpatterns = format_suffix_patterns(urlpatterns)
