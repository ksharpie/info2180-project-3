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
    $query = "SELECT * FROM user";
	$result = $db->query($query);

	$users = array();

	while($row = $result->fetch_assoc()){
		$users[$row["id"]] = array("id"=>$row["id"], "username"=>$row["username"], "firstname"=>$row["firstname"], "lastname"=>$row["lastname"]);
	}

	print_r(json_encode($users));
}

?>