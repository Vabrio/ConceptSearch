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
		}
	}
})

login.auth.token = localStorage.getItem('token');
login.auth.logged = (login.auth.token != null);
