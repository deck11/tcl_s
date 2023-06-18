$(document).ready(function () 
{
    //Flat red color scheme for iCheck
    $('.ichack-input input[type="checkbox"].flat-red, .ichack-input input[type="radio"].flat-red').iCheck({
        checkboxClass: 'icheckbox_flat-green',
        radioClass   : 'iradio_flat-green'
    });

    //Validation Function
    //validateEmail
    function validateEmail(email) 
    {
        if (email.length > 3 && email.length < 50) 
        {
            var re =
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        } 
        else 
        {
            return false;
        }
    }
  
    //ValidatePassword
    function ValidatePassword(password, confirm) 
    {
        if (password.length > 3 && password.length < 17) 
        {
            if (password == confirm) 
            {
                return true;
            } 
            else 
            {
                return false;
            }
        } 
        else 
        {
            return false;
        }
    }
  
    //ValidateNumber
    function ValidateNumber(num) 
    {
        var re = /^\d*$/;
        return re.test(num);
    }
  
    //ValidateDocument
    function ValidateDocument(file) 
    {
        var fileType = file["type"];
        var validDocTypes = ["application/pdf", "image/jpeg", "image/png"];
    
        return validDocTypes.includes(fileType);
    }
  
    //ValidateName
    function ValidateName(name) 
    {
        if (name.length > 3 && name.length < 50) 
        {
            var re = /^([a-zA-Z]+\s)*[a-zA-Z]+$/;
            return re.test(name);
        } 
        else 
        {
            return false;
        }
    }
  
    function Validate_na(addr) 
    {
        if (addr.trim() != '') 
        {
            return true
        } 
        else 
        {
            return false;
        }
    }
  
    //ValidateImage
    function ValidateImage(file) 
    {
        var fileType = file["type"];
        var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
    
        return validImageTypes.includes(fileType);
    }
  
    //ValidatePhone
    function ValidatePhone(number) 
    {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    
        if (number.length > 6 && number.length < 25) 
        {
            return re.test(number);
        } 
        else 
        {
            return false;
        }
    }

    function isOver18(dateOfBirth) 
    {
        // find the date 18 years ago
        const date18YrsAgo = new Date();
        date18YrsAgo.setFullYear(date18YrsAgo.getFullYear() - 18);
        // check if the date of birth is before that date
        return dateOfBirth <= date18YrsAgo;
    }
  
    function ValidateDob(m_dob) 
    {
        var dob = m_dob;
        var dateString = new Date();
        if (dob < dateString) 
        {
            if (isOver18(dob) == false) 
            {
                return false;
            } 
            else 
            {
                return true;
            }
        } 
        else 
        {
            return false;
        }
    }

    //setCookie
    function setCookie(name,value,days) 
    {
        var expires = "";
        if (days) 
        {
            var date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    }

    //getCookie
    function getCookie(name) 
    {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) 
        {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    }

    if(getCookie('skin_type') != null)
    {
        var value = getCookie('skin_type');

        if(value == 'dark-skin')
        {
            $('.dark-light-mode').children().eq(0).removeClass('icon-Sun-fog');
            $('.dark-light-mode').children().eq(0).addClass('icon-Moon');
            $('.dark-light-mode').attr('title', 'Light Mode');

            $('.bg-primary-light').removeClass('bg-primary-light').addClass('bg-primary-dark');

            $('body').removeClass('light-skin');
            $('body').addClass('dark-skin');
        }
    }

    $('.dark-light-mode').on('click', function() {
        if($(this).children().eq(0).hasClass('icon-Sun-fog'))
        {
            $(this).children().eq(0).removeClass('icon-Sun-fog');
            $(this).children().eq(0).addClass('icon-Moon');
            $(this).attr('title', 'Light Mode');

            $('.bg-primary-light').removeClass('bg-primary-light').addClass('bg-primary-dark');

            $('body').removeClass('light-skin');
            $('body').addClass('dark-skin');

            setCookie('skin_type', 'dark-skin', 365);
        }
        else
        {
            $(this).children().eq(0).removeClass('icon-Moon');
            $(this).children().eq(0).addClass('icon-Sun-fog');
            $(this).attr('title', 'Dark Mode');

            $('.bg-primary-dark').addClass('bg-primary-light').removeClass('bg-primary-dark');

            $('body').removeClass('dark-skin');
            $('body').addClass('light-skin');

            setCookie('skin_type', 'light-skin', 365);
        }
    });

    //Logout
    $(".logout").on("click", function () {
        $("#loader").css("display", "block");

        $.ajax({
            url: "Easylearn/Dashboard_Controller/logout_user",
            type: "POST",
            success: function (response) 
            {
                var response = JSON.parse(response);

                if (response.data == "TRUE") {
                location.href = "home";
                }
            },
            error: function (response) 
            {
                console.log(response);
            },
        });
    });

    //Logout All
    $(".logout-all").on("click", function () {
        $("#loader").css("display", "block");

        $.ajax({
            url: "Easylearn/Dashboard_Controller/logoutall_user",
            type: "POST",
            success: function (response) 
            {
                var response = JSON.parse(response);

                if (response.data == "TRUE") 
                {
                    location.href = "profile";
                }
            },
            error: function (response) 
            {
                console.log(response);
            },
        });
    });

    //Mfa Verify
    $("#mfa_button").on("click", function () {

        var code = $("#mfa_code").val().trim();
        $("#loader").css("display", "block");
    
        if (code.length == 6) 
        {
            $.ajax({
                url: "Easylearn/Dashboard_Controller/verify_qr",
                type: "POST",
                data: {
                    code: code,
                },
                success: function (response) 
                {
                    response = JSON.parse(response);
                    $("#loader").css("display", "none");

                    if (response["data"] == "TRUE") 
                    {
                        Swal.fire({
                            icon: "success",
                            title: "OTP verification successful",
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
                            //console.log('hello1');
                        });
                    }
                },
                error: function (response) 
                {
                    $("#loader").css("display", "none");
            
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
    });

    if (location.pathname.split("/").slice(-1)[0] == 'profile')
    {
        $(".edit-profile").on("click", function () {

            $("#profile_phone").intlTelInput();
            $("#profile_phone").removeClass("d-none");
            $("#profile_image").parent().removeClass("d-none");
            $("#profile_description").removeClass("d-none");
            $("#profile_layout").removeClass("d-none");
            $("#profile_language").removeClass("d-none");
            $(".cancel-profile").parent().removeClass("d-none");
        
            $(".profile_phone").addClass("d-none");
            $(".profile_description").addClass("d-none");
            $(".profile_layout").addClass("d-none");
            $(".profile_language").addClass("d-none");
            $(".edit-profile").addClass("d-none");
            $(".edit-profile1").addClass("d-none");
        });
        
        $(".cancel-profile").on("click", function () {

            $("#profile_phone").intlTelInput('destroy');
            $("#profile_phone").addClass("d-none");
            $("#profile_image").parent().addClass("d-none");
            $("#profile_description").addClass("d-none");
            $("#profile_layout").addClass("d-none");
            $("#profile_language").addClass("d-none");
            $(".cancel-profile").parent().addClass("d-none");
        
            $(".profile_phone").removeClass("d-none");
            $(".profile_description").removeClass("d-none");
            $(".profile_layout").removeClass("d-none");
            $(".profile_language").removeClass("d-none");
            $(".edit-profile").removeClass("d-none");
            $(".edit-profile1").removeClass("d-none");

            $(".check_profile_phone").addClass("d-none");
        });

        $("#profile_image").on("change", function () {
            var file = this.files[0];
        
            if (file == null) 
            {
                $(".check_profile_image").addClass("d-none");
            } 
            else 
            {
                if (ValidateImage(file)) 
                {
                    $(".check_profile_image").addClass("d-none");
                } 
                else 
                {
                    $(".check_profile_image").removeClass("d-none");
                }
            }
        });

        $('#profile_phone').on('keyup', function () {

            if ($(this).intlTelInput('isValidNumber')) 
            {
                $('.check_profile_phone').addClass('d-none');
            } 
            else 
            {
                $('.check_profile_phone').removeClass('d-none');
            }
        });

        $("#profile_form").on("submit", function (event) {
            event.preventDefault();
            var error               = [];
            var token               = $("#profile_token").val().trim();
            var image               = document.getElementById("profile_image").files[0];
            var phone               = $('#profile_phone').intlTelInput('getNumber');
            var profile_description = $("#profile_description").val().trim();
            var profile_layout      = $("#profile_layout").val().trim();
            var profile_language    = $("#profile_language").val().trim();

            var formdata = new FormData();

            if (document.getElementById('profile_image').files.length > 0) {
                if (ValidateImage(image)) {
                    formdata.append('image' , image);
                }
                else{
                    error.push('yes');
                    $(".check_profile_image").removeClass("d-none");
                }
            }

            if(error.length == 0)
            {
                Swal.fire({
                    title: "Are you sure?",
                    text: "You want to proceed further!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes",
                }).then((result) => {
                    if (result.isConfirmed) 
                    {
                        $(".loader").css("display", "block");
                        
                        formdata.append('token'              , token);
                        formdata.append('phone'              , phone);
                        formdata.append('profile_description', profile_description);
                        formdata.append('profile_layout'     , profile_layout);
                        formdata.append('profile_language'   , profile_language);
            
                        $.ajax({
                            url: "Easylearn/Dashboard_Controller/update_profile",
                            type: "POST",
                            data:formdata,
                            contentType: false,
                            processData: false,
                            success: function (response) 
                            {
                                resp = JSON.parse(response);
                                if(resp.data = "TRUE")
                                {
                                    Swal.fire({
                                        icon: "success",
                                        text: "Successfully Updated!",
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
                            error: function (response) {
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
                });
            }
            else{
                $(".check_profile_image").removeClass("d-none");
            }
        });
    }

    if (location.pathname.split("/").slice(-1)[0] == "whiteboard") 
    {
		$.ajax({
			url: 'Easylearn/Dashboard_Controller/Check_Whiteboard',
			type: 'POST',
			contentType: false,
			processData: false,
			async: false,
			success: function (response) 
			{
				var response = JSON.parse(response);
				response = response.replace("board","live-embed");
				$('#miro_board').attr('src', response);
			},
			error: function (response) 
			{
				console.log(response);
			}
		});
	}

    //Doc Upload
    $(".docupload").on("click", function (event) {
        event.preventDefault();
    
        var unifile = document.getElementById("unifile").files[0];
        var principlefile = document.getElementById("principlefile").files[0];

        if (ValidateDocument(unifile) && ValidateDocument(principlefile)) 
        {
            formdata = new FormData();
            formdata.append("unifile"      , unifile);
            formdata.append("principlefile", principlefile);

            $('#loader').css('display', 'block');
            $.ajax({
                url: "Easylearn/Dashboard_Controller/upload",
                type: "POST",
                data: formdata,
                contentType: false,
                processData: false,
                success: function (response) 
                {
                    $('#loader').css('display', 'block');

                    $.ajax({
                        url: "Easylearn/Dashboard_Controller/logout_user",
                        type: "POST",
                        success: function (response) 
                        {
                            $('#loader').css('display', 'none');
                            var response = JSON.parse(response);

                            if (response.data == "TRUE") 
                            {
                                Swal.fire({
                                    icon: "success",
                                    title: "Successfully Uploaded",
                                    text: "Please check your mail for further details",
                                }).then((result) => {
                                    location.href = "home";
                                });
                            } 
                            else 
                            {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something Went Wrong",
                                }).then((result) => {
                                    // location.reload();
                                });
                            }
                        },
                        error: function (response) 
                        {
                            $('#loader').css('display', 'none');
                            console.log(response);
                        }
                    });
                },
                error: function (response) {
                    $('#loader').css('display', 'none');
            
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something Went Wrong",
                    }).then((result) => {
                        // location.reload();
                    });
                },
            });
        } 
        else 
        {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Upload Proper File",
            });
        }
    });

    //Enrolled Courses Double Click
    $(document).on('dblclick', '#enrolledcoursedetail', function () {
        var unique = $(this).attr('data-unique');

        location.href = 'course_content?uniqueid=' + unique;
    });
    
    //Enrolled Courses Double Click
    $(document).on('click', '#enrolledcoursedetail', function () {
        var unique = $(this).attr('data-unique');

        location.href = 'course_content?uniqueid=' + unique;
    });
});