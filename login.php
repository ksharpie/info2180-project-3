<?php

//Start session
session_start();

//session variables
$err = "";//session error message

if (isset($_POST['submit']))
{
  if (empty($_POST['username']) || empty($_POST['password']))//check if username or password is empty
  {
      $err = "Username or Password is invalid";
  }
  else
  {
      //get username and password from form
      $user = $_POST['username'];
      $pwd = $_POST['password'];

      //connect to server
      $connection = mysql_connect("localhost", "root", "");//What are the server credenitals??

      $db = mysql_select_db("cheapoMail", $connection);//connect to database


      $query = mysql_query("select * from user where password='$password' AND username='$username'", $connection);
      $rows = mysql_num_rows($query);

      if ($rows == 1) {
          $_SESSION['user']=$username;
          header("location: home.php");//redirect to home page
      } else {
          $error = "Username or Password is invalid";
      }
      mysql_close($connection); // Closing Connection
    }
}

?>
