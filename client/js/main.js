//var url = "http://212.194.144.183:8081/";
var version="DEV"; // "PROD" is the one for the server
if (version == "PROD"){
	var url = "http://localhost:8080/";
}else{
	var url = "http://concept-search.org:8080/"
}

var completeText;

Vue.component('extract', {
	props: ['list','text', 'index', 'idWri', 'author', 'title'],
	template: '<li><a v-bind:href="\'#\'+index" >{{ text }}</a></li>'
})

Vue.component('writing', {
	props: ['list', 'title', 'idWri', 'author'],
	template: '<li><div><a class="writingTitle" href="#writingHead" v-on:click="searchRes.changeWriting(idWri, list, author, title)" >{{ title }}</a> <br/><ul v-show="title == searchRes.writingName"><extract v-for="extr in list" v-bind:list="list" v-bind:text="extr[0]" v-bind:index="extr[2]" v-bind:idWri="idWri" v-bind:author="author" v-bind:title="title"></extract></ul></div></li>'
})


Vue.component('book', {
	props: ['metadata'],
	template: '<div><a class="author" v-on:click="searchRes.changeAuthor(metadata[0])">{{ metadata[0] }}</a><ul v-show="metadata[0] == searchRes.author"><writing v-for="writ in metadata[1]" v-bind:list="writ[3]"  v-bind:title="writ[0]" v-bind:idWri="writ[2]" v-bind:author="metadata[0]"></writing></ul></div>'
})


function search_results(param) {
	data = JSON.parse(param);
	searchRes.books = data;
	if (data == "") {
		searchRes.books = [];
		alert(0);
	}else{
		searchRes.dataReceived = true;
		searchRes.changeAuthor(searchRes.books[0][0]);
		searchRes.writingName = searchRes.books[0][1][0][0];
		searchRes.idWri = searchRes.books[0][1][0][2];
	}
}
// TODO : use pattern and index
function getwriting(idWri, list, author, title){
	httpAsync(url+"read?idWri="+idWri+"&list="+JSON.stringify(list) +"&author="+author +"&title="+title, "", link, "GET");
}

function link(writ){
	writing=JSON.parse(writ);
	completeText.initialText = writing[0];
	completeText.text = writing[0].replace(/(\r\n|\n|\r)/g,"<br />");
	completeText.author = writing[1];
	completeText.title = writing[2];
	completeText.idWri = writing[3];
	/*var extr = document.getElementById("extract");	
	extr.scrollIntoView();*/
}

var researchIn = new Vue({
    el: '#research_input',
    data: {
        research: "Courage",
		author_research: "",
		title_research: ""
    },
	methods: {
		search: function () {
			var data = {};
			if (researchIn.research[0] == "<" && researchIn.research[researchIn.research.length - 1] == ">"){
				data = splitResearch(researchIn.$data);
			}else{
				researchIn.author_research = "";
				researchIn.title_research = "";
				data = researchIn.$data;
			}
			httpAsync(url + "search?request="+JSON.stringify(data),"", search_results, "GET");
		}
  	}
});

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

var searchRes = new Vue({
    el: '#research_results',
    data: {
		books: [[[[]],[]]],
		dataReceived: false,
		author: "",
		writingName: "",
		idWri: 0
    },
	methods: {
		changeAuthor: function(name){
			searchRes.author = name;
			var b=0;
			for (b=0; b<searchRes.books.length; b++){
				var book = searchRes.books[b];
				if (book[0] == name) {
					searchRes.writingName = book[1][0][0];
					getwriting(book[1][0][2], book[1][0][3], book[0], book[1][0][0]);
				};
			}
		},
		changeWriting: function(idWri, list, author, title){
			searchRes.writingName = title;
			getwriting(idWri, list, author, title);
		}
	}
});

var completeText = new Vue({
    el: '#complete_text',
    data: {
		initialText: "",
		text: "",
		author: "",
		title: "",
		idWri: 0
    }
});

function concept_added(ans){
	alert(ans);
}

var addConcept = new Vue({
    el: '#add_concept',
    data: {
		concept: "",
		wordSelected: "",
		concept: "",
		extract: "",
		user: ""
    },
	methods: {
		show: function(){
			return  !searchRes.$data.dataReceived && completeText.$data.text != "";
		},
		addAConcept: function(){
			alert(addConcept.wordSelected);
			httpAsync(url+"concept?name="+addConcept.concept+"&idWri="+completeText.idWri+"&extract="+addConcept.wordSelected+"&userId="+addConcept.user+"&strength=1", "", concept_added, "POST");
		}
	}
});
