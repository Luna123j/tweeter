$(document).ready(function() {
  $('#tweet-text').on("input", () => {
    console.log("skjsaslkjbs");
    const len = $('#tweet-text').val().length;
    $('#char-counter').text(140 - len);
    if (len > 140) {
      $('#char-counter').addClass("counter-red");
    } else {
      if ($('#char-counter').hasClass("counter-red")) {
        $('#char-counter').removeClass("counter-red");
      }
    }
  });
});


