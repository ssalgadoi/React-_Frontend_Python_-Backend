from django.db import models

# Modelo base con campos comunes
class BaseModel(models.Model):
    create = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True  # Esto indica que no se creará una tabla para este modelo


# Modelo para Country
class Country(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# Modelo para League
class League(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# Modelo para Characteristic
class Characteristic(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


# Modelo para FootballClub
class FootballClub(BaseModel):
    name = models.CharField(max_length=50, unique=True)
    description = models.CharField(max_length=1000)
    attendance = models.IntegerField(null=True)
    city = models.CharField(max_length=100)

    # Claves foráneas
    country = models.ForeignKey(Country, on_delete=models.CASCADE, related_name='clubs')
    league = models.ForeignKey(League, on_delete=models.CASCADE, related_name='clubs')
    characteristic = models.ManyToManyField(Characteristic, related_name='clubs')

    def __str__(self):
        return self.name
