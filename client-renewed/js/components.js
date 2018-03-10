/* Author */
Vue.component('authors', {
	props: ['books', 'dataReceived', 'changeAuthor', 'writingName', 'idWri'],
	template: '\
			<div>\
				<slot name="globalSlot" :books="books"></slot>\
			</div>'
})
Vue.component('book', {
	props: ['author'],
	template: '<div><a v-on:click="$root.changeAuthor(author)">{{ author }}</a></div>'
})


/* Extracts */
Vue.component('extracts', {
	props: ['books', 'author'],
	template: '<div><slot name="writings" :author="author" :metadata="books"></slot></div>'
})
Vue.component('writing', {
	props: ['list', 'title', 'idWri', 'author'],
	template: '<div><slot name="extr" :list="list" :title="title" :id-wri="idWri" :author="author"></slot></div>'
})
Vue.component('extract', {
	props: ['text', 'index'],
	template: '<div><slot name="textextr" :text="text" :index="index"></slot></div>'
})


/* The writing in itself */
Vue.component('fulltext', {
	props: ['initialText', 'text', 'author','title','idWri'],
	template: '\
			<div >\
				<slot name="globalSlot" :title="title" :text="text" ></slot>\
			</div>'
})





Vue.component('concept', {
	props: ['c'],
	template: '<li>Name : {{ c.name }}, writing id : {{ c.writingid }}, extract : {{ c.extract }}</li>'
})

/*
<ul v-show="metadata.author == searchRes.author"><writing v-for="writ in metadata.books" v-bind:list="writ.extracts"  v-bind:title="writ.name" v-bind:idWri="writ.id" v-bind:author="metadata.author"></writing></ul>*/