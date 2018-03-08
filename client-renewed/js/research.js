var homePage = new Vue({
	el: "#homePage",
	data: {
		homePage: true,
		searchbar: "",
	},
	methods: {
		search: function(){
			researchPage.request.research = this.searchbar;
			researchPage.search();
		}
	}
})

function link(writ){
	writing=JSON.parse(writ.bodyText);
	researchPage.completetext.initialText = writing.text;
	researchPage.completetext.text = writing.text.replace(/(\r\n|\n|\r)/g,"<br />");
	researchPage.completetext.author = writing.author;
	researchPage.completetext.title = writing.title;
	researchPage.completetext.idWri = writing.id;
	/*var extr = document.getElementById("extract");	
	extr.scrollIntoView();*/
}
function getwriting(idWri, list, author, title){
	Vue.http.get(url+"writings/read", {params: {
		idWri:idWri,
		list: JSON.stringify(list),
		token: login.auth.token,
		author: author, 
		title: title}}).then(link);
}



function searchResults(ans){
	homePage.homePage= false;
	data = JSON.parse(ans.bodyText);
	researchPage.result.books = data;
	if (data == "") {
		researchPage.result.books = [];
	}else{
		researchPage.result.dataReceived = true;
		researchPage.changeAuthor(searchRes.books[0].author);
		researchPage.result.writingName = searchRes.books[0].books[0].name;
		researchPage.result.idWri = searchRes.books[0].books[0].id;
	}
}
var searchReq = {
	research: "",
	author_research: "",
	title_research: ""
}
var searchRes = {
	books: [{}],
	dataReceived: false,
	author: "",
	writingName: "",
	idWri: 0
}
var textinfo = {
	initialText: "",
	text: "",
	author: "",
	title: "",
	idWri: 0
}
var researchPage = new Vue({
	el: "#researchPage",
	data: {
		request: searchReq,
		result: searchRes,
		completetext: textinfo
	},
	computed: {
		researchPage: function(){
			return !homePage.homePage;	
		},
		searchbar: {
			// getter
			get: function () {
			  	return homePage.searchbar;
			},
			// setter
			set: function (newValue) {
			  	homePage.searchbar = newValue;
				this.request.research = newValue;
			}
		}
	},
	methods:{
		toggleHomePage: function(){
			homePage.homePage= true;
		},
		search: function(){
			var req = {};
			if (this.request.research[0] == "<" && this.request.research[this.request.research.length - 1] == ">"){
				req = splitResearch(this.request);
			}else{
				this.request.author_research = "";
				this.request.title_research = "";
				req = this.request;
			}
			this.$http.get(url+"writings/search", {params: {request: JSON.stringify(req)}}).then(searchResults)
		},
		changeAuthor: function(name){
			this.result.author = name;
			var b=0;
			for (b=0; b<this.result.books.length; b++){
				var book = this.result.books[b];
				if (book.author == name) {
					this.result.writingName = book.books[0].name;
					getwriting(book.books[0].id, book.books[0].extracts, book.author, book.books[0].name);
				};
			}
		},
		changeWriting: function(idWri, list, author, title){
			this.result.writingName = title;
			getwriting(idWri, list, author, title);
		}
	}
})
/*** If everything was in the request field for a simple search
* From the data extract it in the three fields <Author;Writing name;Research string>
*/
function splitResearch(dataGiven){
	var text = dataGiven['research'];
	var n = text.length;
	informations = text.substring(1, n-1).split(';');
	//alert(informations);
	dataGiven['author_research'] = informations[0];
	dataGiven['title_research'] = informations[1];
	dataGiven['research'] = informations[2];
	return dataGiven;
}


function httpAsync(theUrl, params, callback, mode) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open(mode, theUrl + params, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(null);
}