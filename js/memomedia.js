/**
 * Kevin Sar, 000390567
 * Created: Wednesday, ‎December ‎9, ‎2020, ‏‎3:06:03 PM
 * This JavaScript file makes calls to memomedia.php to add/remove things from the database
 * and make calls to recreate the page with the right records
 */
$(document).ready(function ()
{
    /**
     * When user clicks movie tab
     * slides open the movie forms
     * and hides the other 2 forms
     */
    $("#movie").click(function()
    {
        $("#tvShowForm").slideUp().hide();
        $("#bookForm").slideUp().hide();
        $("#movieForm").slideToggle();
    });

    /**
     * When user clicks tvshows tab
     * slides open the tvshow forms
     * and hides the other 2 forms
     */
    $("#tvShow").click(function()
    {
        $("#movieForm").slideUp().hide();
        $("#bookForm").slideUp().hide();
        $("#tvShowForm").slideToggle();
    });

    /**
     * When user clicks books tab
     * slides open the books forms
     * and hides the other 2 forms
     */
    $("#book").click(function()
    {
        $("#movieForm").slideUp().hide();
        $("#tvShowForm").slideUp().hide();
        $("#bookForm").slideToggle();
    });

    start();

    /**
     * The start method sends a request to memomedia.php
     * and reconstructs the page
     */
    function start()
    {
        let reloadParams = "reload=reload";
        fetch("memomedia.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: reloadParams})
        .then(response => response.json())
        .then(fillPage)
    }

    /**
     * Resets the movie form after the user clicks add movie
     */
    function zeroSetMovie()
    {
        document.getElementById("movieTitle").value = "";
        document.getElementById("movieYear").value = 2020;
        document.getElementById("movieBox").checked = false;
    }

    /**
     * Resets the tvshow form after the user clicks add tvshow
     */
    function zeroSetTvShow()
    {
        document.getElementById("tvShowTitle").value = "";
        document.getElementById("tvShowYear").value = 2020;
        document.getElementById("tvShowSeason").value = 1;
        document.getElementById("tvShowEpisode").value = 1;
        document.getElementById("tvShowBox").checked = false;
    }

    /**
     * Resets the book form after the user clicks add book
     */
    function zeroSetBook()
    {
        document.getElementById("bookTitle").value = "";
        document.getElementById("bookYear").value = 2020;
        document.getElementById("bookAuthor").value = "";
        document.getElementById("bookChapter").value = 1;
        document.getElementById("bookPage").value = 1;
        document.getElementById("bookBox").checked = false;
    }

    /**
     * Fills the list with records that the user input
     * Whenever user puts in a new record
     * Erase the list and fills it up again
     * @param {*} array 
     */
    function fillPage(array)
    {
        $("#error").hide();
        $("#menu").show();
        
        $("#masterList").empty();
        for(i = 0; i < array.length; i++)
        {
            /**
             * Creating/Inserting Movie Records
             */
            if(array[i].type == "movie")
            {
                let movieid = array[i].movieid;
                if(array[i].completed == "1")
                {
                    checkbox = "Completed";
                }
                else
                {
                    checkbox = "Watching";
                }
                
                //Creating Delete Button
                let dButton = document.createElement("input");
                dButton.setAttribute("type", "button");
                dButton.className = "delete";
                dButton.name = movieid;
                dButton.varAtt = array[i].type;
                dButton.value ="X";

                //Creating Div to add movie content
                delDiv = $("<div class='del" + array[i].type + movieid + "'></div>");
                

                let test = $("<li id='limovie" + movieid +"'></li>").text(array[i].title + " (" + array[i].year + ")");
                let div = $("<div id='movie" + movieid +"'></div>");
                let line = $("<p></p>").text(checkbox);

                //Add contents together
                delDiv.append(test);
                test.prepend(dButton);

                test.append(div);
                div.append(line);
                div.hide();

                //Add it to the list
                $("#masterList").append(delDiv);
                $("#limovie" + movieid).click(function()
                {
                    $("#movie" + movieid).slideToggle();
                });

                //Reset user input
                zeroSetMovie();
            }
            
            /**
             * Creating/Inserting TvShow Records
             */
            else if(array[i].type == "tvshow")
            {
                let tvshowid = array[i].tvshowid;
                if(array[i].completed == "1")
                {
                    checkbox = "Completed";
                }
                else
                {
                    checkbox = "Watching";
                }

                //Creating delete button
                let dButton = document.createElement("input");
                dButton.setAttribute("type", "button");
                dButton.className = "delete";
                dButton.name = tvshowid;
                dButton.varAtt = array[i].type;
                dButton.value ="X";

                //Creating div to hold content
                delDiv = $("<div class='del" + array[i].type + tvshowid + "'></div>");

                let test = $("<li id='litvshow" + tvshowid +"'></li>").text(array[i].title + " (" + array[i].year + ")");
                let div = $("<div id='tvshow" + tvshowid +"'></div>");
                let line1 = $("<p></p>").text(checkbox);
                let line2 = $("<p></p>").text("Season: " + array[i].season);
                let line3 = $("<p></p>").text("Episode: " + array[i].episode);
                
                //Putting contents together
                delDiv.append(test);
                test.prepend(dButton);

                test.append(div);
                div.append(line1, line2, line3);
                div.hide();
                
                //Add it to the list
                $("#masterList").append(delDiv);
                $("#litvshow" + tvshowid).click(function()
                {
                    $("#tvshow" + tvshowid).slideToggle();
                });

                //Reset User input
                zeroSetTvShow();
            }

            /**
             * Creating/Inserting Book Records
             */
            else if(array[i].type == "book")
            {
                let bookid = array[i].bookid;
                if(array[i].completed == "1")
                {
                    checkbox = "Completed";
                }
                else
                {
                    checkbox = "Reading";
                }

                //Creating Delete Button
                let dButton = document.createElement("input");
                dButton.setAttribute("type", "button");
                dButton.className = "delete";
                dButton.name = bookid;
                dButton.varAtt = array[i].type;
                dButton.value ="X";

                //Creating Div to put together the content
                delDiv = $("<div class='del" + array[i].type + bookid + "'></div>");

                let test = $("<li id='libook" + bookid +"'></li>").text(array[i].title + " (" + array[i].year + ")");
                let div = $("<li id='book" + bookid +"'></li>");
                let line1 = $("<p></p>").text(checkbox);
                let line2 = $("<p></p>").text("Chapter: " + array[i].chapter);
                let line3 = $("<p></p>").text("Page #: " + array[i].page);
                let line4 = $("<p></p>").text("Author: " + array[i].author);

                //Putting things together
                delDiv.append(test);
                test.prepend(dButton);
                test.append(div);
                div.append(line1, line2, line3, line4);
                div.hide();
                
                //Add it to the list
                $("#masterList").append(delDiv);
                $("#libook" + bookid).click(function()
                {
                    $("#book" + bookid).slideToggle();
                });

                //Reset user input
                zeroSetBook();
            }

            //Attach the function the delete buttons
            let deleteBox = document.getElementsByClassName('delete');
            for (j = 0; j < deleteBox.length; j++) {
                if (deleteBox[j].type === 'button') {
                    deleteBox[j].addEventListener("click", deleteFunction);
                }
            }
        }  
    }

    /**
     * Deletes the record contents of the selected records
     */
    function deleteFunction() {

        let params = "deleteid=" + this.name + "&deletetype=" + this.varAtt;
        fetch("memoedit.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: params})

        let deleteMediaItem = document.getElementById("li" + this.varAtt + this.name);
        
        if (deleteMediaItem != null) {
            deleteMediaItem.remove();
        }
    }
    

    /**
     * Movie button to add movie records
     */
    let addMovieButton = document.getElementById("addMovie");
    addMovieButton.addEventListener("click", function(e){
        e.preventDefault();
        let movieTitle = document.getElementById("movieTitle").value;
        let movieYear = document.getElementById("movieYear").value;
        let movieBox = 0;
        let type = "movie";
        if(document.getElementById("movieBox").checked == true)
        {
            movieBox = 1;
        } else
        {
            movieBox = 0;
        }

        let params = "movietitle=" + movieTitle + "&movieyear=" + movieYear + "&moviebox=" + movieBox + "&type=" + type;
        fetch("memomedia.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: params})
            .then(response => response.text())

        start();
    });

    /**
     * TvShow button to add TvShow records
     */
    let addTvShowButton = document.getElementById("addTvShow");
    addTvShowButton.addEventListener("click", function(e){
        e.preventDefault();
        let tvShowTitle = document.getElementById("tvShowTitle").value;
        let tvShowYear = document.getElementById("tvShowYear").value;
        let tvShowSeason = document.getElementById("tvShowSeason").value;
        let tvShowEpisode = document.getElementById("tvShowEpisode").value;
        let tvShowBox = 0;
        let type = "tvshow";
        if(document.getElementById("tvShowBox").checked == true)
        {
            tvShowBox = 1;
        } else
        {
            tvShowBox = 0;
        }

        let params = "tvshowtitle=" + tvShowTitle + "&tvshowyear=" + tvShowYear + "&tvshowbox=" + tvShowBox + "&type=" + type + "&tvshowseason=" + tvShowSeason + "&tvshowepisode=" + tvShowEpisode;
        fetch("memomedia.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: params})
            .then(response => response.text())

        start();
    });

    /**
     * Book button to add book records
     */
    let addBookButton = document.getElementById("addBook");
    addBookButton.addEventListener("click", function(e){
        e.preventDefault();
        let bookTitle = document.getElementById("bookTitle").value;
        let bookYear = document.getElementById("bookYear").value;
        let bookAuthor = document.getElementById("bookAuthor").value;
        let bookChapter = document.getElementById("bookChapter").value;
        let bookPage = document.getElementById("bookPage").value;
        let bookBox = 0;
        let type = "book";
        if(document.getElementById("bookBox").checked == true)
        {
            bookBox = 1;
        } else
        {
            bookBox = 0;
        }

        let params = "booktitle=" + bookTitle + "&bookyear=" + bookYear + "&bookbox=" + bookBox + "&type=" + type + "&bookauthor=" + bookAuthor + "&bookchapter=" + bookChapter + "&bookpage=" + bookPage;
        fetch("memomedia.php", {method: 'POST', credentials: 'include', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: params})
            .then(response => response.text())
        
        start();
    });

    /**
     * Log out button sends user to logout.php
     */
    let logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", function()
    {
        location.href = "logout.php";
    });

});