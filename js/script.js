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
        console.log(decodedInput);
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
    player = new YT.Player('player', {
        videoId: parseId(GetURLParameter('v')),
        events: {
            'onReady': onPlayerReady,
            'onError': onPlayerError
        }
    });
    var id = parseId(GetURLParameter('v'));
    var link = '//www.youtube.com/embed/' + id + '?enablejsapi=1&modestbranding=1&fs=0&controls=0&showinfo=0&autoplay=1&loop=1&playlist=' + id;
    if(typeof id != 'undefined') {
        $('input[type=text]').attr('value', decodeURIComponent(GetURLParameter('v')));
        $('input[type=text]').attr('size', decodeURIComponent(GetURLParameter('v')).length);
        $('iframe').attr('src', link);
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
    if(player.getPlayerState() === 1 || player.getPlayerState() === 0) {
        $('#floatingAction img').attr('src', 'img/play.png');
        player.pauseVideo();
    } else if(player.getPlayerState() === 2 || player.getPlayerState() === 0) {
        $('#floatingAction img').attr('src', 'img/pause.png');
        player.playVideo();
    }
}

$( document ).ready(function() {
    $("input[type='text']").on("click", function () {
       $(this).select();
    });
});