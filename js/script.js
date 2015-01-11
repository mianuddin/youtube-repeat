function GetURLParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}

function parseId(input) {
    if(typeof input === 'undefined') {
        return undefined;
    } else {
        var decodedInput = decodeURIComponent(input);
        if(decodedInput.indexOf('?v=') != -1) {
            return decodedInput.slice(decodedInput.indexOf('?v=')+3);
        }
        return decodedInput;
    }
}

// YouTube iFrame API

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    var id = parseId(GetURLParameter('v'));
    player = new YT.Player('player', {
        videoId: id,
        playerVars: { 'autoplay': 1, 'controls': 0, 'showinfo': 0, 'loop': 1, 'playlist': id },
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
    if(typeof id != 'undefined') {
        $('input[type=text]').attr('value', decodeURIComponent(GetURLParameter('v')));
        $('input[type=text]').attr('size', decodeURIComponent(GetURLParameter('v')).length);
    } else {
        $('#videoWrapper').hide();
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerError(event) {
    $('#videoWrapper').hide();
    if(typeof parseId(GetURLParameter('v')) != 'undefined' && !$('#error').length) {
        $('<div id=\'error\'>Player Error: <a href="https://developers.google.com/youtube/iframe_api_reference#onError">' + event.data + '</a></div>').prependTo('footer');
    }
}

// END

function togglePlay() {
    console.log('faggot');
    if(player.getPlayerState() === 1) {
        $('#floatingAction img').attr('src', 'img/play.png');
        player.pauseVideo();
    } else if(player.getPlayerState() === 2) {
        $('#floatingAction img').attr('src', 'img/pause.png');
        player.playVideo();
    }
}

$( document ).ready(function() {
    $("input[type='text']").on("click", function () {
       $(this).select();
    });
});