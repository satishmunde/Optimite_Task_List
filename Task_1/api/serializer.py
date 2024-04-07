from rest_framework import serializers
from database.models import LibraryTransaction, LibraryMember, Book

class LibraryTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = LibraryTransaction
        fields = ['id','title', 'memberid', 'bookid', 'returndate', 'issuedate', 'condition', 'status']



class LibraryMemberSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = LibraryMember
        fields = ['memid', 'name', 'email', 'address', 'contact_number', 'membership_type']


class BookSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Book
        fields = ['bookID', 'title', 'authors',  'language_code', 'publisher', ]

