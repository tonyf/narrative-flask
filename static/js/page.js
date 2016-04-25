var $videoResponses = {video1 : "Okay, okay, okay"};

function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {
    var configuration = ({
       afterClose: function(event){
           console.log($videoResponses['video1']);
           console.log(video);
           console.log($videoResponses['' + video]);
           chatbotSays($videoResponses['' + video]);
       }
    });
    $.featherlight($('<div class="video-lightbox-container ' + video + '"><video id="' + video + '"class="lightbox-video" width="700" height="400" autoplay><source src="http://s3.amazonaws.com/lola-videos/intro.mov" type="video/mp4"></video></div>'), configuration);
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
