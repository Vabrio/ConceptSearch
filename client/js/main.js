//var url = "http://212.194.144.183:8081/";
if (version == "DEV"){
	var url = "http://localhost:8080/";
}else{
	var url = "http://concept-search.org:8080/"
}


var searchRes = new Vue({
    el: '#research_results',
    data: {
		books: [{}],
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
				if (book.author == name) {
					searchRes.writingName = book.books[0].name;
					getwriting(book.books[0].id, book.books[0].extracts, book.author, book.books[0].name);
				};
			}
		},
		changeWriting: function(idWri, list, author, title){
			searchRes.writingName = title;
			getwriting(idWri, list, author, title);
		}
	}
});

var completeText;

Vue.component('extract', {
	props: ['list','text', 'index', 'idWri', 'author', 'title'],
	template: '<li><a v-bind:href="\'#\'+index" >{{ text }}</a></li>'
})

Vue.component('writing', {
	props: ['list', 'title', 'idWri', 'author'],
	template: '<li><div><a class="writingTitle" href="#writingHead" v-on:click="searchRes.changeWriting(idWri, list, author, title)" >{{ title }}</a> <br/><ul v-show="title == searchRes.writingName"><extract v-for="extr in list" v-bind:list="list" v-bind:text="extr.extract" v-bind:index="extr.index" v-bind:idWri="idWri" v-bind:author="author" v-bind:title="title"></extract></ul></div></li>'
})

Vue.component('book', {
	props: ['metadata'],
	template: '<div><a class="author" v-on:click="searchRes.changeAuthor(metadata.author)">{{ metadata.author }}</a><ul v-show="metadata.author == searchRes.author"><writing v-for="writ in metadata.books" v-bind:list="writ.extracts"  v-bind:title="writ.name" v-bind:idWri="writ.id" v-bind:author="metadata.author"></writing></ul></div>'
})

Vue.component('concept', {
	props: ['c'],
	template: '<li>Name : {{ c.name }}, writing id : {{ c.writingid }}, extract : {{ c.extract }}</li>'
})

Vue.component('user', {
	props: ['metadata'],
	template: '<div><ul><li>Name : {{ metadata.name }}</li><li>Firstname : {{ metadata.firstname }}</li><li>lastname : {{ metadata.lastname }}</li><li>Creation date : {{ metadata.created_at }}</li><li>Email : {{ metadata.email }}</li></ul></div>'
})


function search_results(param) {
	data = JSON.parse(param);
	searchRes.books = data;
	if (data == "") {
		searchRes.books = [];
	}else{
		searchRes.dataReceived = true;
		searchRes.changeAuthor(searchRes.books[0].author);
		searchRes.writingName = searchRes.books[0].books[0].name;
		searchRes.idWri = searchRes.books[0].books[0].id;
	}
}
// TODO : use pattern and index
function getwriting(idWri, list, author, title){
	httpAsync(url+"writings/read?idWri="+idWri+"&list="+JSON.stringify(list) +"&token="+auth.token+"&author="+author +"&title="+title, "", link, "GET");
}

function link(writ){
	writing=JSON.parse(writ);
	completeText.initialText = writing.text;
	completeText.text = writing.text.replace(/(\r\n|\n|\r)/g,"<br />");
	completeText.author = writing.author;
	completeText.title = writing.title;
	completeText.idWri = writing.id;
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
			httpAsync(url + "writings/search?request="+JSON.stringify(data),"", search_results, "GET");
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
	console.log(ans);
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
			httpAsync(url+"concepts/add?name="+addConcept.concept+"&idWri="+completeText.idWri+"&begin=-1&end=-1"+"&extract="+JSON.stringify(addConcept.wordSelected)+"&strength=1", "", concept_added, "POST");
		}
	}
});







var usercontent = new Vue({
    el: '#usercontent',
	data: {
		userData: {
			name: "",
			firstname: "",
			lastname: "",
			email: "",
			birth_date: "",
			created_at: ""
		},
		concepts: []
	}
});


var auth = new Vue({
    el: '#auth',
	data: {
		token: "",
		logged: false
	}
});
var main_part = new Vue({
    el: '#main_part',
	data: {
		
	},
	methods: {
		
	}
});


// Function to call when login
function logged(ans){
	var ansJson = JSON.parse(ans);
	if (!ansJson.success){
		console.log( ansJson.message);
		if (ansJson.type == 0){
			login_form.state_login = "has-error";
		}else{
			login_form.state_login = "";
			login_form.state_pwd = "has-error";
		}
	} else{
		console.log( ansJson.message + ansJson.token );
		auth.token=ansJson.token;
		auth.logged=true;
		usercontent.concepts=ansJson.concepts;
		usercontent.userData=ansJson.user;
		$("#loginModal").modal("toggle");
	}
}
var login_form = new Vue({
    el: '#login_form',
	data: {
		log_login: "Alice",
		log_pwd: "1234",
		state_login: "",
		state_pwd: ""
	},
	methods: {
		submit: function(){
			httpAsync(url+"users/authenticate?name="+this.log_login+"&password="+this.log_pwd, "", logged, "POST");
		}
	}
});

function subscribed(ans){
	var ansJson = JSON.parse(ans);
	if (!ansJson.success) {
		console.log(ansJson.message);
		if (ansJson.type) {
			subscribe_form.state = "has-error";
		}
	}else {
		console.log("created ! " + ans);
		$("#loginModal").modal("toggle");
	}
}
var subscribe_form = new Vue({
    el: '#subscribe_form',
	data: {
		sub_login: "Alice",
		sub_pwd: "1234",
		sub_pwd_check: "1234",
		state: ""
	},
	methods: {
		submit: function(){
			httpAsync(url+"users/subscribe?name="+this.sub_login+"&password="+this.sub_pwd, "", subscribed, "POST");
		}
	}
});

