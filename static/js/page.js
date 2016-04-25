function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {
    $('body').append('<div style="visibility:hidden"><div class="video-lightbox-container ' + video + '"><video id="' + video + '"class="lightbox-video" width="700" height="400" autoplay><source src="http://s3.amazonaws.com/lola-videos/intro.mov" type="video/mp4"></video></div></div>');
    $.featherlight($("." + video));

    document.getElementById(video).addEventListener('ended',myHandler,false);
    function myHandler(e) {
        closeVideo();
    }
}

function closeSplash() {
    $('#splash').fadeOut(2000);
}

function closeIntro() {
    $('#intro').fadeOut(2000);
    chatbotSays("Hi, Lola. What are you going to do?");
}

function closeVideo() {
    var current = $.featherlight.current();
    current.close();
}
