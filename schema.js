$(document).ready(function(){
    
    $("#login").click(function(){
        $.ajax({
            type: "GET",
            url: "schema.php",
            datatype: "html",
            data: {username: $("#username").val(), password: $("#password").val()},
            success: function(result){
                if(result == "errorMessage"){
                    $("#errorMessage").html("Incorrect Login Credentials")
                }
                else{
                    window.location.href = "homePage.html";
                    $(window).load(function(){
                        $("#mailbox").html(result);
                    });   
                }
            }
        });
    });
    
    $("#saveUser").click(function(){
        $.ajax({
            type: "POST",
            url: "schema.php",
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
    
    $("#createUser").click(function(){
        window.location.href = "createUser.html";
    });
    
    $("#createMessage").click(function(){
        window.location.href = "createMessage.html";
    });
    
    $("#readMessage").click(function(){
        window.location.href = "readMessage.html";
    });
    
    $("#logout").click(function(){
        window.location.href = "login.html";
    });
    
    $("#cancel").click(function(){
        window.history.back();
    });
});