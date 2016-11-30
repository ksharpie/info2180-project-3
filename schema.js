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
                if(result.result == "dbErr")
                {
                    $("#error").html("Database Error.");
                }
                else
                {
                    if (result.result == "success")
                    {
                        
                        if(result.type == "user"){
                            $.ajax({
                                url: "user.html",
                                success: function(page){
                                    userPage(result, page);
                                }
                            });
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
    }
    
    function logOut(){
        if(confirm("Are you sure you want to log out?")){
            $.ajax({
                url: "logout.php",
                success: function(data){
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
            });
        }
    }
    
    function userPage(user,page){
        $("body").html(page);
        $("#name").html(user.fname + " " + user.lname);

        // logout
        $("#logout").click(function(){
            logOut();
        });

        var users;
        // get users list
        $.ajax({
            url: "users.php",
            success: function(data){
                users = JSON.parse(data);
                // get messages
                getMessages(user, users)
            }
        });

        $("#compose").click(function(){
            newMessage(user, users);
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
            logOut();//log out
        });
    }
    
    function getMessages(user, users)
    {
        $.ajax({
            type: "POST",
            url: "getmessages.php",
            data: { id: user.id },
            success: function(data){
                $("#msglst").html("");
                var msgs = JSON.parse(data);
                if(msgs.length==0){
                    $("#msgHeader").html("No messages.");
                } else {
                    for(i in msgs){
                        var msg = msgs[i];
                        var li = $("<li id='"+i+"' class='message'>");
                        var sender = users[msg.user_id];
                        var s_name = sender.firstname + " " + sender.lastname;
                        $(li).append(s_name+" - "+msg.subject);
                        // add styles for read messages
                        if( msg.hasOwnProperty("read_at") )
                            $(li).addClass("read");
                        $("#msglst").append(li);
                    }
                }

                $(".message").each(function(){
                    $(this).click(function(){
                        var msg = msgs[$(this).attr("id")];
                        if(!msg.hasOwnProperty("read_at")){
                            $.ajax({
                                    type: "POST",
                                    url: "markRead.php",
                                    data: {
                                            message_id: msg.id,
                                            reader_id: user.id
                                    },
                                    success: function(data){
                                        }
                                    });
                        }
                        getMessages(user, users);
                        showMessage(msg, users);
                    });
                });
            }
        });
    }
    
    

    
});