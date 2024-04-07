from django.contrib import admin
from database.models import LibraryTransaction, LibraryMember, Book

class Traction(admin.ModelAdmin):
    list_display = ['title', 'memberid', 'bookid', 'returndate', 'issuedate', 'condition', 'status']

admin.site.register(LibraryTransaction, Traction)

class Mem(admin.ModelAdmin):
    list_display = ['memid', 'name', 'email', 'address', 'contact_number', 'membership_type']

admin.site.register(LibraryMember, Mem)

class Books(admin.ModelAdmin):
    list_display = ["bookID", "title", "authors",
                  "language_code",
                "publisher", ]

admin.site.register(Book, Books)
