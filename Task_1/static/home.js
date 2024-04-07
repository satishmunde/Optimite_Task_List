

$(document).ready(function () {


    fetchData();
    fetchData1();





    function fetchData() {
        $.ajax({
            url: "http://127.0.0.1:8000/api/library-transactions",
            type: "GET",
            success: function (data) {


                console.log(data)
                initializeDataTable(data);
            },
            error: function (xhr, status, error) {

                console.error("Error fetching data:", error);
            }
        });
    }


    function initializeDataTable(data) {
        $('#recentBooksTable').DataTable({

            "data": data,
            "columns": [
                { "data": "id" },
                { "data": "title" },
                { "data": "memberid" },
                { "data": "bookid" },
                { "data": "returndate" },
                { "data": "issuedate" },
                { "data": "condition" },
                { "data": "status" }
            ]
        });
    }





    document.getElementById("registeruser").addEventListener("click", function () {

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var address = document.getElementById("address").value;
        var contact_number = document.getElementById("contact").value;
        var membership = document.getElementById("membership").value;


        var postData = {
            'name': name,
            'email': email,
            'address': address,
            'contact_number': contact_number,
            'membership_type': membership,


        };
        console.log(JSON.stringify(postData))



        fetch('http://127.0.0.1:8000/api/library-members/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response.body);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Transaction successfully created!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });

            })
            .catch(error => {
                Swal.fire({
                    title: 'Hello!',
                    text: 'This is a SweetAlert dialog.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

            });
    });



    document.getElementById('updateuser').addEventListener('click', function () {
        var selectedTransactionId = document.getElementById('userIDupdate').value;


        var name = document.getElementById('updatename').value
        var email = document.getElementById('updateemail').value
        var address = document.getElementById('updateaddress').value
        var contact = document.getElementById('updatecontact').value
        var member = document.getElementById('updatemembership').value
        var requestData = {
            'name': name,
            'email': email,
            'address': address,
            'contact': contact,
            'membership_type': member,



        };


        console.log(JSON.stringify(requestData))
        fetch('http://127.0.0.1:8000/api/library-members/' + selectedTransactionId + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),

            },
            body: JSON.stringify(requestData)

        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'User Updated successfully',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });

                } else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: 'User Update Failed',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    document.getElementById('bookIDb').addEventListener('change', function () {
        var selectedBook = this.options[this.selectedIndex].textContent;
        document.getElementById('bookTitle1').value = selectedBook;



    });
    document.getElementById("borrow_btn").addEventListener("click", function () {

        var title = document.getElementById("bookTitle1").value;
        var memid = document.getElementById("memberID1").value;
        var bookid = document.getElementById("bookIDb").value;
        var returndate = document.getElementById("returnDate").value;
        var condition = document.getElementById("condition").value;

        var currentDate = new Date();

        var year = currentDate.getFullYear();
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        var day = String(currentDate.getDate()).padStart(2, '0');

        var formattedDate = year + '-' + month + '-' + day;

        var postData = {
            'title': title,
            'memberid': memid,
            'bookid': bookid,
            'returndate': returndate,
            'issuedate': formattedDate,
            'condition': condition,
            'status': 'Issued'

        };

        console.log(JSON.stringify(postData));
        $('#borrowBookModal').hide();

        fetch('http://127.0.0.1:8000/api/library-transactions/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(response.body);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Transaction successfully created!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });

            })
            .catch(error => {
                Swal.fire({
                    title: 'Error !',
                    text: 'This is a SweetAlert dialog.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });

            });
    });

    document.getElementById('returnButton').addEventListener('click', function () {
        var selectedTransactionId = document.getElementById('transactionid').value;
        var currentDate = new Date();

        var year = currentDate.getFullYear();
        var month = String(currentDate.getMonth() + 1).padStart(2, '0');
        var day = String(currentDate.getDate()).padStart(2, '0');

        var formattedDate = year + '-' + month + '-' + day;

        var condition = document.getElementById('returncondition').value
        var requestData = {
            'returndate': formattedDate,
            'status': 'Returned',
            'condition': condition,
        };


        console.log(JSON.stringify(requestData))
        fetch('http://127.0.0.1:8000/api/library-transactions/' + selectedTransactionId + '/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCSRFToken(),

            },
            body: JSON.stringify(requestData)

        })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success!',
                        text: 'Transaction successfully updated!',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                    console.log('Transaction updated successfully.');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Failed!',
                        text: 'Transaction Failed TO Updated!',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });

    document.getElementById('transactionid').addEventListener('change', function () {
        var selectedTransactionId = this.value;
        fetch('http://127.0.0.1:8000/api/library-transactions/' + selectedTransactionId)
            .then(response => response.json())
            .then(data => {

                var previewData = `
                    <p>Member Id ID: ${data.memberid}</p>
                    <p>BooK ID: ${data.bookid}</p>
                    <p>Book Title: ${data.title}</p>
                    <p>return Date: ${data.returndate}</p>
        
                `;
                document.getElementById('existingdata').innerHTML = previewData;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });



    document.getElementById('userIDupdate').addEventListener('change', function () {
        var selectedTransactionId = this.value;
        fetch('http://127.0.0.1:8000/api/library-members/' + selectedTransactionId)
            .then(response => response.json())
            .then(data => {

                console.log(data);
                document.getElementById('updatename').value = data.name
                document.getElementById('updateemail').value = data.email
                document.getElementById('updateaddress').value = data.address
                document.getElementById('updatecontact').value = data.contact_number
                document.getElementById('updatemembership').value = data.membership_type
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    });

    $('#addbook').click(function () {

        var title = document.getElementById('title').value
        var authors = document.getElementById('authors').value
        var publisher = document.getElementById('publisher').value
        var language_code = document.getElementById('language_code').value



        var requestData = {
            'title': title,
            'authors': authors,
            'publisher': publisher,
            'language_code': language_code


        };

        console.log(JSON.stringify(requestData));

        $.ajax({
            url: 'http://127.0.0.1:8000/api/books/',
            type: 'POST',
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': getCSRFToken()
            },

            data: JSON.stringify(requestData),
            success: function (response) {

                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Book added successfully',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                console.log('Book added successfully:', response);
            },
            error: function (xhr, status, error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Failed TO Add Book!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }
        });
    });


    $('#updatebook').click(function () {

        var title = document.getElementById('updatetitle').value
        var authors = document.getElementById('updateauthors').value
        var publisher = document.getElementById('updatepublisher').value
        var language_code = document.getElementById('updatelanguage_code').value
        var id = document.getElementById('bookid').value



        var requestData = {
            'title': title,
            'authors': authors,
            'publisher': publisher,
            'language_code': language_code


        };

        console.log(JSON.stringify(requestData));

        $.ajax({
            url: 'http://127.0.0.1:8000/api/books/' + id + '/', // Specify your API endpoint URL
            type: 'PUT',
            contentType: 'application/json',
            headers: {
                'X-CSRFToken': getCSRFToken() // Include CSRF token in the headers
            },

            data: JSON.stringify(requestData),
            success: function (response) {
                // Handle success response here
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Book Updated successfully',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
                console.log('Book Updated successfully:', response);
            },
            error: function (xhr, status, error) {

                Swal.fire({
                    icon: 'error',
                    title: 'Failed!',
                    text: 'Failed to update book!',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload();
                    }
                });
            }
        });
    });


    function fetchData1() {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: "http://127.0.0.1:8000/api/books/",
                type: "GET",
                success: function (data) {
                    resolve(data);
                },
                error: function (xhr, status, error) {
                    reject(error);
                }
            });
        });
    }

    fetchData1().then(function (data) {
        $('#bookTable').DataTable({
            "data": data,
            "columns": [

                { "data": "bookID" },
                { "data": "title" },
                { "data": "authors" },


                { "data": "publisher" },

                {
                    "data": null,
                    "render": function (data, type, row) {
                        return '<a href="#" class="btn btn-danger delete-book-btn" onclick="deletebook(\'' + row.bookID + '\')"><i class="fas fa-trash-alt"></i></a>' +
                            '<a href="#" class="btn btn-primary register-book-btn" onclick="registerBook(\'' + row.bookID + '\')"><i class="fas fa-eye"></i></a>' +
                            '<a href="#" class="btn btn-success edit-book-btn" data-toggle="modal"  onclick="updateBook(\'' + row.bookID + '\')"data-target="#updateBookModal"><i class="fas fa-pen"></i></a></a>';
                    }

                }
            ]
        });
    }).catch(function (error) {
        console.error("Error fetching data:", error);
    });

});



