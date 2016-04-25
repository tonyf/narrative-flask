function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {
    $('body').append('<div style="visibility:hidden"><div class="video-lightbox-container ' + video + '"><video class="lightbox-video" width="500" height="500" autoplay><source src="http://s3.amazonaws.com/lola-videos/intro.mov" type="video/mp4"></video></div></div>');
    $.featherlight($(video));
}

function closeSplash() {
    $('#splash').fadeOut(2000);
}

function closeIntro() {
    $('#intro').fadeOut(2000);
    chatbotSays("Hi, Lola. What are you going to do?");
}
