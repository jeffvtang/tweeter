$(document).ready(function () {
  const maxChar = 140;
  $('.new-tweet').find('textarea').keyup(function () {
    ($(this).siblings('.counter')).text(maxChar - $(this).val().length);
    if (($(this).val().length) > maxChar) {
      $(this).addClass('invalid');
    } else {
      $(this).removeClass();
    }
  });
});
