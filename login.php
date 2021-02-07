<?php
session_start();
session_unset();

/**
 * Kevin Sar, 000390567
 * Created: Friday, ‎December ‎11, ‎2020, ‏‎6:12:48 PM
 * This PHP file is for logging in to the users account or denying them access
 */
$username = filter_input(INPUT_POST, "username", FILTER_VALIDATE_EMAIL);

$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$msg = "";

try {
    $dbh = new PDO("mysql:host=localhost;dbname=000390567", "root", "");
} catch (Exception $e) {
    die("ERROR: Couldn't Connect. {$e->getMessage()}");
}

if ($username != null || $username != "" || $username != false || filter_var($username, FILTER_VALIDATE_EMAIL) )
{
    $command = "SELECT accountUsername, accountPassword FROM memomediaaccount WHERE accountUsername = ?;";
    $statement = $dbh->prepare($command);
    $parameter = [$username];
    $result = $statement->execute($parameter);
    $show = $statement->fetch();

    if($show["accountUsername"] == $username && password_verify($password, $show["accountPassword"]))
    {
        $_SESSION["Email"] = $username;
        $msg = "success";
        echo $msg;
    } else
    {
        $msg = "Invalid Username/E-mail or Password";
        echo $msg;
    }
} else
{
    session_unset();
    session_destroy();
    $msg = "Invalid Username/E-mail or Password";
        echo $msg;   
}