from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Country, League, Characteristic, FootballClub
from .serializers import CountrySerializer, LeagueSerializer, CharacteristicSerializer, FootballClubSerializer

class CountryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  # Acceso público
    queryset = Country.objects.all()  # Se puede personalizar si es necesario
    serializer_class = CountrySerializer

class LeagueViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  # Acceso público
    queryset = League.objects.all()  # Se puede personalizar si es necesario
    serializer_class = LeagueSerializer

class CharacteristicViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  # Acceso público
    queryset = Characteristic.objects.all()  # Se puede personalizar si es necesario
    serializer_class = CharacteristicSerializer

class FootballClubViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.AllowAny]  # Acceso público
    queryset = FootballClub.objects.all()  # Puedes personalizar este queryset si es necesario
    serializer_class = FootballClubSerializer

    def list(self,request):
        queryset = FootballClub.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
    def create(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # Si todo es válido, guardamos el nuevo club
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset)
        return Response(serializer.data)
        
    def update(self, request, pk=None):
        queryset = self.queryset.get(pk=pk)
        serializer = self.serializer_class(queryset, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)
        
        
    def destroy(self, request, pk=None):
        instance = self.queryset.get(pk=pk)  # ✅ usamos .get() para obtener el objeto
        instance.delete()
        return Response(status=204)