$('#bookTable').on('click', '.register-book-btn', function () {
    var bookID = $(this).data('book-id');

    registerBook(bookID);
});


function registerBook(bookID) {

    $('#bookDetailsModal').modal('hide');

    $('#bookDetailsModal').modal('show');


    var url = 'http://127.0.0.1:8000/api/books/' + bookID + '/';


    $.ajax({
        url: url,
        method: 'GET',
        success: function (response) {

            var book = response;
            console.log('---------------------');

            console.log(book);

            $('#modalTitle').text(book.title);
            $('#modalBookID').text(book.bookID);
            $('#modalAuthors').text(book.authors);
            $('#modalPublisher').text(book.publisher);
            $('#modalLanguageCode').text(book.language_code);

        },
        error: function (xhr, status, error) {

            console.error('Error fetching book details:', error);
        }
    });
}



function deletebook(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to delete this book!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: 'http://127.0.0.1:8000/api/books/' + id + '/',
                type: 'DELETE',
                headers: {
                    'X-CSRFToken': getCSRFToken()
                },

                success: function (response) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Book has been deleted.',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.error('Error deleting book:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Failed to delete book.',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });
}


function updateBook(id) {




    $.ajax({
        url: 'http://127.0.0.1:8000/api/books/' + id,
        type: 'GET',
        contentType: 'application/json',
        success: function (response) {

            document.getElementById('bookid').value = id;
            document.getElementById('updatetitle').value = response.title;
            document.getElementById('updateauthors').value = response.authors;
            document.getElementById('updatepublisher').value = response.publisher;
            document.getElementById('updatelanguage_code').value = response.language_code;

            console.log('Book data retrieved successfully:', response);
            $('#bookInfoModal').hide();
        },
        error: function (xhr, status, error) {
            console.error('Error fetching book data:', error);
        }
    });
}


function getCSRFToken() {
    const cookieValue = document.cookie
        .split('; ')
        .find(row => row.startsWith('csrftoken'))
        .split('=')[1];
    return cookieValue;
}
