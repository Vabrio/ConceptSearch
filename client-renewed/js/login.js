var login = new Vue({
	el: "#login",
	data: {
		auth: {
			logged: false,
			token: null
		}
	},
	computed: {
	},
	methods: {
		disconnect: function(){
			this.auth.token = null;
			this.auth.logged = false;
	 		localStorage.removeItem('token');
			localStorage.removeItem('userInfo');
			localStorage.removeItem('userConcepts');
		}
	}
})

login.auth.token = localStorage.getItem('token');
login.auth.logged = (login.auth.token != null);
