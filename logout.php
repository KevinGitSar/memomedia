<?php
session_start();

/**
 * Kevin Sar, 000390567
 * Created: ‎Saturday, ‎December ‎12, ‎2020, ‏‎8:37:20 PM
 * This PHP lets the user know they have logged out successfully
 */
if(isset($_SESSION["Email"]))
{
    session_unset();
    session_destroy();
    echo "<link rel='stylesheet' href='css/memomedia.css'>Log Out Successfully" . "<br><br>" . "<a href='index.html'>Return to Login Page</a>";
} else
{
    session_unset();
    session_destroy();
    echo "<link rel='stylesheet' href='css/memomedia.css'>You were already logged out" . "<br><br>" . "<a href='index.html'>Return to Login Page</a>";
}