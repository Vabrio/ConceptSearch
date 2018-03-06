function searchRes(ans){
	homePage.homePage= false;
}

var homePage = new Vue({
	el: "#homePage",
	data: {
		homePage: true,
		searchbar: "",
	},
	computed: {
	},
	methods: {
		search: function(){
			searchRes(null);
		}
	}
})

var researchPage = new Vue({
	el: "#researchPage",
	data: {
		searchbar: ""
	},
	computed: {
		researchPage: function(){
			return !homePage.homePage;	
		}
	},
	methods:{
		toggleHomePage: function(){
			homePage.homePage= true;
		},
	}
})
