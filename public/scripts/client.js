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

  const renderTweets = function(tweetDataArr) {
    for (const tweetDataObj of tweetDataArr) {
      const $tweet = createTweetElement(tweetDataObj);
      $('#tweets-container').append($tweet);
    }
  };

  const loadTweets = function() {
    $('#submitTweet').submit(function() {
      $.ajax({
        url: "/tweets",
        success: (response) => {
          renderTweets(response);
        },
        error: (error) => {
          console.log(error);
        }
      });
    });
  };

  $('#submitTweet').submit(function(event) {

    event.preventDefault();
    const textData = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: textData,
      error: (error) => {
        console.log(error);
      }
    });
  });

  loadTweets();
});