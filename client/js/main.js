//var url = "http://localhost:8081/"
var url = "http://212.194.144.183:8081/";

Vue.component('extract', {
	props: ['text', 'pattern', 'index', 'address', 'author', 'title'],
	template: '<li><a v-on:click="getwriting(address, pattern, index, author, title)">{{ text }}</a></li>'
})

Vue.component('writing', {
	props: ['list', 'title', 'address', 'author'],
	template: '<div><h2>{{ title }}</h2> <br/><ul><extract v-for="extr in list" v-bind:text="extr[0]"  v-bind:pattern="extr[1]" v-bind:index="extr[2]" v-bind:address="address" v-bind:author="author" v-bind:title="title"></extract></ul></div>'
})


/*Vue.component('book', {
  props: ['metadata'],
  template: '<div><h1>{{ metadata[0] }}</h1><h2>{{ metadata[1][0][0] }}</h2> <br/><ul><extract v-for="extr in metadata[0]" v-bind:text="extr[0]" v-bind:id="metadata[0].indexOf(extr)" v-bind:address="metadata[1][3]"></extract></div></ul>'
})*/

Vue.component('book', {
  props: ['metadata'],
  template: '<div><h1>{{ metadata[0] }}</h1> <writing v-for="writ in metadata[1]" v-bind:list="writ[3]"  v-bind:title="writ[0]" v-bind:address="writ[1]" v-bind:author="metadata[0]"></writing></div>'
})


function callback(param) {
	data = JSON.parse(param);
	show.books = data;
	if (data == "") {
		show.books = [[[[""]],["","No writing found",""]]]
	}
	show.dataReceived = true;
}
// TODO : use pattern and index
function getwriting(address, pattern, index, author, title){
	httpAsync(url+"read?address="+address+"&pattern="+pattern +"&index="+index +"&author="+author +"&title="+title, "", link, "GET");
}
function link(writ){
	writing=JSON.parse(writ);
	completeText.text = writing[0].replace(/(\r\n|\n|\r)/g,"<br />");
	completeText.writingChosed = true;
	completeText.author = writing[1];
	completeText.title = writing[2];
	/*var extr = document.getElementById("extract");	
	extr.scrollIntoView();*/
}

var app = new Vue({
    el: '#app',
    data: {
        research: "Courage"
    },
	methods: {
		search: function () {
			httpAsync(url + "search?request="+app.research,"", callback, "GET");
		}
  	}
});

var show = new Vue({
    el: '#research_results',
    data: {
		books: [[[[]],["","","No request yet"]]],
		dataReceived: false
    }
});
var completeText = new Vue({
    el: '#complete_text',
    data: {
		writingChosed: false,
		text: "",
		author: "",
		title: ""
    },
	methods: {
		printIt: function(){
			var a = document.getElementById("texteee");
			//alert(document.getSelection().focusOffset + " " + document.getSelection().anchorOffset);
			//alert(completeText.text[a.selectionStart]);
		}
	}
});

document.addEventListener('copy', function(e){
    e.clipboardData.setData('text/plain', window.getSelection()+'\n\n\t('+completeText.author+', '+completeText.title+')');
    e.preventDefault();
	// We want our data, not data from any selection, to be written to the clipboard
});