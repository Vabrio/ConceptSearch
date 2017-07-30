
var url = "http://localhost:8081/";
function callback(param) {
	data = JSON.parse(param);
    show.message = data[0][0][0][0];
}


function httpPostAsync(theUrl, params, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("POST", theUrl + params, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(null);
}
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("GET", theUrl, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(null);
}


var app = new Vue({
    el: '#app',
    data: {
        research: "Justice"
    },
	methods: {
		search: function () {
			httpGetAsync(url + "search?request="+app.research, callback);
		}
  	}
});
var show = new Vue({
    el: '#showON',
    data: {
        message: ""
    }
});