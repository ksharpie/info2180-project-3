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
    $msgId = $_POST["message_id"];
    $rdrID = $_POST["reader_id"];
    
    $query = "INSERT INTO message_read (message_id, reader_id, date) VALUES ('$message_id', '$reader_id', NOW())";
    $db->query($query);
}

?>