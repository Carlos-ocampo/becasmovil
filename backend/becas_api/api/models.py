from django.db import models

# Create your models here.

class Pais(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    emoji = models.CharField(max_length=10, blank=False)
    
    def __str__(self):
        return self.nombre + " " + self.emoji
    
class Universidad(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)
    descripcion = models.TextField(blank=True)
    
    def __str__(self):
        return self.nombre
    
class Beca(models.Model):
    CATEGORY = (
        ('Nacional', 'Nacional'),
        ('Internacional', 'Internacional'),
    )
    
    nombre = models.CharField(max_length=50, blank=False, null=False)
    porcentaje = models.DecimalField(max_digits=11, decimal_places=4, blank=False, null=False)
    requisitos = models.TextField(blank=True, null=False)
    pais = models.ForeignKey(Pais, on_delete=models.SET_NULL, blank=False, null=True)
    universidad = models.ForeignKey(Universidad, on_delete=models.SET_NULL, blank=False, null=True)
    categoria = models.CharField(max_length=50, blank=True, null=False, choices=CATEGORY) 
    created_at = models.DateTimeField(auto_now_add=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True,  blank=True)

    def __str__(self):
        return self.nombre
