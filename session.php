<?php
    //maintains current php session

	session_start();
	print_r(json_encode($_SESSION));

?>