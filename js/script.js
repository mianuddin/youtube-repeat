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

$( document ).ready(function() {
    var id = GetURLParameter('v');
    var link = '//www.youtube.com/embed/' + id + '?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1&loop=1&playlist=' + id;
    if(typeof id != 'undefined') {
        $('input[type=text]').attr('value', id);
        $('iframe').attr('src', link);
    } else {
        $('iframe').hide();
    }
});