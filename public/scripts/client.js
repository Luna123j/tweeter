$(document).ready(function() {

  // creat format new tweet with response tweet data
  const createTweetElement = function(tweetDataObj) {

    const markup = `<article class="show-tweet">
    <h5>
      <div> <img class="smallAvatar" src="${tweetDataObj.user.avatars}"> <p class="username">${tweetDataObj.user.name}</p> </div>
      <div id="login-name">${tweetDataObj.user.handle}</div>
    </h5>
    <p class="tweet-content">
      ${tweetDataObj.content.text}
    </p>
    <footer>
      <p>${timeago.format(tweetDataObj.created_at)}</p>
      <p> <i class="fa-solid fa-flag iconHover"></i> <i class='fas fa-retweet iconHover'></i> <i class="fa-solid fa-heart iconHover"></i> </p>
    </footer>
  </article>`;

    return markup;
  };

  const creatAlertMessage = function(message) {

    //clear the message before append
    $("#alertMessage").empty();

    //if user compose empty tweet
    if (message === "emptyAlert") {
      const alert = `<i class="fa-solid fa-triangle-exclamation"></i>
      Tweet contents should not be empty.
        <i class="fa-solid fa-triangle-exclamation"></i>`;
      $("#alertMessage").append(alert);
    }

    //if the tweet content exceed 140
    if (message === "lengthAlert") {
      const alert = `<i class="fa-solid fa-triangle-exclamation"></i>
      Too long. Tweet contents should not exceed 140 letters.
        <i class="fa-solid fa-triangle-exclamation"></i>`;
      $("#alertMessage").append(alert);
    }

  };

  //get styled tweet and append each exist tweet from database
  const renderTweets = function(tweetDataArr) {
    
    //clear container before append
    $('#tweets-container').empty();

    for (const tweetDataObj of tweetDataArr) {
      const $tweet = createTweetElement(tweetDataObj);
      $('#tweets-container').append($tweet);
    }
  };

  //get response
  const loadTweets = function() {

    // hide compose tweet box
    $("#new-tweet").slideUp("fast");

    $.ajax({
      url: "/tweets/",
      success: (response) => {
        renderTweets(response.reverse()); //show new tweet on the top
      },
      error: (error) => {
        console.log(error);
      }
    });

  };

  //make sure page show all tweets
  loadTweets();

  // when text area is re-clicked, hide alert box
  $('#tweet-text').click(() => {
    $("#alertMessage").empty();
    $("#alertMessage").slideUp("fast");
  });

  $('#submitTweet').submit(function(event) {

    //prevent the origin behaviour of submit event
    event.preventDefault();

    const textData = $(this).serialize(); // change input text format
    const tweetLength = $('#tweet-text').val().length;

    //if empty tweet content, show alert
    if (tweetLength === 0) {
      $("#alertMessage").slideDown("slow", creatAlertMessage("emptyAlert"));
    } else {

      //if exceed max length, show alert
      if (tweetLength > 140) {
        $("#alertMessage").slideDown("slow", creatAlertMessage("lengthAlert"));
      } else {

        
        $('#tweet-text').val("");//after submition, empty text area
        $('#char-counter').text("140");//after submition, set the counter back to maximum

        $.ajax({
          method: "POST",
          url: "/tweets/",
          data: textData,
          success: () => {
            loadTweets();// show new tweet immidiately
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }

  });

  //if the expending icon on nav bar is clicked, slide new tweet box up or down 
  $("#navAngleIcon").click(function() {

    $("#new-tweet").slideToggle("slow");
    $("#tweet-text").focus();//set the cursor immidiately
    
  });

  //scroll up button
  $(window).scroll(function() {

    //if current position hight higher than 300px, display the button
    if ($(document).scrollTop() > 300) {
      $("#scrollUpButton").css("display", "block");
    } else {

      //otherwise hide
      $("#scrollUpButton").css("display", "none");
    }

  });

  //if the scrollup button is clicked, scroll to the top
  $("#scrollUpButton").on("click", function() {
    $(document).scrollTop(0);
  });

});