from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from database.models import LibraryTransaction, LibraryMember, Book
from .serializer import LibraryTransactionSerializer, LibraryMemberSerializer, BookSerializer
from rest_framework.permissions import AllowAny

class LibraryTransactionViewSet(viewsets.ModelViewSet):
    queryset = LibraryTransaction.objects.all()
    serializer_class = LibraryTransactionSerializer
    lookup_field = 'pk' 
    permission_classes = [AllowAny] 


    def create(self, request, *args, **kwargs):
  
        print('callled')
        request_data = request.data.copy()
        print(request_data)

        memid = request_data.get('id')
        print('=========memid------------')

        if not memid:
    
            request_data['id'] = self.generate_id()

  
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def generate_id(self):
     
        library_traction = LibraryTransaction.objects.last() 
        
        
   
        if library_traction:
            last_id = library_traction.id
            
            
            last_numeric_part = int(last_id[3:])  
            print(last_numeric_part)
            next_numeric_part = last_numeric_part + 1
            print(next_numeric_part)
            next_memid = f'TR{str(next_numeric_part).zfill(5)}'
            print(next_memid)
        else:
            
            print('else called')
            next_memid = 'TR00001'
        return next_memid
    


    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class LibraryMemberViewSet(viewsets.ModelViewSet):
    queryset = LibraryMember.objects.all()
    serializer_class = LibraryMemberSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny] 

    def create(self, request, *args, **kwargs):
    
        print('callled')
        request_data = request.data.copy()
        print(request_data)

        memid = request_data.get('memid')
        print('=========memid------------')

        if not memid:
          
            request_data['memid'] = self.generate_memid()

        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def generate_memid(self):

        library_member = LibraryMember.objects.last() 
        
        
   
        if library_member:
            last_memid = library_member.memid
            
            
            last_numeric_part = int(last_memid[3:]) 
            print(last_numeric_part)
            next_numeric_part = last_numeric_part + 1
            print(next_numeric_part)
            next_memid = f'MEM{str(next_numeric_part).zfill(5)}'
            print(next_memid)
        else:
            
            print('else called')
            next_memid = 'MEM00001'
        return next_memid
    

    def update(self, request, *args, **kwargs):
        
        print(self.request.data)
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    lookup_field = 'pk'
    permission_classes = [AllowAny] 


    def create(self, request, *args, **kwargs):

        print('callled')
        request_data = request.data.copy()
        
        print(request_data)

        memid = request_data.get('bookID')
        print('=========memid------------')

        if not memid:

            request_data['bookID'] = self.generate_memid()


        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def generate_memid(self):
  
        book = Book.objects.last()  
        
        
   
        if book:
            last_book = book.bookID
            
            
            last_numeric_part = int(last_book[2:])  
            print(last_numeric_part)
            next_numeric_part = last_numeric_part + 1
            print(next_numeric_part)
            next_memid = f'BK{str(next_numeric_part).zfill(6)}'
            print(next_memid)
        else:
            
            print('else called')
            next_memid = 'BK000001'
        return next_memid
 

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
