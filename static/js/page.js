function updateScroll(){
    var element = document.getElementById("chatlog");
    element.scrollTop = element.scrollHeight;
}

function showVideo(video) {


}

function closeSplash() {
    $('#splash').fadeOut(2000);
}

function closeIntro() {
    $('#intro').hide();
    chatbotSays("Hi, Lola. What are you going to do?");
    // replace with .fadeOut(2000);
}
