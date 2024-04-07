
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate,login

from django.contrib.auth import logout

from database.models import *


def adminpage(request):
    if request.user.is_anonymous:
        return redirect('/')
    
    
    all_books = Book.objects.all()
    all_members = LibraryMember.objects.all()
    issued_transactions = LibraryTransaction.objects.filter(status='Issued')

    return render(request, 'admin.html', {'books': all_books, 'members': all_members,'pending': issued_transactions})

def home(request):

    
    if request.method == "POST":
        username = request.POST.get("email")
        pwd = request.POST.get("password")

        user = authenticate(username = username,password=pwd)

            
        login(request,user)
        return redirect("/admin")
    return render(request,'index.html')
    

def logoutUser(request):


    logout(request)
    return redirect('/')

