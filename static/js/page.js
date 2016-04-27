// var timePercent = 99;

function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {
    var configuration = ({
       afterClose: function(event){
       }
    });

    pauseMusic();

    $.featherlight($('<div class="video-lightbox-container ' + video + '"><video id="' + video + '"class="lightbox-video" width="700" height="400" autoplay><source src="http://s3.amazonaws.com/lola-videos/' + video + '" type="video/mp4"></video></div>'), configuration);

    document.getElementById(video).addEventListener('ended',myHandler,false);
    function myHandler(e) {
        closeVideo();
        playMusic();
    }
}

function closeSplash() {
    $('#splash').fadeOut(2000);
    pickupPhone();
    startMusic();
    $('#intro_video').get(0).play();
}

function closeIntro() {
    $('#intro').fadeOut(2000);
    chatbotSays("Lola. What are we going to do?");
    // progressJs().start();
    // progressJs().set(timePercent);
}

function closeVideo() {
    var current = $.featherlight.current();
    current.close();

    if ($shouldEnd) {
        endExperience();
    }
}

function endExperience() {
    setTimeout(function(){
        pauseMusic();
        var html = '<section id="end"><div class="container"><div style="margin-bottom: -20px;"><h2><strong><i>Time is up. Did you solve the puzzle?</i></strong></h2><a href="https://itunes.apple.com/US/movie/id995070180"><h3 style="font-weight: 300;">Watch the feature film</h3></a></div><video id="intro_video" width="700" height="500" preload muted><source src="http://s3.amazonaws.com/lola-videos/Intro.mov" type="video/mp4"></video></div></section>';

        $(html).hide().appendTo('#endContainer').fadeIn(1000);
    }, 4000);
}
