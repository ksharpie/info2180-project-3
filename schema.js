$(document).ready(function(){
    
    //setup session
    $.ajax({
        url: "session.php",
        success: function(data){
            var s = JSON.parse(data);

            if(s.hasOwnProperty("loggedIn"))
            {
                if(s.loggedIn == true){
                    if(s.hasOwnProperty("user")){
                        login(s.user);
                        return;
                    }
                }
            }
            loginPage();
        }
    });
    
    
    //execute login
    function login(result){
        
        if(result.result == "notFound"){
            $("#error").html("User not found");
        } 
        else 
        {
            if (result.result == "incorrect_login")
            {
                $("#error").html("Incorrect username or password");
            
            }
            else
            {
                if (result.result == "success")
                {
                    
                    if(result.type == "user"){
                        user(result);
                    }
                    else
                    {
                        if (result.type == "admin")
                        {
                             $.ajax({
                            url: "adminPage.html",
                            success: function(page){
                                adminPage(result, page);
                                }
                            });
                    
                        }
                    }
                }
            }
        }
    }
    
    function loginPage(){
        $.ajax({
            url: "login.html",
            success: function(page){

                $("#container").html(page);//load page into container element

                $("#loginForm").submit(function(e) {
                    
                    e.preventDefault(); //prevent form default POST action
                     
                    $.ajax({
                        type: "POST",
                        url: "login.php",
                        data: $(this).serialize(), //serialize data as json
                        success: function(data){
                            login(JSON.parse(data));
                        }
                    });
                   
                });
            }
        });
    }
    
    
    
    function adminPage(admin, page){
        $("#container").html(page);
        $("#name").html(admin.fname + " " + admin.lname);

        $("#newUserForm").submit(function(e){
            
            //prevent default POST action
            e.preventDefault();
            
            $.ajax({
                type: "POST",
                url: "register.php",
                data: $(this).serialize(),
                success: function(data){
                    console.log(data);
                    if(data == "success"){
                        $("#error").html("Registration completed successfully");
                    } else if (data == "failed"){
                        $("#error").html("There was an error processing this request.");
                    } else if (data == "nameTaken"){
                        $("#error").html("Username not unique");
                    } else if (data == "invalidPass"){
                        $("#error").html("Passwords do not match.");
                    }
                }
            });
            
        });
        
        $("#logout").click(function(){
            logOut();
        });
    }
    
    
    
    
    $("#login").click(function(){
        console.log($("#username").val());
        console.log( $("#password").val());
        $.ajax({
            type: "POST",
            url: "login.php",
            datatype: "html",
            data: {username: $("#username").val(), password: $("#password").val()},
            success: function(result){
                console.log(result.val());
                if(result == "success")
                {
                     //$('#container').load('homePage.php');
                     //$(window).load(function(){
                            //$("#mailbox").html(result);
                       // }); 
                }
                else
                {
                    if(result == "errorMessage"){
                        $("#errorMessage").html("Incorrect Login Credentials")
                    }
                    else{
                         $('#container').load('homePage.php');
                         //$(window).location.href="homePage.php";
                        $(window).load(function(){
                            $("#mailbox").html(result);
                        });   
                    }
                }
            }
        });
    });
    
    $("#saveUser").click(function(){
        $.ajax({
            type: "POST",
            url: "saveUser.php",
            datatype: "html",
            data: {username: $("#username").val(), password: $("#password").val()},
            success: function(result){
                if(result == "errorMessage"){
                    $("#errorMessage").html("User Could Not Be Created")
                }
                else{
                    window.location.href = "homePage.html";
                }
            }
        });
    });
    
    $("#sendMessage").click(function(){
        $.ajax({
            type: "POST",
            url: "schema.php",
            datatype: "html",
            data: {recipents: $("#recipient").val(), date: $("#date").val(), subject: $("#subject").val(), body: $("#body").val()},
            success: function(result){
                if(result == "errorMessage"){
                    $("#errorMessage").html("Message Could Not Be Sent")
                }
                else{
                    window.location.href = "homePage.html";
                }
            }
        });
    });
    
    $("#readMessage").click(function(){
        $.ajax({
            type: "GET",
            url: "schema.php",
            datatype: "html",
            data: {id: $(this).attr("name")},
            success: function(result){
                if(result == "errorMessage"){
                    $("#errorMessage").html("Message cannot be read")
                }
                else{
                    window.location.href = "readMessage.html";
                    $(window).load(function(){
                        $("#message").html(result);
                    });   
                }
            }
        });
    });
    
});