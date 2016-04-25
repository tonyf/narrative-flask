
var $lastPlayed = 0;

var $chatlog;
var $inputTemplate;
var $outputTemplate;

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
    var word = inputWords[Math.floor(Math.random() * inputWords.length)];
    var possibleVideos = $tagTable[word];
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
    var inputData = {
      'text': inputText
    };

    var inputRow = $inputTemplate.clone();
    inputRow.text(inputText);
    $chatlog.append(inputRow);
    updateScroll()

    var $submit = $.ajax({
        type: "POST",
        url: '/api/chatbot/',
        data: inputData,
    });

    var playVideo = chatBotTriggered(inputText);

    $submit.done(function(statement) {
        var $row = $outputTemplate.clone();
        var text = statement;

        if (playVideo == null) {
            $row.text(text);
            $chatlog.append($row);
            updateScroll();
        } else {
            text = "Try to think back..."
            $row.text(text);
            $chatlog.append($row);
            // Add delay
            $videosWatched.push(playVideo);
            showVideo(playVideo)
        }

        input.val('');
    });


    $submit.fail(function() {
        // TODO: Handle errors
    });
}
