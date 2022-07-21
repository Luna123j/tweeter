/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const createTweetElement = function(tweetDataObj) {
    const markup = `<article class="show-tweet">
    <h5>
      <div> <img class="smallIcon" src="${tweetDataObj.user.avatars}"> <p class="username">${tweetDataObj.user.name}</p> </div>
      <div id="login-name">${tweetDataObj.user.handle}</div>
    </h5>
    <p class="tweet-content">
      ${tweetDataObj.content.text}
    </p>
    <footer>
      <p>${timeago.format(tweetDataObj.created_at)}</p>
      <p> <i class="fa-solid fa-flag"></i> <i class='fas fa-retweet'></i> <i class="fa-solid fa-heart"></i> </p>
    </footer>
  </article>`;
    return markup;
  };

  const creatAlertMessage = function(message) {
    $("#alertMessage").empty();
    if (message === "emptyAlert") {
      const alert = `<i class="fa-solid fa-triangle-exclamation"></i>
      Tweet contents should not be empty.
        <i class="fa-solid fa-triangle-exclamation"></i>`;
      $("#alertMessage").append(alert);
    }

    if (message === "lengthAlert") {
      const alert = `<i class="fa-solid fa-triangle-exclamation"></i>
      Too long. Tweet contents should not exceed 140 letters.
        <i class="fa-solid fa-triangle-exclamation"></i>`;
      $("#alertMessage").append(alert);
    }


  };

  const renderTweets = function(tweetDataArr) {
    $('#tweets-container').empty();
    for (const tweetDataObj of tweetDataArr) {
      const $tweet = createTweetElement(tweetDataObj);
      $('#tweets-container').append($tweet);
    }
  };

  //get response when submit
  const loadTweets = function() {
    console.log("success call loadtweets");
    $("#new-tweet").slideUp("fast");

    $.ajax({
      method: "GET",
      url: "/tweets/",
      success: (response) => {
        console.log(response);
        renderTweets(response.reverse());
      },
      error: (error) => {
        console.log(error);
      }
    });

  };

  loadTweets();

  // for hide alert box
  $('#tweet-text').click(() => {
    $("#alertMessage").empty();
    $("#alertMessage").slideUp("fast");
  });

  //post when submit
  $('#submitTweet').submit(function(event) {

    event.preventDefault();

    const textData = $(this).serialize();
    const tweetLength = $('#tweet-text').val().length;

    if (tweetLength === 0) {
      $("#alertMessage").slideDown("slow", creatAlertMessage("emptyAlert"));
    } else {
      if (tweetLength > 140) {
        $("#alertMessage").slideDown("slow", creatAlertMessage("lengthAlert"));
      } else {


        //empty text area
        $('#tweet-text').val("");

        //post
        $.ajax({
          method: "POST",
          url: "/tweets/",
          data: textData,
          success: () => {
            loadTweets();
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }

  });

  //arrow effect 
  $("#navAngleIcon").click(function() {
    $("#new-tweet").slideToggle("slow");
    $("#tweet-text").focus();
  });

  //scroll up button
  $(window).scroll(function() {
    console.log($(document).scrollTop())
    if ($(document).scrollTop() > 500) {
      $("#scrollUpButton").css("display", "block");
    } else {
      $("#scrollUpButton").css("display", "none");
    }
  });

  $("#scrollUpButton").on("click", function() {
    $(document).scrollTop(0);
  });

});