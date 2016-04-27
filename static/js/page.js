var $videoResponses = {video1 : "Okay, okay, okay"};

function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {
    var configuration = ({
       afterClose: function(event){
       }
    });

    $.featherlight($('<div class="video-lightbox-container ' + video + '"><video id="' + video + '"class="lightbox-video" width="700" height="400" autoplay><source src="http://s3.amazonaws.com/lola-videos/' + video + '" type="video/mp4"></video></div>'), configuration);

    document.getElementById(video).addEventListener('ended',myHandler,false);
    function myHandler(e) {
        closeVideo();
    }
}

function closeSplash() {
    $('#splash').fadeOut(2000);
    $('#intro_video').get(0).play();
}

function closeIntro() {
    $('#intro').fadeOut(2000);
    chatbotSays("Lola. What are we going to do?");
}

function closeVideo() {
    var current = $.featherlight.current();
    current.close();
}
