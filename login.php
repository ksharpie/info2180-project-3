<?php

//Start session
session_start();

//session variables
$err = "";//session error message
$servername = getenv('IP');
$username = getenv('C9_USER');
$password = "";
$database = "cheapoMail";
$dbport = 3306;
  
$db = new mysqli($servername, $username, $password, $database, $dbport);//open connection to DB

if($db->connect_error)
{
    die("Failed to connect to DB: ".$db->connection_error);
    print_r(json_encode(array("result"=>"dbErr")));
}
else
{
    $user = $_POST["username"];
    $pword = $_POST["password"];
    $_SESSION["isLoggedIn"] = FALSE;
    
    
    $query = "SELECT * FROM user WHERE username = '$user'";
    $results = $db->query($query);
    if($results->num_rows == 0)
    {
        print_r(json_encode(array("result"=>"notFound")));
    }
    
    $assoc_user = $results->fetch_assoc;
    $uID = $assoc_user['id'];
    $pass_hash = hash_hmac("sha256",$pass,$uID);
    $storedPass = $assoc_user['password'];
    
    if(strcmp($storedPass,$pass_hash) == 0)
    {
        $SESSION["isLoggedIn"] = True;//user must be logged in because the passwords match
        
        if($uID == 1)
        {
            $type = "admin";
        }
        else
        {
            $type = "user";
        }
        
        $success = array("result"=>"success", "id"=>$uID, "type"=>$type, "fname"=>$assoc_user["firstname"], "lname"=>$assoc_user["lastname"], "username"=>$user);//create array of user details
        print_r(json_encode($success));//create json object from result array
        $_SESSION['user'] = $success;
    }
    else
    {
        print_r(json_encode(array("result"=>"incorrect_login")));
    }
    
    
}



?>
