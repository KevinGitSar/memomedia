<?php
session_start();

/**
 * Kevin Sar, 000390567
 * Created: ‎Sunday, ‎December ‎13, ‎2020, ‏‎1:52:24 PM
 * This PHP file sends request to the database to remove records
 * ||Right now I don't have the edit function :(
 */
$deleteid = filter_input(INPUT_POST, "deleteid", FILTER_VALIDATE_INT);

$typeid = filter_input(INPUT_POST, "deletetype", FILTER_SANITIZE_STRING);


if(isset($_SESSION["Email"])){

    $email = $_SESSION["Email"];

    if($typeid == "movie")
    {
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=000390567", "root", "");
        } catch (Exception $e) {
            die("ERROR: Couldn't Connect. {$e->getMessage()}");
        }
        
        $command = "DELETE FROM memomovies WHERE movieID = ? AND mediaAccount = ?;";
        $statement = $dbh->prepare($command);
        $parameter = [$deleteid, $email];
        $result = $statement->execute($parameter);

        echo "success";
    }

    else if($typeid == "tvshow")
    {
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=000390567", "root", "");
        } catch (Exception $e) {
            die("ERROR: Couldn't Connect. {$e->getMessage()}");
        }
        
        $command = "DELETE FROM memotvshows WHERE tvShowID = ? AND mediaAccount = ?;";
        $statement = $dbh->prepare($command);
        $parameter = [$deleteid, $email];
        $result = $statement->execute($parameter);
    }

    else if($typeid == "book")
    {
        try {
            $dbh = new PDO("mysql:host=localhost;dbname=000390567", "root", "");
        } catch (Exception $e) {
            die("ERROR: Couldn't Connect. {$e->getMessage()}");
        }
        
        $command = "DELETE FROM memobooks WHERE bookID = ? AND mediaAccount = ?;";
        $statement = $dbh->prepare($command);
        $parameter = [$deleteid, $email];
        $result = $statement->execute($parameter);
    }


}else {
    //Session no good
    echo "Sessiona Failed1" . "<br><br>" . "<a href='index.html'>Return to Login Page</a>";
}