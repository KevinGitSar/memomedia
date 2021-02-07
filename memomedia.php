<?php
session_start();

/**
 * Kevin Sar, 000390567
 * Created: ‎Friday, ‎December ‎11, ‎2020, ‏‎11:56:48 PM
 * This PHP file is to make request to insert records into the database
 * And Send the record back to memomedia.js
 */
$type = filter_input(INPUT_POST, "type", FILTER_SANITIZE_STRING);
$reload = filter_input(INPUT_POST, "reload", FILTER_SANITIZE_STRING);
$msg = "";

$movieYear = filter_input(INPUT_POST, "movieyear", FILTER_VALIDATE_INT);
$movieTitle = filter_input(INPUT_POST, "movietitle", FILTER_SANITIZE_STRING);
$movieBox = filter_input(INPUT_POST, "moviebox", FILTER_VALIDATE_INT); 

$tvShowYear = filter_input(INPUT_POST, "tvshowyear", FILTER_VALIDATE_INT);
$tvShowSeason = filter_input(INPUT_POST, "tvshowseason", FILTER_VALIDATE_INT);
$tvShowEpisode = filter_input(INPUT_POST, "tvshowepisode", FILTER_VALIDATE_INT);
$tvShowBox = filter_input(INPUT_POST, "tvshowbox", FILTER_VALIDATE_INT);
$tvShowTitle = filter_input(INPUT_POST, "tvshowtitle", FILTER_SANITIZE_STRING);

$bookYear = filter_input(INPUT_POST, "bookyear", FILTER_VALIDATE_INT);
$bookChapter = filter_input(INPUT_POST, "bookchapter", FILTER_VALIDATE_INT);
$bookPage = filter_input(INPUT_POST, "bookpage", FILTER_VALIDATE_INT);
$bookBox = filter_input(INPUT_POST, "bookbox", FILTER_VALIDATE_INT);
$bookTitle = filter_input(INPUT_POST, "booktitle", FILTER_SANITIZE_STRING);
$bookAuthor = filter_input(INPUT_POST, "bookauthor", FILTER_SANITIZE_STRING);


if(isset($_SESSION["Email"])){
    
    try {
        $dbh = new PDO("mysql:host=localhost;dbname=000390567", "root", "");
    } catch (Exception $e) {
        die("ERROR: Couldn't Connect. {$e->getMessage()}");
    }

    $email = $_SESSION["Email"];
    if ($type != null AND $type == "movie" AND $movieTitle != null AND $movieTitle != "")
    {
        $command = "INSERT INTO memomovies (mediaAccount, mediaType, movieTitle, movieYear, movieCompleted) VALUES ( ?, ?, ?, ?, ?);";
        $statement = $dbh->prepare($command);
        $parameter = [$email, $type, $movieTitle, $movieYear, $movieBox];
        $result = $statement->execute($parameter);

        echo "success";
    }
    else if ($type != null AND $type == "tvshow" AND $tvShowTitle != null AND $tvShowTitle != "")
    {
        $command = "INSERT INTO memotvshows (mediaAccount, mediaType, tvShowTitle, tvShowYear, tvShowCompleted, tvShowSeason, tvShowEpisode) VALUES (?, ?, ?, ?, ?, ?, ?);";
        $statement = $dbh->prepare($command);
        $parameter = [$email, $type, $tvShowTitle, $tvShowYear, $tvShowBox, $tvShowSeason, $tvShowEpisode];
        $result = $statement->execute($parameter);

        echo "success";
    }
    else if ($type != null AND $type == "book" AND $bookTitle != "" AND $bookTitle != null AND $bookAuthor != "" AND $bookAuthor != null)
    {
        $command = "INSERT INTO memobooks (mediaAccount, mediaType, bookTitle, bookYear, bookCompleted, bookAuthor, bookChapter, bookPage) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
        $statement = $dbh->prepare($command);
        $parameter = [$email, $type, $bookTitle, $bookYear, $bookBox, $bookAuthor, $bookChapter, $bookPage];
        $result = $statement->execute($parameter);

        echo "success";
    }

    if($reload == "reload"){
        $mediaArray = [];

        $command = "SELECT movieID, mediaAccount, mediaType, movieTitle, movieYear, movieCompleted FROM memomovies WHERE mediaAccount = ?;";
        $statement = $dbh->prepare($command);
        $parameter = [$email];
        $result = $statement->execute($parameter);

        while($show = $statement->fetch())
        {
            //Creating Movie Objects to send back to memomedia.js
            $movie = (object) ['movieid' => $show["movieID"], 'type' => $show["mediaType"], 'title' => $show["movieTitle"], 
                                'year' => $show["movieYear"], 'completed' => $show["movieCompleted"] ];
            
            array_push($mediaArray, $movie);
        }

        $command = "SELECT tvShowID, mediaAccount, mediaType, tvShowTitle, tvShowYear, tvShowCompleted, tvShowSeason, tvShowEpisode FROM memotvshows WHERE mediaAccount = ?;";
        $statement = $dbh->prepare($command);
        $parameter = [$email];
        $result = $statement->execute($parameter);

        while($show = $statement->fetch())
        {
            //Creating tvShow Objects to send back to memomedia.js
            $tvShow = (object) ['tvshowid' => $show["tvShowID"], 'type' => $show["mediaType"], 'title' => $show["tvShowTitle"],
                                 'year' => $show["tvShowYear"], 'completed' => $show["tvShowCompleted"], 'season' => $show["tvShowSeason"], 'episode' => $show["tvShowEpisode"] ];
            
            array_push($mediaArray, $tvShow);
        }

        $command = "SELECT bookID, mediaAccount, mediaType, bookTitle, bookYear, bookCompleted, bookAuthor, bookChapter, bookPage FROM memobooks WHERE mediaAccount = ?;";
        $statement = $dbh->prepare($command);
        $parameter = [$email];
        $result = $statement->execute($parameter);

        while($show = $statement->fetch())
        {
            //Creating Book Objects to send back to memomedia.js
            $book = (object) ['bookid' => $show["bookID"], 'type' => $show["mediaType"], 'title' => $show["bookTitle"],
                                 'year' => $show["bookYear"], 'completed' => $show["bookCompleted"], 'author' => $show["bookAuthor"], 'chapter' => $show["bookChapter"], 'page' => $show["bookPage"] ];
            
            array_push($mediaArray, $book);
        }

        echo json_encode($mediaArray);
    }else {
        //Session no good
        echo "<link rel='stylesheet' href='css/memomedia.css'>Session Failed: Code (-2)" . "<br><br>" . "<a href='index.html'>Return to Login Page</a>";
    }
} else {
    //Session no good
    echo "<link rel='stylesheet' href='css/memomedia.css'>Sessiona Failed: Code (-1)" . "<br><br>" . "<a href='index.html'>Return to Login Page</a>";
}


