from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CountryViewSet, LeagueViewSet, CharacteristicViewSet, FootballClubViewSet

router = DefaultRouter()
router.register(r'countries', CountryViewSet)
router.register(r'leagues', LeagueViewSet)
router.register(r'characteristics', CharacteristicViewSet)
router.register(r'clubs', FootballClubViewSet)

urlpatterns = router.urls