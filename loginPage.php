
<?php
include('login.php');

if(isset($_SESSION['user'])){
    header("location: profile.php");
  }
?>

<html>
    <head>
        <title>Welcome to the Cheapo Mail</title>

		<link href="schema.css" type="text/css" rel="stylesheet" />

		<script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>

		<script src="schema.js" type="text/javascript"></script>
    </head>

    <body>
        <div>

            <div id="errorMessage">
                <?php
                  echo $err;
                ?>
            </div>
            <div>
                User Name: <input class="username" type="text" name="username" id="username"/>

                Password: <input class="username" type="text" name="username" id="username"/>
            </div>
            <div>
                <button id="login">Login</button>
            </div>
        </div>
    </body>
</html>