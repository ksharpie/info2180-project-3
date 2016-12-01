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
    $uID = $_POST["id"];
    
    $query = "SELECT * FROM message WHERE recipient_ids LIKE \"%|$id|%\" ORDER BY date_sent DESC LIMIT 10";
    $result = $db->query($query);
    
    $msgs = [];
    
    while($row = $result->fetch_assoc())
    {
        $msgs[$row["id"]] = $row;
    }
    
    $query = "SELECT message_id, date FROM message_read WHERE reader_id=$id";
    $result = $db->query($query);
    
    while($row = $result->fetch_assoc())
    {
        $messages[$row["message_id"]]["read_at"] = $row["date"];
    }
    
    print_r(json_encode($msgs));
}



?>