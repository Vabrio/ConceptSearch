//var url = "http://localhost:8081/"
var url = "http://212.194.144.183:8081/";

Vue.component('extract', {
	props: ['text', 'id', 'address'],
	template: '<li v-show="id<10"><a v-on:click="getwriting(address)">{{ text }}</a></li>'
})

Vue.component('book', {
  props: ['metadata'],
  template: '<div><h1>{{ metadata[1][1] }}</h1><h2>{{ metadata[1][2] }}</h2> <br/><ul><extract v-for="extr in metadata[0]" v-bind:text="extr[0]" v-bind:id="metadata[0].indexOf(extr)" v-bind:address="metadata[1][3]"></extract></div></ul>'
})



function callback(param) {
	data = JSON.parse(param);
	show.books = data;
	if (data == "") {
		show.books = [[[[""]],["","No writing found",""]]]
	}
	show.dataReceived = true;
}
function getwriting(address){
	httpAsync(url+"read?address="+address, "", link, "GET");
}
function link(writing){
	completeText.text = writing.replace(/(\r\n|\n|\r)/g,"<br />");
	completeText.writingChosed = true;
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
		text: ""
    },
	methods: {
		printIt: function(){
			var a = document.getElementById("texteee");
			//alert(document.getSelection().focusOffset + " " + document.getSelection().anchorOffset);
			//alert(completeText.text[a.selectionStart]);
		}
	}
});
