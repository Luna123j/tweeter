//count composed text char
//max char is 140
$(document).ready(function() {

  $('#tweet-text').on("input", () => {

    //get input char
    const len = $('#tweet-text').val().length;
    
    //reduce counter while user typing
    $('#char-counter').text(140 - len);

    //change counter color when exceed maximum
    if (len > 140) {
      $('#char-counter').addClass("counter-red");
    } else {
      if ($('#char-counter').hasClass("counter-red")) {
        $('#char-counter').removeClass("counter-red");
      }
    }

  });

});


