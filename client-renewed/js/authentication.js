
var login_form = new Vue({
	el: "#login_form",
	data: {
		pseudo: "",
		password: "",
		firstname: "",
		lastname: "",
		email: "",
		birth_date: ""
	},
	computed: {
	},
	methods: {
		connect: function(){
			console.log("Trying to connect");
		},
		subscribe: function(){
			console.log("Trying to subscribe");
		}
	}
})
