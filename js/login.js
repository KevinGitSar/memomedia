/**
 * Kevin Sar, 000390567
 * Created: Wednesday, ‎December ‎9, ‎2020, ‏‎2:13:17 PM
 * This JavaScript file will make calls to create.php to make an account for the user
 * or make calls to login.php to see if the user can log in or not
 */
$(document).ready(function ()
{

    $("#mainPage").submit(function(e){
        e.preventDefault();
    });

    $("#signUpPage").submit(function(e){
        e.preventDefault();
    });

    $("#signUpButton").click(function(){
        $("#mainPage").hide();
        $("#signUpPage").show();
    });

    $("#returnButton").click(function(){
        $("#mainPage").show();
        $("#signUpPage").hide();
    });

    trigger = false;
    specialC = /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;

    /**
     * This is part of the password checker
     * it will check if the password contains a number or a special character
     * Uses Regex that is set in the variable 'specialC'
     * @param {*} letter 
     */
    function checkChar(letter) {
        if (!isNaN(letter * 1)) {
            num = true;
        } else if (letter.match(specialC)) {
            specialChars = true;
        } else {
            if (letter == letter.toUpperCase()) {
                caps = true;
            }
        }
    }

    /**
     * This is the full password checker
     * While the user types it will check if the
     * user will fill out the password requirements
     * @param {*} anything 
     */
    function success(anything) {
        let span = document.getElementById("target");
        let span2 = document.getElementById("target2");
        let span3 = document.getElementById("target3");
        let span4 = document.getElementById("target4");
        
        //bool flags
        num = false;
        caps = false;
        specialChars = false;

        if (anything.length >= 8) {
            span.style.color = "green";
        } else {
            span.style.color = "rgb(124, 0, 0)";
        }

        for (i = 0; i < anything.length; i++) {
            checkChar(anything[i]);
        }

        if (specialChars == false) {
            span2.style.color = "rgb(124, 0, 0)";
        } else {
            span2.style.color = "green";
        }

        if (caps == false) {
            span3.style.color = "rgb(124, 0, 0)";
        } else {
            span3.style.color = "green";
        }

        if (num == false) {
            span4.style.color = "rgb(124, 0, 0)";
        } else {
            span4.style.color = "green";
        }
        if(num == false || caps == false || specialChars == false)
        {
            trigger = false;
        } else{
            trigger = true;
        }
    }

    /**
     * This checks if the user logged in successfully or not
     * if successful, redirect user to the main part of the application
     * else, output a message for the user
     * @param {*} something 
     */
    function loginCheck(something)
    {
        if (something == "success")
        {
            location.href = 'memomedia.html';
        }else{
            $("#target6").text(something);
            $("#target6").fadeIn(2000).fadeOut(2000);
        }
    }

    /**
     * This is similar to the loginCheck
     * However this checks if the user entered an email
     * that is already in the database, lets the user know
     * they can't use that email
     * @param {*} something 
     */
    function check(something)
    {
        if(something == "Account Successfully Created")
        {
            $("#target5").css("color", "green");
        }else
        {
            $("#target5").css("color", "rgb(124, 0, 0)");
        }
        $("#target5").text(something);
        $("#target5").fadeIn(2000).fadeOut(2000);
    }

    /**
     * Eventlistener to listen for user inputting the password
     * and checking requirements right away
     */
    let password = document.getElementById("createPassword");
    password.addEventListener("keyup", function () {
        // construct the URL with parameters
        let pass = document.getElementById("createPassword").value;
        success(pass);
    });

    /**
     * Allows or denies the user for creating an account
     * Outputs message
     */
    let creatingPass = document.getElementById("createButton");
    creatingPass.addEventListener("click", function(){
        if(trigger == false)
        {
            $("#target5").text("Invalid Password");
            $("#target5").fadeIn(2000).fadeOut(2000);
        } else{
        let username = document.getElementById("createUsername").value;
        let pass = document.getElementById("createPassword").value;
        let params = "username=" + username + "&password=" + pass;

        fetch("create.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: params})
            .then(response => response.text())
            .then(check)
        }
    });

    /**
     * Allows or denies the suer for logging into an account
     */
    let login = document.getElementById("loginButton");
    login.addEventListener("click", function(){

        let loginName = document.getElementById("username").value;
        let loginPass = document.getElementById("password").value;
        let params = "username=" + loginName + "&password=" + loginPass;

        fetch("login.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: params})
            .then(response => response.text())
            .then(loginCheck)
    });
});