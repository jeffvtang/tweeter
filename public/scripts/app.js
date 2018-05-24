/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  function escape(str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  function elapsedTime(epochDate) {
    let timeSeconds = Math.floor((Date.now() - epochDate) / 1000); // returns seconds passed since post
    const hour = (60 * 60);
    const day = (hour * 24);
    const week = (day * 7);
    let time = 0;
    if (timeSeconds < 60) {
      return ('Just now');
    } else if (timeSeconds < hour) {
      let time = (Math.floor(timeSeconds / 60));
      if (time > 1) {
        return (time + ' minutes ago');
      } else {
        return (time + ' minute ago');
      }
    } else if (timeSeconds < day) {
      let time = (Math.floor(timeSeconds / hour));
      if (time > 1) {
        return (time + ' hours ago');
      } else {
        return (time + ' hour ago');
      }
    } else if (timeSeconds < week) {
      let time = (Math.floor(timeSeconds / day));
      if (time > 1) {
        return (time + ' days ago');
      } else {
        return (time + ' day ago');
      }
    } else if (timeSeconds > (52 * week)) {
      let time = (Math.floor(timeSeconds / (52 * week)));
      if (time > 1) {
        return (time + ' years ago');
      } else {
        return (time + ' year ago');
      }
    } else {
      let time = (Math.floor(timeSeconds / week));
      if (time > 1) {
        return (time + ' weeks ago');
      } else {
        return (time + ' week ago');
      }
    }
  }

  function createTweetElement(tweetInput) {
    const $tweet = (`
    <article class='tweet'>
      <header>
        <span class='avatar'>
          <img src='${tweetInput.user.avatars.small}' class='avatar'>
        </span>
        <span class='name'>${(escape(tweetInput.user.name))}</span>
        <span class='handle'>${(escape(tweetInput.user.handle))}</span>
      </header>
      <section class='tweet'>${(escape(tweetInput.content.text))}</section>
      <footer>
        <span class='date'>${(elapsedTime(tweetInput.created_at))}</span>
        <span class='icons'>
          <i class='fas fa-flag'></i>
          <i class='fas fa-retweet'></i>
          <i class='fas fa-heart'></i>
        </span>
      </footer>
    </article>
    `);
    return $tweet;
  }

  function renderTweets(tweets) {
    $('#tweets-container').empty();
    tweets.forEach(function (tweetData) {
      const $eachtweet = createTweetElement(tweetData);
      $('#tweets-container').prepend($eachtweet); // switch to append if newest last
    });
  }

  function loadTweets() {
    $.get('/tweets', function (tweetDB) {
      renderTweets(tweetDB);
    });
  }

  $('#compose').click(function () {
    $('.new-tweet').slideToggle(function () {
      $('textarea').focus();
    });
  });

  $('form').submit(function (event) {
    event.preventDefault();
    const tweetLen = $(this).children('textarea').val().length;
    if (tweetLen === 0) {
      alert("Tweets can't be empty");
    } else if (tweetLen > 140) {
      alert("Tweets can't be greater than 140 characters");
    } else {
      $.post('/tweets', ($(this).serialize()))
        .then(loadTweets);
      $(this).trigger('reset');
      $(this).children('.counter').text(140);
    }
  });

  loadTweets();
});
