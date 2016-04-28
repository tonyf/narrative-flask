
var $lastPlayed = 0;

var $chatlog;
var $inputTemplate;
var $outputTemplate;

var $responsesSinceLastVideo = 0;

var $phone;
var $music;

var $videosWatched = 0;
var $shouldEnd = false;
var $playedVideos = [];

function setupApp(chatlog, inputTemplate, outputTemplate, phone, music) {
    $chatlog = chatlog;
    $inputTemplate = inputTemplate;
    $outputTemplate = outputTemplate;
    $phone = phone;
    $music = music;
}

function chatBotTriggered(inputText) {
    inputText = inputText.toLowerCase();
    var words = inputText.split(" ");
    var foundWords = [];

    words.forEach(function(word){
        if (word in $tagTable) {
          foundWords.push(word);
        }
    });

    if (foundWords.length > 0) {
        return selectVideo(foundWords);
    }
    return null;
}

function selectVideo(inputWords) {
    var word = inputWords[Math.floor(Math.random() * inputWords.length)];
    var possibleVideos = $tagTable[word];
    if (possibleVideos.length === 0) {
        return null;
    }

    // Select video and remove it from dictionary
    var selectedVideo = possibleVideos[Math.floor(Math.random() * possibleVideos.length)];
    var selectedIndex = $tagTable[word].indexOf(selectedVideo);
    if (selectedIndex > -1) {
        $tagTable[word].splice(selectedIndex, 1);
    }

    var playedIndex = $playedVideos.indexOf(selectedVideo);
    if (playedIndex > -1) {
        // if the video was already playedIndex
        return selectedVideo(inputWords);
    }
    $playedVideos.push(selectedVideo)
    return selectedVideo
}

function chatbotSays(text) {
    var $row = $outputTemplate.clone();
    $row.text(text);
    $chatlog.append($row);
    updateScroll();
}

function submitInput(input) {
    var inputText = input.val();
    var playVideo = chatBotTriggered(inputText);
    var inputData = {
      'text': inputText,
      'videoPlayed': false,
      'isLost': false,
      'last': false
    };
    if (playVideo != null) {
        inputData['videoPlayed'] = true;
    }
    if ($responsesSinceLastVideo > 4) {
        inputData['isLost'] = true;
    }

    if ($videosWatched + 1 === 5 && playVideo != null) {
        inputData['last'] = true;
        $shouldEnd = true;
    }


    var inputRow = $inputTemplate.clone();
    inputRow.text(inputText);
    $chatlog.append(inputRow);
    updateScroll();
    input.val('');

    var $submit = $.ajax({
        type: "POST",
        url: '/api/chatbot/',
        data: inputData,
    });

    $submit.done(function(statement) {
        var $row = $outputTemplate.clone();
        var text = statement['text'];
        $responsesSinceLastVideo++;

        if (playVideo != null) {
            $responsesSinceLastVideo = 0;
            $videosWatched++;
            showVideo(playVideo);
        }

        $row.text(text);
        setTimeout(function(){
            $chatlog.append($row);
            updateScroll();
            if ($shouldEnd) {
                endExperience();
            }
        }, 2000);
    });


    $submit.fail(function() {
        // TODO: Handle errors
    });
}

function pickupPhone() {
    $phone.get(0).pause();
}

function pauseMusic() {
    $music.animate({volume: 0}, 1000, function () {
    });
}

function playMusic() {
    $music.animate({volume: 1}, 1000, function () {
    });
}

function startMusic() {
    $music.get(0).play();
}
