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

function parseInput(input) {
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

$( document ).ready(function() {
    var id = parseInput(GetURLParameter('v'));
    var link = '//www.youtube.com/embed/' + id + '?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1&loop=1&playlist=' + id;
    if(typeof id != 'undefined') {
        $('input[type=text]').attr('value', decodeURIComponent(GetURLParameter('v')));
        $('iframe').attr('src', link);
    } else {
        $('#videoWrapper').hide();
    }
});