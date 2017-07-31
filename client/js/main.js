var url = "http://localhost:8081/";

Vue.component('extract', {
	props: ['text', 'id'],
	template: '<li v-show="id<10 "><a>{{ text }}</a></li>'
})

Vue.component('book', {
  props: ['metadata'],
  template: '<div><h1>{{ metadata[1][1] }}</h1><h2>{{ metadata[1 ][2] }}</h2> <br/><ul><extract v-for="extr in metadata[0]" v-bind:text="extr[0]" v-bind:id="metadata[0].indexOf(extr)"></extract></div></ul>'
})



function callback(param) {
	data = JSON.parse(param);
	show.books = data;
}
var app = new Vue({
    el: '#app',
    data: {
        research: "Justice"
    },
	methods: {
		search: function () {
			httpAsync(url + "search?request="+app.research,"", callback, "GET");
		}
  	}
});
var show = new Vue({
    el: '#showON',
    data: {
		books: [[[["oh my !"]],["","Name 1","Author 1"]],[[["It's me !"]],["","Name 2","Author 2"]]],
    }
});