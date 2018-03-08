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