<?php
/**
 * Kevin Sar, 000390567
 * Created: Wednesday, ‎December ‎9, ‎2020, ‏‎3:06:03 PM
 * This Php file is for creating user accounts
 * or deny the creation of user accounts
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

    $check = $statement->fetch();

    if($check == false)
    {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $command = "INSERT INTO memomediaaccount (accountUsername, accountPassword) VALUES (?, ?);";
        $statement = $dbh->prepare($command);
        $parameter = [$username, $hash];
        $result = $statement->execute($parameter);
        $msg = "Account Successfully Created";
        echo $msg;
    }

    else
    {
        $msg = "E-mail Already Used";
        echo $msg;
    }
    
} else
{
    $msg = "Invalid E-mail Format";
    echo $msg;
}
