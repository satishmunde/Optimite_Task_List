from django.db import models
from datetime import date


class LibraryMember(models.Model):
    memid = models.CharField(max_length=10, primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    address = models.TextField()
    contact_number = models.CharField(max_length=15)
    membership_type = models.CharField(max_length=50, choices=[('Student', 'Student'), ('Faculty', 'Faculty'), ('Guest', 'Guest')])


    def __str__(self):
        return self.memid




class Book(models.Model):
    bookID = models.CharField(max_length=10, primary_key=True )
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)
    language_code = models.CharField(max_length=10)
    publisher = models.CharField(max_length=255)

    
    def __str__(self):
        return self.bookID
    


class LibraryTransaction(models.Model):
    id  = models.CharField(max_length=10, primary_key=True )
    title = models.CharField(max_length=100)
    memberid = models.ForeignKey(LibraryMember, on_delete=models.CASCADE)
    bookid = models.ForeignKey(Book, on_delete=models.CASCADE)
    returndate = models.DateField()
    issuedate = models.DateField()
    condition = models.CharField(max_length=100)
    STATUS_CHOICES = [
        ('Issued', 'Issued'),
        ('Returned', 'Returned'),
    ]

    status = models.CharField(max_length=50, choices=STATUS_CHOICES)


