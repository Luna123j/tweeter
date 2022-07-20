// const { render } = require("express/lib/response");

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
      <p>${timeago.format(tweetDataObj.created_at) }</p>
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
      $.get("/tweets", function(data, status) {
        console.log("Data: " + data.user + "\nStatus: " + status);
      });

    });
  }

  $('#submitTweet').submit(function(event) {

    event.preventDefault();
    console.log($(this).serialize());
    const textData = $(this).serialize();
    $.post("/tweets", textData);
  });

  loadTweets();



  // Test / driver code (temporary). Eventually will get this from the server.
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  renderTweets(data);

  // // Test / driver code (temporary). Eventually will get this from the server.
  // const tweetData = {
  //   "user": {
  //     "name": "Newton",
  //     "avatars": "https://i.imgur.com/73hZDYK.png",
  //     "handle": "@SirIsaac"
  //   },
  //   "content": {
  //     "text": "If I have seen further it is by standing on the shoulders of giants"
  //   },
  //   "created_at": 1461116232227
  // }

  // const $tweet = createTweetElement(tweetData);

  // // Test / driver code (temporary)
  // console.log($tweet); // to see what it looks like
  // $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.

});