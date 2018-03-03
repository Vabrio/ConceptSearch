/*
* Function to do a POST/GET request and get the response
* theUrl : page url
* params : params in format "?index=value&index2=value2"
* callback : function
* mode = "POST" or "GET"
*/
function httpAsync(theUrl, params, callback, mode) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open(mode, theUrl +"/" + params, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(null);
}