var Videos = {
  FIRST: '#myLightbox',
  SECOND: 2,
  THIRD: 3,
};

var $dict = {};
$dict["hi"] = Videos.FIRST;
$dict["hello"] = Videos.SECOND;
$dict["okay"] = Videos.FIRST;
$dict["test"] = Videos.FIRST;

var $videosWatched = [];
var $triggerWords = ["hi"];
var $lastPlayed = 0;

function chatBotTriggered(inputText) {
    inputText = inputText.toLowerCase();
    var words = inputText.split(" ");
    var foundWords = [];

    words.forEach(function(word){
        if ($triggerWords.indexOf(word) >= 0) {
            foundWords.push(word);
        }
    });

    if (foundWords.length > 0) {
        return selectVideo(foundWords);
    }
    return null;
}

function selectVideo(inputWords) {
    // If we want to do anything sophisiticated as in have implied sequence
    console.log($dict[inputWords[0]]);
    return $dict[inputWords[0]];
}

function showVideo(video) {


}


function submitInput(input, rowTemplate, chatlog) {
    var inputText = input.val();
    var inputData = {
      'text': inputText
    };

    var $submit = $.ajax({
        type: "POST",
        url: '/api/chatbot/',
        data: inputData,
    });

    var playVideo = chatBotTriggered(inputText);

    $submit.done(function(statement) {
        var $row = rowTemplate.clone();
        var text = statement;

        if (playVideo == null) {
            $row.text(text);
            chatlog.append($row);
        } else {
            text = "Try to think back..."
            $row.text(text);
            chatlog.append($row);
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
