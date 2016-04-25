function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {
    $('body').append('<div style="position: absolute; visibility:hidden"><div style="position: relative;" class="video-lightbox-container ' + video + '"><video id="' + video + '"class="lightbox-video" width="700" height="400" autoplay><source src="http://s3.amazonaws.com/lola-videos/intro.mov" type="video/mp4"></video></div></div>');
    $('#' + video).addEventListener('ended',handler,false);
    function handler(e) {
        closeVideo();
    }
    $.featherlight($("." + video));
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
