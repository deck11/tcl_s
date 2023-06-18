$(document).ready(function () {

    //Validation Function
    //validateEmail
    function validateEmail(email) {
        if (email.length > 3 && email.length < 50) {
            var re =
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        } else {
            return false;
        }
    }

    //ValidatePassword
    function ValidatePassword(password, confirm) {
        if (password.length > 3 && password.length < 17) {
            if (password == confirm) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    //ValidateNumber
    function ValidateNumber(num) {
        var re = /^\d*$/;
        return re.test(num);
    }

    //ValidateDocument
    function ValidateDocument(file) {
        if(file == undefined)
        {
            return false;
        }
        else
        {
            var fileType = file["type"];
            var validDocTypes = ["application/pdf", "image/jpeg", "image/png"];

            return validDocTypes.includes(fileType);
        }
    }

    //ValidateName
    function ValidateName(name) {
        if (name.length > 3 && name.length < 50) {
            var re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            return re.test(name);
        } else {
            return false;
        }
    }

    function Validate_na(addr) {
        if (addr.trim() != '') {
            return true
        } else {
            return false;
        }
    }

    //ValidateImage
    function ValidateImage(file) {
        if(file == undefined)
        {
            return false;
        }
        else
        {
            var fileType = file["type"];
            var validImageTypes = ["image/gif", "image/jpeg", "image/png"];

            return validImageTypes.includes(fileType);
        }
    }

    //ValidatePhone
    function ValidatePhone(number) {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (number.length > 6 && number.length < 25) {
            return re.test(number);
        } else {
            return false;
        }
    }

    function isOver18(dateOfBirth) {
        // find the date 18 years ago
        const date18YrsAgo = new Date();
        date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
        // check if the date of birth is before that date
        return dateOfBirth <= date18YrsAgo;
    }

    function ValidateDob(m_dob) {
        var dob = m_dob;
        var dateString = new Date();
        if (dob < dateString) {
            if (isOver18(dob) == false) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    //setCookie
    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    //getCookie
    function getCookie(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function convertstrtodate(str) 
    {
        var date = new Date(str),
            mnth = ("0" + (date.getMonth() + 1)).slice(-2),
            day = ("0" + date.getDate()).slice(-2);

        return [date.getFullYear(), mnth, day].join("-");
    }

    if (location.pathname.split('/').slice(-1)[0] == 'manageCourses') 
    {
        //Course Name
        $('#course_name').on('keyup', function () {
            if ($(this).val().trim()!= '') 
            {
                $('.check_course_name').addClass('d-none');
            } 
            else 
            {
                $('.check_course_name').removeClass('d-none');
            }
        });

        //Course Name
        $('#course_img').on('change', function () {
            var img = document.getElementById('course_img').files[0];

            if (img != null && ValidateImage(img)) 
            {
                $('.check_course_img').addClass('d-none');
            } 
            else 
            {
                $('.check_course_img').removeClass('d-none');
            }
        });

        //Add Course
        $('#add_course').on('submit', function (e) {
            e.preventDefault();

            var add_course_token = $('#add_course_token').val().trim();
            var course_name = $('#course_name').val().trim();
            var course_img = document.getElementById('course_img').files[0];
            var course_sm_descp = $('#course_sm_descp').val().trim();
            var course_descp = $('#course_descp').val().trim();
            var course_lang = $('#course_lang').val().trim();

            if(document.getElementById('course_visibility').checked)
            {
                var course_visibility = 1;
            }
            else
            {
                var course_visibility = 0;
            }

            if(document.getElementById('course_certificate').checked)
            {
                var course_certificate = 1;
            }
            else
            {
                var course_certificate = 0;
            }

            if (course_name != '') {
                if (course_img != null && ValidateImage(course_img)) 
                {
                    $('.rm_detail').remove();
                    var formdata = new FormData();

                    formdata.append('add_course_token'   , add_course_token);
                    formdata.append('course_name'        , course_name);
                    formdata.append('course_img'         , course_img);
                    formdata.append('course_sm_descp'    , course_sm_descp);
                    formdata.append('course_descp'       , course_descp);
                    formdata.append('course_lang'        , course_lang);
                    formdata.append('course_visibility'  , course_visibility);
                    formdata.append('course_certificate' , course_certificate);

                    $('#loader').css('display', 'block');
                    $.ajax({
                        url: "Easylearn/Course_Controller/add_course",
                        data: formdata,
                        type: "POST",
                        contentType: false,
                        processData: false,
                        success: function (response) 
                        {
                            $('#loader').css('display', 'none');
                            response = JSON.parse(response);

                            if (response["data"] == "TRUE") 
                            {
                                Swal.fire({
                                    icon: "success",
                                    title: "Course Added Successfully!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                }).then((result) => {
                                    location.reload();
                                });
                            } 
                            else 
                            {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: response.data,
                                }).then((result) => {
                                    //location.reload();
                                });
                            }
                        },
                        error: function (response) 
                        {
                            $('#loader').css('display', 'none');

                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                            }).then((result) => {
                                //location.reload();
                            });
                        }
                    });
                } 
                else 
                {
                    $('.check_course_img').removeClass('d-none');
                }
            } 
            else 
            {
                $('.check_course_name').removeClass('d-none');
            }
        });

        $('#course_list').DataTable({
            dom: "<'row' <'mb-15'B>><br>lftip",
            buttons: [

                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i>',
                    titleAttr: 'Excel'
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i>',
                    titleAttr: 'CSV'
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i>',
                    titleAttr: 'Print'
                }
            ],
            rowReorder: true,
            columnDefs: [{
                    orderable: true,
                    className: "reorder",
                    targets: [0, 1, 2, 3]
                },
                {
                    orderable: false,
                    targets: "_all"
                },
            ],
            ajax: {
                url: "Easylearn/Course_Controller/course_details_getdata",
                type: "POST",
                dataSrc: function (json) {
                    if(json.data == 'False')
                    {
                        return {};
                    }
                    else{
                        return json.data;
                    }
                },
            },
            rowId: "unique_id",
            columns: [{
                    data: "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                },
                {
                    data: "course_name"
                },
                {
                    data: null,
                    render: function (data, type, row, meta) {
                        if (row.course_visibility == 1) {
                            return '<button type="button" style="border-radius: 20px;" data-id="' + row.unique_id + '" class="btn btn-sm btn-toggle course_visiblity active" data-toggle="button" aria-pressed="false" autocomplete="off"> <div style="border-radius: 50%;" class="handle"></div> </button>';
                        } else {
                            return '<button type="button" style="border-radius: 20px;" data-id="' + row.unique_id + '" class="btn btn-sm btn-toggle course_visiblity" data-toggle="button" aria-pressed="false" autocomplete="off"> <div style="border-radius: 50%;" class="handle"></div> </button>';
                        }

                    },
                },
                {
                    data: null,
                    render: function (data, type, row, meta) {
                        return '<button class="btn btn-xs text-primary view_course" id="' + row.unique_id + '"><i class="fas fa-edit"></i></button>';
                    },
                }

            ],

        });

        $('#course_list tbody').on('dblclick', 'tr', function () {
            window.location.href = "view_topic?id=" + $(this).attr('id');
        });

        $(document).on('click', '.course_visiblity', function (e) {
            e.preventDefault();
            var visibility = '';

            if ($(this).hasClass('active')) 
            {
                visibility = 1;
            } 
            else 
            {
                visibility = 0;
            }
            var id = $(this).attr('data-id');

            $.ajax({
                url: "Easylearn/Course_Controller/update_course_visible",
                type: "POST",
                data: {
                    'unique_id': id,
                    'course_visibility': visibility
                },
                success: function (response) 
                {
                    // console.log(response);
                },
                error: function (response) 
                {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    }).then((result) => {
                        //location.reload();
                    });
                },
            });

        });

        $(document).on('click', '.view_course', function (e) {
            window.location.href = "view_course?id=" + $(this).attr('id');
        });
    }

    if (location.pathname.split('/').slice(-1)[0] == 'view_course') {

        var formdata = new FormData();
        formdata.append('unique_id', $('#unique_id').val());

        $.ajax({
            url: "Easylearn/Course_Controller/get_course_details_by_id",
            data: formdata,
            type: "POST",
            contentType: false,
            processData: false,
            success: function (response) 
            {
                resp = JSON.parse(response);
                $('#course_name').val(resp.data.course_name);
                $('#course_sm_descp').val(resp.data.course_description);
                $('#course_descp').val(resp.data.course_full_description);
                $('#course_lang').val(resp.data.language);
                $('#delete_course').attr('data-id', resp.data.unique_id);


                if (resp.data.course_visibility == 1) 
                {
                    $('.course_visibility').addClass('active');
                }
                if (resp.data.course_image.trim() != '') 
                {
                    $('#view_img').attr('src', resp.data.course_image);
                }
                if (resp.data.certificate == 1) 
                {
                    $('.course_certificate').addClass('active');
                }
            },
            error: function (response) 
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                }).then((result) => {
                    location.reload();
                });
            }
        });

        //Course Name
        $('#course_name').on('keyup', function () {
            if ($(this).val().trim()!= '') 
            {
                $('.check_course_name').addClass('d-none');
            } 
            else 
            {
                $('.check_course_name').removeClass('d-none');
            }
        });

        //Question Image
        $('#course_img').on('change', function () 
        {
            var file = this.files[0];

            if (file == null) 
            {
                $('.check_edit_question_image').addClass('d-none');
                $('#view_img').attr('src', '');
            } 
            else 
            {
                if (ValidateImage(file)) 
                {
                    $('.check_edit_question_image').addClass('d-none');
                    $('#view_img').attr('src', URL.createObjectURL(file));
                } 
                else 
                {
                    $('.check_edit_question_image').removeClass('d-none');
                    $('#view_img').attr('src', '');
                }
            }
        });

        //Edit Course
        $('#edit_course').on('submit', function (e) {
            e.preventDefault();

            var edit_course_token  = $('#edit_course_token').val().trim();
            var uniqid             = $('#unique_id').val().trim();
            var course_name        = $('#course_name').val().trim();
            var course_img         = document.getElementById('course_img').files[0];
            var course_sm_descp    = $('#course_sm_descp').val().trim();
            var course_descp       = $('#course_descp').val().trim();
            var course_lang        = $('#course_lang').val().trim();
            var course_visibility  = ($('.course_visibility').hasClass('active')) ? '1' : '0';
            var course_certificate = ($('.course_certificate').hasClass('active')) ? '1' : '0';

            var formdata = new FormData();

            if (document.getElementById('course_img').files.length != 0) 
            {
                formdata.append('course_img', course_img);
            } 
            else 
            {
                formdata.append('course_img', '');
            }

            if (course_name != '') {
                $('.rm_detail').remove();

                formdata.append('edit_course_token'  , edit_course_token);
                formdata.append('uniqid'             , uniqid);
                formdata.append('course_name'        , course_name);
                formdata.append('course_sm_descp'    , course_sm_descp);
                formdata.append('course_descp'       , course_descp);
                formdata.append('course_lang'        , course_lang);
                formdata.append('course_visibility'  , course_visibility);
                formdata.append('course_certificate' , course_certificate);

                $('#loader').css('display', 'block');
                $.ajax({
                    url: "Easylearn/Course_Controller/edit_course",
                    data: formdata,
                    type: "POST",
                    contentType: false,
                    processData: false,
                    success: function (response) 
                    {
                        $('#loader').css('display', 'none');
                        response = JSON.parse(response);

                        if (response["data"] == "TRUE") 
                        {
                            Swal.fire({
                                icon: "success",
                                title: "Course Edited Successfully!",
                                showConfirmButton: false,
                                timer: 1500,
                            }).then((result) => {
                                location.reload();
                            });
                        } 
                        else 
                        {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: response.data,
                            }).then((result) => {
                                //location.reload();
                            });
                        }
                    },
                    error: function (response) 
                    {
                        $('#loader').css('display', 'none');

                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        }).then((result) => {
                            location.reload();
                        });
                    }
                });
            } 
            else 
            {
                $('.check_course_name').removeClass('d-none');
            }
        });

        //Delete Course
        $('#delete_course').on('click', function (e) {
            e.preventDefault();
            var uniqid             = $('#unique_id').val().trim();

            Swal.fire({
                title: 'Are you sure?',
                text: "You want to Delete Course",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.isConfirmed) 
                {
                    $('#loader').css('display', 'block');
                    $.ajax({
                        url: "Easylearn/Course_Controller/delete_course",
                        data: {
                            unique_id : uniqid
                        },
                        type: "POST",
                        success: function (response) 
                        {
                            $('#loader').css('display', 'none');
                            response = JSON.parse(response);

                            if (response["data"] == "TRUE") 
                            {
                                Swal.fire({
                                    icon: "success",
                                    title: "Course Deleted!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                }).then((result) => {
                                    location.href = 'manageCourses';
                                });
                            } 
                            else 
                            {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: response.data,
                                }).then((result) => {
                                    //location.reload();
                                });
                            }
                        },
                        error: function (response) 
                        {
                            $('#loader').css('display', 'none');

                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                            }).then((result) => {
                                location.reload();
                            });
                        }
                    });
                }
            });
        });
    }

    if (location.pathname.split('/').slice(-1)[0] == 'view_topic') 
    {
        var topic_list = $('#topic_list').DataTable({
            dom: "<'row' <'mb-15'B>><br>lftip",
            buttons: [

                {
                    extend: 'excelHtml5',
                    text: '<i class="fas fa-file-excel"></i>',
                    titleAttr: 'Excel'
                },
                {
                    extend: 'csvHtml5',
                    text: '<i class="fas fa-file-csv"></i>',
                    titleAttr: 'CSV'
                },
                {
                    extend: 'print',
                    text: '<i class="fas fa-print"></i>',
                    titleAttr: 'Print'
                }
            ],
            rowReorder: true,
            select: true,
            ajax: {
                url: "Easylearn/Course_Controller/gettopiclist",
                type: "POST",
                data: {
                    unique_id: $('.unique_id').val()
                },
                dataSrc: function (json) 
                {
                    if(json.data == 'False')
                    {
                        return {};
                    }
                    else{
                        return json.data;
                    }
                },
            },
            rowId: "t_unique_id",
            columns: [{
                    data: "id",
                    render: function (data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    },
                },
                {
                    data: "course_name"
                },
                {
                    data: "topic_name"
                },
                {
                    data: "sub_topic"
                },
                {
                    data: "chapter"
                },
                {
                    data: null,
                    render: function (data, type, row, meta) {
                        if (row.topic_visibility == 1) {
                            return `<button type="button" data-id="${row.t_unique_id}" style="border-radius: 20px;" class="btn btn-sm btn-toggle active topic_visibility" data-toggle="button" aria-pressed="false" autocomplete="off"> <div style="border-radius: 50%;" class="handle"></div></button>`;
                        } else {
                            return `<button type="button" data-id="${row.t_unique_id}" style="border-radius: 20px;" class="btn btn-sm btn-toggle topic_visibility" data-toggle="button" aria-pressed="false" autocomplete="off"> <div style="border-radius: 50%;" class="handle"></div> </button>`;
                        }

                    },
                }

            ],

        });

        $(document).on('click', '.topic_visibility', function () {
            var visibility = '';
            if ($(this).hasClass('active')) {
                visibility = 1;
            } else {
                visibility = 0;
            }

            var id = $(this).attr('data-id');

            $.ajax({
                url: "Easylearn/Course_Controller/update_topic_visible",
                type: "POST",
                data: {
                    unique_id: id,
                    topic_visibility: visibility
                },
                success: function (response) {

                },
                error: function (response) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                    }).then((result) => {
                        location.reload();
                    });
                },
            });

        });

        $('#topic_list tbody').on('dblclick', 'tr', function () {
            window.location.href = "view_topic_by_id?id=" + $(this).attr('id') + "&cid=" + $('#cid').val().trim();
        });
    }

    if(location.pathname.split('/').slice(-1)[0] == 'add_topic')
    {
        $('.dropify').dropify();

        $('#document_type').on('change', function(){
            if($(this).val() == 'document')
            {
                $('.link').addClass('d-none');
                $('.document').removeClass('d-none');
            }
            else
            {
                $('.document').addClass('d-none');
                $('.link').removeClass('d-none');
            }
        });

        $('#add_topic').on('submit',function(e){
            e.preventDefault();

            var course_nm      = $('#course_nm').val().trim();
            var topic_nm       = $('#topic_nm').val().trim();
            var topic_img      = document.getElementById('topic_img').files[0];
            var sub_topic      = $('#sub_topic_nm').val().trim();
            var chap_nm        = $('#chap_nm').val().trim();
            var document_type  = $('#document_type').val().trim();
            var topic_doc      = document.getElementById('topic_doc').files[0];
            var topic_doc_link = $('#topic_doc_link').val().trim();
            var vid_link       = $('#topic_video_link').val().trim();
            var vid_lab_link   = $('#topic_video_lab_link').val().trim();
            var topic_descp    = $('#topic_descp').val().trim();

            if(course_nm!='')
            {
                if(topic_nm!='')
                {
                    if(ValidateImage(topic_img) || document.getElementById('topic_img').files.length == 0)
                    {
                        if(topic_doc != null || topic_doc_link != '' || vid_link != '')
                        {
                            var formdata = new FormData();
                            formdata.append('course_id'     , course_nm);
                            formdata.append('topic_nm'      , topic_nm);
                            formdata.append('topic_img'     , topic_img);
                            formdata.append('sub_topic'     , sub_topic);
                            formdata.append('chap_nm'       , chap_nm);
                            formdata.append('document_type' , document_type);

                            var data = 0;
                            if(document_type == 'document')
                            {   
                                if(topic_doc != null)
                                {
                                    data = 1;
                                    formdata.append('topic_doc'    , topic_doc);
                                }
                            }
                            else
                            {
                                if(topic_doc_link != null)
                                {
                                    data = 1;
                                    formdata.append('topic_doc_link' , topic_doc_link);
                                }
                            }

                            if(vid_link != '')
                            {
                                data = 1;
                            }
                            formdata.append('vid_link'     , vid_link);
                            formdata.append('vid_lab_link' , vid_lab_link);
                            formdata.append('topic_descp'  , topic_descp);

                            if(data == 1)
                            {   
                                $('#loader').css('display', 'block');

                                $.ajax({
                                    url: "Easylearn/Course_Controller/add_topic",
                                    type: "POST",
                                    data:formdata,
                                    contentType: false,
                                    processData: false,
                                    success: function (response) 
                                    {
                                        $('#loader').css('display', 'none');

                                        resp = JSON.parse(response);
                                        if(resp.data = "TRUE")
                                        {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Successfully Added!",
                                            }).then((result) => {
                                                //location.reload();
                                            });
                                        }
                                        else
                                        {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: resp.data,
                                            }).then((result) => {
                                                //location.reload();
                                            });
                                        }              
                                    },
                                    error: function (response) 
                                    {
                                        $('#loader').css('display', 'none');

                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "Something Went Wrong",
                                        }).then((result) => {
                                            //location.reload();
                                        });
                                    },
                                });
                            }
                            else
                            {
                                $('.check-topic_doc_vlink').removeClass('d-none');
                            }
                        }
                        else
                        {
                            $('.check-topic_doc_vlink').removeClass('d-none');
                        }
                    }
                    else
                    {
                        $('.check-topic_img').removeClass('d-none');
                    }
                }
                else
                {
                    $('.check-topic_nm').removeClass('d-none');
                }
            }
            else
            {
                $('.check-course_nm').removeClass('d-none');
            }
        });

        $('#topic_nm').on('keyup',function(){
            if($(this).val().trim() =='')
            {
                $('.check-topic_nm').removeClass('d-none');
            }
            else
            {
                $('.check-topic_nm').addClass('d-none');
            }
        });

        $('#topic_img').on('change', function(){

            var file = document.getElementById('topic_img').files[0];

            if(file == null)
            {
                $('.check-topic_img').addClass('d-none');
            }
            else
            {
                if(ValidateImage(file))
                {
                    $('.check-topic_img').addClass('d-none');
                }
                else
                {
                    $('.check-topic_img').removeClass('d-none');
                } 
            }
        });

        $('#topic_doc').on('change', function(){

            var file = this.files[0];

            if(file == null)
            {
                $('.check-topic_doc').addClass('d-none');
            }
            else
            {
                if(ValidateDocument(file))
                {
                    $('.check-topic_doc').addClass('d-none');
                }
                else
                {
                    $('.check-topic_doc').removeClass('d-none');
                } 
            }
        });

        $('#topic_doc_link').on('keyup',function(){
            $('.check-topic_doc_vlink').addClass('d-none');
        });

        $('#topic_video_link').on('keyup',function(){
            $('.check-topic_doc_vlink').addClass('d-none');
        });

        $('#multiple_topics_add').on('submit',function(e){
            e.preventDefault();

            if(document.getElementById('multiple_topics').files.length > 0)
            {
                var mtopic_file = document.getElementById('multiple_topics').files[0];
                
                var formdata = new FormData();
                formdata.append('course_id'        , $('#course_id').val().trim());
                formdata.append('mtopic_file'      , mtopic_file);
                formdata.append('add_mtopic_token' , $('#add_mtopic_token').val().trim());

                $('#loader').css('display', 'block');

                $.ajax({
                    url: "HTMLtoCSV/add_mtopic",
                    type: "POST",
                    data: formdata,
                    contentType: false,
                    processData: false,
                    success: function (response) 
                    {
                        console.log(response);
                        $('#loader').css('display', 'none');

                        var resp = JSON.parse(response);
                        if(resp.data > 0)
                        {
                            Swal.fire({
                                icon: "success",
                                title: resp.data+" Inserted Topics",
                            }).then((result) => {
                                let csvContent = "data:text/csv;charset=utf-8," + resp.not_insert.map(e => e.join(",")).join("\n");
                                var encodedUri = encodeURI(csvContent);
                
                                var link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "error_topic_list.csv");
                                document.body.appendChild(link); 
                                link.click();
                            });

                            location.reload();
                        }
                        else
                        {
                            Swal.fire({
                                icon: "error",
                                text: resp.data,
                            }).then((result) => {
                                let csvContent = "data:text/csv;charset=utf-8," + resp.not_insert.map(e => e.join(",")).join("\n");
                                var encodedUri = encodeURI(csvContent);
                           
                                var link = document.createElement("a");
                                link.setAttribute("href", encodedUri);
                                link.setAttribute("download", "error_topic_list.csv");
                                document.body.appendChild(link); 
                                link.click();    
                            }); 

                            location.reload();
                        }               
                    },
                    error: function (response) 
                    {
                        $('#loader').css('display', 'none');

                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "Something went wrong!",
                        }).then((result) => {
                            //location.reload();
                        }); 
                    },
                });
            }
            else
            {
                Swal.fire({
                    icon: "error",
                    text: "Drop CSV Files!",
                });
            }
        });
    }

    if(location.pathname.split('/').slice(-1)[0] == 'view_topic_by_id')
    {
        var def_img = '';

        var formdata = new FormData();
        formdata.append('unique_id' , $('#t_unique_id').val());

        $.ajax({
            url: "Easylearn/Course_Controller/view_topic_by_id",
            data: formdata,
            type: "POST",
            contentType: false,
            processData: false,
            success: function (response) 
            {
                resp = JSON.parse(response);
                $('#course_nm').val(resp.data.course_id);
                $('#topic_nm').val(resp.data.topic_name);
                $('#topic_descp').val(resp.data.topic_description);
                $('#chap_nm').val(resp.data.chapter);
                $('#sub_topic_nm').val(resp.data.sub_topic);
                $('#topic_video_lab_link').val(resp.data.lab_video_links);
                $('#topic_video_link').val(resp.data.video_links);
                $('#topic_doc_link').val(resp.data.topic_docs);

                if(resp.data.topic_image!='')
                {
                    $('#view_img').attr('src',resp.data.topic_image);
                }
                else
                {
                    $('#view_img').attr('src','');
                }
            },
            error: function (response) 
            {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                }).then((result) => {
                    //location.reload();
                });
            }
        });

        $('#document_type').on('change', function(){
            if($(this).val() == 'document')
            {
                $('.link').addClass('d-none');
                $('.document').removeClass('d-none');
            }
            else
            {
                $('.document').addClass('d-none');
                $('.link').removeClass('d-none');
            }
        });

        $('#topic_img').on('change', function(){
            var file = this.files[0];

            if(file == null)
            {
                $('.check-topic_img').addClass('d-none');
                $('#view_img').attr('src', '');
            }
            else
            {
                if(ValidateImage(file))
                {
                    $('.check-topic_img').addClass('d-none');
                    $('#view_img').attr('src', URL.createObjectURL(file));
                }
                else
                {
                    $('.check-topic_img').removeClass('d-none');
                    $('#view_img').attr('src', '');
                } 
            }
        });

        $('#topic_doc').on('change', function(){
            var file = this.files[0];

            if(file == null)
            {
                $('.check-topic_doc').addClass('d-none');
            }
            else
            {
                if(ValidateDocument(file))
                {
                    $('.check-topic_doc').addClass('d-none');
                }
                else
                {
                    $('.check-topic_doc').removeClass('d-none');
                } 
            }
        });

        $('#topic_nm').on('keyup',function(){
            if($(this).val().trim() =='')
            {
                $('.check-topic_nm').removeClass('d-none');
            }
            else
            {
                $('.check-topic_nm').addClass('d-none');
            }
        });

        $('#edit_topic').on('submit',function(e){
            e.preventDefault();
            
            var uid            = $('#t_unique_id').val();
            var course_nm      = $('#course_nm').val().trim();
            var topic_nm       = $('#topic_nm').val().trim();
            var topic_img      = document.getElementById('topic_img').files[0];
            var sub_topic      = $('#sub_topic_nm').val().trim();
            var chap_nm        = $('#chap_nm').val().trim();
            var document_type  = $('#document_type').val().trim();
            var topic_doc      = document.getElementById('topic_doc').files[0];
            var topic_doc_link = $('#topic_doc_link').val().trim();
            var vid_link       = $('#topic_video_link').val().trim();
            var vid_lab_link   = $('#topic_video_lab_link').val().trim();
            var topic_descp    = $('#topic_descp').val().trim();

            if(course_nm!='')
            {
                if(topic_nm!='')
                {
                    if(ValidateImage(topic_img) || document.getElementById('topic_img').files.length == 0)
                    {
                        if(topic_doc != null || topic_doc_link != '' || vid_link != '')
                        {
                            var formdata = new FormData();
                            formdata.append('edit_topic_token' , $('#edit_topic_token').val());
                            formdata.append('unique_id'        , uid);
                            formdata.append('course_id'        , course_nm);
                            formdata.append('topic_nm'         , topic_nm);
                            formdata.append('topic_img'        , topic_img);
                            formdata.append('sub_topic'        , sub_topic);
                            formdata.append('chap_nm'          , chap_nm);
                            formdata.append('document_type'    , document_type);

                            var data = 0;
                            if(document_type == 'document')
                            {   
                                if(topic_doc != null)
                                {
                                    data = 1;
                                    formdata.append('topic_doc'    , topic_doc);
                                }
                            }
                            else
                            {
                                if(topic_doc_link != null)
                                {
                                    data = 1;
                                    formdata.append('topic_doc_link' , topic_doc_link);
                                }
                            }

                            if(vid_link != '')
                            {
                                data = 1;
                            }
                            formdata.append('vid_link'     , vid_link);
                            formdata.append('vid_lab_link' , vid_lab_link);
                            formdata.append('topic_descp'  , topic_descp);

                            if(data == 1)
                            {   
                                $('#loader').css('display', 'block');

                                $.ajax({
                                    url: "Easylearn/Course_Controller/edit_topic",
                                    type: "POST",
                                    data:formdata,
                                    contentType: false,
                                    processData: false,
                                    success: function (response) 
                                    {
                                        $('#loader').css('display', 'none');
                                        resp = JSON.parse(response);
                                        
                                        if(resp.data = "TRUE")
                                        {
                                            Swal.fire({
                                                icon: "success",
                                                title: "Successfully Updated!",
                                            }).then((result) => {
                                                location.reload();
                                            });
                                        }
                                        else
                                        {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: resp.data,
                                            }).then((result) => {
                                                //location.reload();
                                            });
                                        }              
                                    },
                                    error: function (response) 
                                    {
                                        $('#loader').css('display', 'none');

                                        Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "Something Went Wrong",
                                        }).then((result) => {
                                            location.reload();
                                        });
                                    },
                                });
                            }
                            else
                            {
                                $('.check-topic_doc_vlink').removeClass('d-none');
                            }
                        }
                        else
                        {
                            $('.check-topic_doc_vlink').removeClass('d-none');
                        }
                    }
                    else
                    {
                        $('.check-topic_img').removeClass('d-none');
                    }
                }
                else
                {
                    $('.check-topic_nm').removeClass('d-none');
                }
            }
            else
            {
                $('.check-course_nm').removeClass('d-none');
            }
        });

        //Delete Course
        $('#delete_topic').on('click', function (e) {
            e.preventDefault();
            var uid = $('#t_unique_id').val();

            Swal.fire({
                title: 'Are you sure?',
                text: "You want to Delete Course",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Delete'
            }).then((result) => {
                if (result.isConfirmed) 
                {
                    $('#loader').css('display', 'block');
                    $.ajax({
                        url: "Easylearn/Course_Controller/delete_topic",
                        data: {
                            unique_id : uid
                        },
                        type: "POST",
                        success: function (response) 
                        {
                            $('#loader').css('display', 'none');
                            response = JSON.parse(response);

                            if (response["data"] == "TRUE") 
                            {
                                Swal.fire({
                                    icon: "success",
                                    title: "Topic Deleted!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                }).then((result) => {
                                    location.href = 'view_topic?id='+$('#cid').val();
                                });
                            } 
                            else 
                            {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: response.data,
                                }).then((result) => {
                                    //location.reload();
                                });
                            }
                        },
                        error: function (response) 
                        {
                            $('#loader').css('display', 'none');

                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                            }).then((result) => {
                                //location.reload();
                            });
                        }
                    });
                }
            });
        });
    }

    if (location.pathname.split('/').slice(-1)[0] == 'course_content') 
    {
        $('.show-topic').on('click', function () {
            var id = $(this).attr('data-id');

            $.ajax({
                url: 'Easylearn/Course_Controller/get_topic_by_id',
                type: 'POST',
                data: {
                    'unique_id': id
                },
                async: false,
                success: function (response) 
                {
                    if($('.sidebar-mini').hasClass('sidebar-open'))
                    {
                        $('.sidebar-mini').removeClass('sidebar-open');
                    }
                    response = JSON.parse(response);

                    $('#breadcrumb').html('');
                    $('#breadcrumb').removeClass('d-none');

                    $('#prev_topic').attr('data-id', response.data['id']);
                    $('#next_topic').attr('data-id', response.data['id']);

                    if (response.data['topic_name'].trim() != '') {
                        $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['topic_name'] + ' </li>');
                    }
                    if (response.data['sub_topic'].trim() != '') {
                        $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['sub_topic'] + ' </li>');
                    }
                    if (response.data['chapter'].trim() != '') {
                        $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['chapter'] + ' </li>');
                    }

                    if (response.data['topic_description'].trim() == '') {
                        $('.topic_description').addClass('d-none');
                        $('#topic_description').html('');
                    } else {
                        $('.topic_description').removeClass('d-none');
                        $('#topic_description').html(response.data['topic_description']);
                    }

                    $('#tab-list').addClass('d-none');

                    $('#course_material').removeClass('show').removeClass('active');
                    $('#course_video').removeClass('show').removeClass('active');
                    $('#lab_video').removeClass('show').removeClass('active');

                    $('.course_material').addClass('d-none');
                    $('.course_video').addClass('d-none');
                    $('.lab_video').addClass('d-none');

                    tabs = 0;

                    if (response.data['topic_docs'].trim() != '') {
                        tabs = tabs + 1;

                        $('.course_material').removeClass('d-none');
                        $('#course_material').addClass('show').addClass('active');

                        $('#course_material_holder').attr('src', response.data['topic_docs']);
                    }

                    if (response.data['video_links'].trim() != '') {
                        if (tabs == 1) {
                            $('#tab-list').removeClass('d-none');
                        } else {
                            $('#course_video').addClass('show').addClass('active');
                        }
                        $('.course_video').removeClass('d-none');

                        $('#course_video_holder').attr('src', response.data['video_links']);

                        tabs = tabs + 1;
                    }

                    if (response.data['lab_video_links'].trim() != '') {
                        if (tabs >= 1) {
                            $('#tab-list').removeClass('d-none');
                        } else {
                            $('#lab_video').addClass('show').addClass('active');
                        }
                        $('.lab_video').removeClass('d-none');

                        $('#lab_video_holder').attr('src', response.data['lab_video_links']);
                    }
                },
                error: function (response) {
                    console.log(response);
                }
            });
        });

        $('#prev_topic').on('click', function () {
            var id = $(this).attr('data-id');
            var unique_id = (location.search.split(name + '=')[1] || '').split('&')[0];

            $.ajax({
                url: 'Easylearn/Course_Controller/get_prev_topic_by_id',
                type: 'POST',
                data: {
                    'id': id,
                    'unique_id': unique_id
                },
                async: false,
                success: function (response) {
                    response = JSON.parse(response);

                    if (response.data == 'FALSE') 
                    {
                        $.Toast("Error", "No previous video", "error", {
                            has_icon: true,
                            has_close_btn: true,
                            stack: true,
                            position_class: "toast-top-center",
                            timeout: 1500,
                            sticky: false,
                            has_progress: true,
                            rtl: false,
                        });
                    } 
                    else 
                    {
                        $('#breadcrumb').html('');
                        $('#breadcrumb').removeClass('d-none');

                        $('#prev_topic').attr('data-id', response.data['id']);
                        $('#next_topic').attr('data-id', response.data['id']);

                        if (response.data['topic_name'].trim() != '') {
                            $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['topic_name'] + ' </li>');
                        }
                        if (response.data['sub_topic'].trim() != '') {
                            $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['sub_topic'] + ' </li>');
                        }
                        if (response.data['chapter'].trim() != '') {
                            $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['chapter'] + ' </li>');
                        }

                        if (response.data['topic_description'].trim() == '') {
                            $('.topic_description').addClass('d-none');
                            $('#topic_description').html('');
                        } else {
                            $('.topic_description').removeClass('d-none');
                            $('#topic_description').html(response.data['topic_description']);
                        }

                        $('#tab-list').addClass('d-none');

                        $('#course_material').removeClass('show').removeClass('active');
                        $('#course_video').removeClass('show').removeClass('active');
                        $('#lab_video').removeClass('show').removeClass('active');

                        $('.course_material').addClass('d-none');
                        $('.course_video').addClass('d-none');
                        $('.lab_video').addClass('d-none');

                        tabs = 0;

                        if (response.data['topic_docs'].trim() != '') {
                            tabs = tabs + 1;

                            $('.course_material').removeClass('d-none');
                            $('#course_material').addClass('show').addClass('active');

                            $('#course_material_holder').attr('src', response.data['topic_docs']);
                        }

                        if (response.data['video_links'].trim() != '') {
                            if (tabs == 1) {
                                $('#tab-list').removeClass('d-none');
                            } else {
                                $('#course_video').addClass('show').addClass('active');
                            }
                            $('.course_video').removeClass('d-none');

                            $('#course_video_holder').attr('src', response.data['video_links']);

                            tabs = tabs + 1;
                        }

                        if (response.data['lab_video_links'].trim() != '') {
                            if (tabs >= 1) {
                                $('#tab-list').removeClass('d-none');
                            } else {
                                $('#lab_video').addClass('show').addClass('active');
                            }
                            $('.lab_video').removeClass('d-none');

                            $('#lab_video_holder').attr('src', response.data['lab_video_links']);
                        }
                    }
                },
                error: function (response) {
                    console.log(response);
                }
            });
        });

        $('#next_topic').on('click', function () {
            var id = $(this).attr('data-id');
            var unique_id = (location.search.split(name + '=')[1] || '').split('&')[0];

            $.ajax({
                url: 'Easylearn/Course_Controller/get_next_topic_by_id',
                type: 'POST',
                data: {
                    'id': id,
                    'unique_id': unique_id
                },
                async: false,
                success: function (response) {
                    response = JSON.parse(response);

                    if (response.data == 'FALSE') 
                    {
                        $.Toast("Error", "No previous video", "error", {
                            has_icon: true,
                            has_close_btn: true,
                            stack: true,
                            position_class: "toast-top-center",
                            timeout: 1500,
                            sticky: false,
                            has_progress: true,
                            rtl: false,
                        });
                    } 
                    else 
                    {
                        $('#breadcrumb').html('');
                        $('#breadcrumb').removeClass('d-none');

                        $('#prev_topic').attr('data-id', response.data['id']);
                        $('#next_topic').attr('data-id', response.data['id']);

                        if (response.data['topic_name'].trim() != '') {
                            $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['topic_name'] + ' </li>');
                        }
                        if (response.data['sub_topic'].trim() != '') {
                            $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['sub_topic'] + ' </li>');
                        }
                        if (response.data['chapter'].trim() != '') {
                            $('#breadcrumb').append('<li class="breadcrumb-item"> ' + response.data['chapter'] + ' </li>');
                        }

                        if (response.data['topic_description'].trim() == '') {
                            $('.topic_description').addClass('d-none');
                            $('#topic_description').html('');
                        } else {
                            $('.topic_description').removeClass('d-none');
                            $('#topic_description').html(response.data['topic_description']);
                        }

                        $('#tab-list').addClass('d-none');

                        $('#course_material').removeClass('show').removeClass('active');
                        $('#course_video').removeClass('show').removeClass('active');
                        $('#lab_video').removeClass('show').removeClass('active');

                        $('.course_material').addClass('d-none');
                        $('.course_video').addClass('d-none');
                        $('.lab_video').addClass('d-none');

                        tabs = 0;

                        if (response.data['topic_docs'].trim() != '') {
                            tabs = tabs + 1;

                            $('.course_material').removeClass('d-none');
                            $('#course_material').addClass('show').addClass('active');

                            $('#course_material_holder').attr('src', response.data['topic_docs']);
                        }

                        if (response.data['video_links'].trim() != '') {
                            if (tabs == 1) {
                                $('#tab-list').removeClass('d-none');
                            } else {
                                $('#course_video').addClass('show').addClass('active');
                            }
                            $('.course_video').removeClass('d-none');

                            $('#course_video_holder').attr('src', response.data['video_links']);

                            tabs = tabs + 1;
                        }

                        if (response.data['lab_video_links'].trim() != '') {
                            if (tabs >= 1) {
                                $('#tab-list').removeClass('d-none');
                            } else {
                                $('#lab_video').addClass('show').addClass('active');
                            }
                            $('.lab_video').removeClass('d-none');

                            $('#lab_video_holder').attr('src', response.data['lab_video_links']);
                        }
                    }
                },
                error: function (response) {
                    console.log(response);
                }
            });
        });

        //Record Topics Completed
        setInterval(function () {
            var unique_id = (location.search.split(name + '=')[1] || '').split('&')[0];
            var topic_id  = $('#prev_topic').attr('data-id');

            $.ajax({
                url: 'Easylearn/Course_Controller/record_topics_completed',
                type: 'POST',
                data: {
                    'unique_id': unique_id,
                    'topic_id' : topic_id
                },
                success: function (response) {

                },
                error: function (response) {
                    console.log(response);
                }
            });
        }, 60000);

        //Hours Spent
        setInterval(function () {
            var unique_id = (location.search.split(name + '=')[1] || '').split('&')[0];
            var topic_id  = $('#prev_topic').attr('data-id');

            $.ajax({
                url: 'Easylearn/Course_Controller/record_hours_spent',
                type: 'POST',
                data: {
                    'unique_id': unique_id,
                    'topic_id' : topic_id
                },
                success: function (response) {

                },
                error: function (response) {
                    console.log(response);
                }
            });
        }, 60000);
    }
});