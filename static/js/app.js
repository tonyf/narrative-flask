
var $lastPlayed = 0;

var $chatlog;
var $inputTemplate;
var $outputTemplate;

var $responsesSinceLastVideo = 0;

function setupApp(chatlog, inputTemplate, outputTemplate) {
    $chatlog = chatlog;
    $inputTemplate = inputTemplate;
    $outputTemplate = outputTemplate;
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
    var playVideo = chatBotTriggered(inputText);
    var inputText = input.val();
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
        var text = statement;

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
