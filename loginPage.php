
<?php
include('login.php');

if(isset($_SESSION['user'])){
    header("location: homePage.php");
  }
?>

        <div>

            <div id="errorMessage">
                <?php
                  echo $err;
                ?>
            </div>
            
            <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
            <div>
                User Name: <input class="login-input" type="text" name="uname" id="username"/>

                Password: <input class="login-input" name="pword" id="password" type="password"/>
            </div>
            <div>
                <button id="login">Login</button>
            </div>
            </form>
        </div>