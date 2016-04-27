
var $lastPlayed = 0;

var $chatlog;
var $inputTemplate;
var $outputTemplate;

var $responsesSinceLastVideo = 0;

var $phone;
var $music;

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
    console.log("HEREE");

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
    console.log($tagTable);
    var word = inputWords[Math.floor(Math.random() * inputWords.length)];
    console.log(word);
    var possibleVideos = $tagTable[word];
    console.log(possibleVideos);
    return possibleVideos[Math.floor(Math.random() * possibleVideos.length)];
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
    console.log("!!!!" + playVideo);
    var inputData = {
      'text': inputText,
      'videoPlayed': false,
      'isLost': false
    };
    if (playVideo != null) {
        inputData['videoPlayed'] = true;
    }
    if ($responsesSinceLastVideo > 4) {
        inputData['isLost'] = true;
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
        console.log("Here" + text);

        if (playVideo != null) {
            $responsesSinceLastVideo = 0;
            showVideo(playVideo);
        }

        $row.text(text);
        $chatlog.append($row);
        updateScroll();
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
