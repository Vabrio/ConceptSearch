var login = new Vue({
	el: "#login",
	data: {
		auth: {
			logged: false,
			token: null,
			concepts: null,
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

function validateEmail(email) 
{
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}


var userinfos = new Vue({
	el: "#userinfos",
	data: {
		infos: {
			email: ""
		},
		page: 0,
		email_check: "",
		state_email: ""
	},
	computed: {
		showmail: function(){
			if (this.infos.email == null || this.infos.email ==""){return 'Vous ne nous avez pas donner votre adresse email'}
			else {return this.infos.email}
		}
	},
	methods: {
		changeMail: function(){this.page = 1;},
		changePwd: function(){this.page = 2;},
		emailC: function(){
			if (this.email_check == this.infos.email && validateEmail(this.infos.email)){this.state_email = "has-success"; return true;}
			else {this.state_email = "has-warning"; return false;}
		},
		submit: function(){
			if (this.page==1){
				if (this.emailC()){
					console.log("ok")
				}
			}else {
				
			}
		}
	}
})

login.auth.token = localStorage.getItem('token');
if (login.auth.token){
	login.auth.logged = (login.auth.token != null);
	userinfos.infos= JSON.parse(localStorage.getItem('userInfo'));
	login.auth.concepts= JSON.parse(localStorage.getItem('userConcepts'));
}