from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import LibraryTransactionViewSet, LibraryMemberViewSet, BookViewSet

router = DefaultRouter()
router.register(r'library-transactions', LibraryTransactionViewSet, basename='library-transaction')
router.register(r'library-members', LibraryMemberViewSet, basename='library-member')
router.register(r'books', BookViewSet, basename='book')

urlpatterns = router.urls + [

]
