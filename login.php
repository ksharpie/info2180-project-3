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

$u = $_POST['uname'];
$p = $_POST['pword'];
  


if (isset($_POST['submit']))
{
  if (empty($_POST['uname']) || empty($_POST['pword']))//check if username or password is empty
  {
      $err = "Please enter a username or password";
  }
  else
  {
      //get username and password from form
      $user = $_POST['uname'];
      $pwd = $_POST['pword'];

      //connect to server
      //$connection = mysql_connect("localhost", "tehjbug", "");//What are the server credenitals??
      // Create connection
      $db = new mysqli($servername, $username, $password, $database, $dbport);

     // $db = mysql_select_db("cheapoMail", $connection);//connect to database
  

      $query = mysqli_query($db,"select * from users where password='$password' AND username='$username'", $connection);
      if($query != FALSE)
      {
        $rows = mysqli_num_rows($query);
        
        if ($rows == 1) {
            $_SESSION['user']=$username;
            //header("location: homePage.php");//redirect to home page
        } else {
            $error = "Username or Password is invalid";
        }
      }
      else {
        var_dump($db);
        var_dump($query);
      }
      mysqli_close($db); // Closing Connection
    }
}

?>
