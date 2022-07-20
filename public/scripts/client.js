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
    $("#alertMessage").text(message);
  };

  const renderTweets = function(tweetDataArr) {
    $('#tweets-container').empty();
    for (const tweetDataObj of tweetDataArr) {
      const $tweet = createTweetElement(tweetDataObj);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = function() {
    $('#submitTweet').submit(function() {
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
    });
  };

  loadTweets();
  $('#tweet-text').click(() => {
    $("#alertMessage").empty();
  });

  $('#submitTweet').submit(function(event) {

    event.preventDefault();
    const textData = $(this).serialize();

    if (textData.length === 5) {
      creatAlertMessage("Tweet contents should not be empty");
    } else {
      if (textData.length > 145) {
        creatAlertMessage("Tweet contents should not exceed 140 letters");
      } else {
        $('#tweet-text').val("");
        $.ajax({
          method: "POST",
          url: "/tweets/",
          data: textData,
          error: (error) => {
            console.log(error);
          }
        });
      }
    }

  });


});