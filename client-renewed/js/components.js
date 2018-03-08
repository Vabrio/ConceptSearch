Vue.component('authors', {
	props: ['books', 'dataReceived', 'changeAuthor', 'writingName', 'idWri'],
	template: '\
			<div id="auteurs" class="col-md-1">\
				<slot name="auteursTitre"></slot>\
				<slot name="auteursNames" :books="books"></slot>\
			</div>'
})
Vue.component('book', {
	props: ['author'],
	template: '<div><a v-on:click="$root.changeAuthor(author)">{{ author }}</a></div>'
})

Vue.component('extracts', {
	props: ['books', 'author'],
	template: '<div id="extract" class="col-md-2"><slot name="writings" :author="author" :metadata="books"></slot></div>'
})

Vue.component('extract', {
	props: ['list','text', 'index', 'idWri', 'author', 'title'],
	template: '<li><a class="extractText" v-bind:href="\'#\'+index" >{{ text }}</a></li>'
})

Vue.component('writing', {
	props: ['list', 'title', 'idWri', 'author'],
	template: '<li><div><a class="extractTitle" href="#writingHead" v-on:click="$root.changeWriting(idWri, list, author, title)" >{{ title }}</a> <br/><ul v-show="title == $root.result.writingName"><extract v-for="extr in list" v-bind:list="list" v-bind:text="extr.extract" v-bind:index="extr.index" v-bind:idWri="idWri" v-bind:author="author" v-bind:title="title" :key="extr.index"></extract></ul></div></li>'
})


/* The writing in itself */
Vue.component('fulltext', {
	props: ['initialText', 'text', 'author','title','idWri'],
	template: '\
			<div class="col-md-7" id="fulltext">\
				<div class="resultTitle">{{ title }}</div>\
				<div class="resultText" >\
					<div style="overflow: auto;" id="text_chosen" class="row" v-html=" text " v-on:select="onClick()"></div>\
				</div>\
			</div>',
	methods: {
		onclick: function(){
			
		}
  	}
})





Vue.component('concept', {
	props: ['c'],
	template: '<li>Name : {{ c.name }}, writing id : {{ c.writingid }}, extract : {{ c.extract }}</li>'
})

/*
<ul v-show="metadata.author == searchRes.author"><writing v-for="writ in metadata.books" v-bind:list="writ.extracts"  v-bind:title="writ.name" v-bind:idWri="writ.id" v-bind:author="metadata.author"></writing></ul>*/