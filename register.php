<?php
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
    $fname = addslashes($_POST["firstname"]);
    $lname = addslashes($_POST["lastname"]);
    $username = addslashes($_POST["username"]);
    $pass = $_POST["pass"];
    $passCompare = $_POST["pass2"];
    
    
    if(strcmp($pass,$passCompare) == 0)
    {
        echo "invalidPass";
        exit;
    }
    
    $query = "SELECT * FROM user WHERE username='$username'";
    $result = $db->query($query);
    
    if($result->num_rows >= 1)
    {
        echo "nameTaken";
        exit;
    }
    
    $query = "SHOW TABLE STATUS WHERE name='user'";
    $result = $db->query($query);
    $newUID = $result->fetch_assoc()["Auto_increment"];
    $passHash = hash_hmac("sha256",$pass,$newUID);
    
    $query = "INSERT INTO user (firstname, lastname, username, password) VALUES ('$fname', '$lname', '$username', '$h_pass')";
    $success = $db->query($query);
    
    if($success)
    {
        echo "success";
    }
    else
    {
        echo "failed";
        exit;
    }
    
    
}


?>