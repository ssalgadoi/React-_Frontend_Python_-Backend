from rest_framework import serializers
from .models import Country, League, Characteristic, FootballClub


# Serializer para Country
class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name', 'create', 'modified']


# Serializer para League
class LeagueSerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = ['id', 'name', 'create', 'modified']


# Serializer para Characteristic
class CharacteristicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Characteristic
        fields = ['id', 'name', 'create', 'modified']


# Serializer para FootballClub
class FootballClubSerializer(serializers.ModelSerializer):
    league_details = LeagueSerializer(source='league', read_only=True)
    country_details = CountrySerializer(source='country', read_only=True)
    characteristics_details = serializers.SerializerMethodField()

    class Meta:
        model = FootballClub
        fields = '__all__'

    def get_characteristics_details(self, obj):
        # Filtrar las características con nombre no vacío
        characteristics = obj.characteristic.filter(name__isnull=False).exclude(name__exact='')
        return CharacteristicSerializer(characteristics, many=True).data
