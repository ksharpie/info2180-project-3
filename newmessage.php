<?php
session_start();

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
    $sender = $_POST["sender"];
    $recvr = "|".implode("|", $_POST["recipients"])."|";
    $subject = addslashes($_POST["subject"]);
    $body = addslashes($_POST["body"]);
    
    $query = "INSERT INTO message (recipient_ids, user_id, subject, body, date_sent) VALUES ('$recipients', $sender, '$subject', '$body', NOW())";
    
    if( $db->query(query))
    {
        echo "success";
    }
    else
    {
        echo "failure";
    }
    
    
}
?>