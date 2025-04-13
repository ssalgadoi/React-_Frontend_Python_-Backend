from django.contrib import admin
from .models import Country, League, Characteristic, FootballClub

# Registrar el modelo BaseModel para que las fechas se muestren correctamente
class BaseModelAdmin(admin.ModelAdmin):
    # Configuración para mostrar las fechas de creación y modificación
    list_display = ['create', 'modified']
    readonly_fields = ['create', 'modified']  # Hacer que las fechas no sean editables
    ordering = ['-modified']  # Ordenar por fecha de modificación descendente

# Registrar el modelo Country
@admin.register(Country)
class CountryAdmin(BaseModelAdmin):
    list_display = ['name', 'create', 'modified']
    search_fields = ['name']
    ordering = ['name']

# Registrar el modelo League
@admin.register(League)
class LeagueAdmin(BaseModelAdmin):
    list_display = ['name', 'create', 'modified']
    search_fields = ['name']
    ordering = ['name']

# Registrar el modelo Characteristic
@admin.register(Characteristic)
class CharacteristicAdmin(BaseModelAdmin):
    list_display = ['name', 'create', 'modified']
    search_fields = ['name']
    ordering = ['name']

# Registrar el modelo FootballClub
@admin.register(FootballClub)
class FootballClubAdmin(BaseModelAdmin):
    list_display = ['name', 'city', 'attendance', 'create', 'modified', 'country', 'league']
    search_fields = ['name', 'city', 'country__name', 'league__name']
    list_filter = ['country', 'league']
    ordering = ['name']

