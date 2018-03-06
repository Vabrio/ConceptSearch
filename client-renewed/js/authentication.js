// Function to call when login
function logged(ans){
	var ansJson = JSON.parse(ans.bodyText);
	if (!ansJson.success){
		console.log( ansJson.message);
		if (ansJson.type == 0){
			logger.state_login = "has-error";
		}else{
			logger.state_login = "";
			logger.state_pwd = "has-error";
		}
	} else{
		console.log( ansJson.message + ansJson.token );
		login.auth.logged = true;
		login.auth.token = ansJson.token;
	 	localStorage.setItem('token', ansJson.token);
		localStorage.setItem('userInfo', ansJson.user);
		localStorage.setItem('userConcepts', ansJson.concepts);
		$("#logger").modal("toggle");
		/*usercontent.concepts=ansJson.concepts;
		usercontent.userData=ansJson.user;*/
		
	}
}
function subscribed(ans){
	console.log(ans.bodyText);
	var ansJson = JSON.parse(ans.bodyText);
	if (!ansJson.success) {
		console.log(ansJson.message);
		if (ansJson.type) {
			logger.state_login = "has-error";
		}
	}else {
		logger.connect();
	}
}
var logger = new Vue({
	el: "#logger",
	data: {
		subscribing: false,
		pseudo: "",
		password: "",
		password_check: "",
		email: "",
		email_check: "",
		firstname: "",
		lastname: "",
		birth_date: "",
		state_login: "",
		state_pwd: "",
		state_email: ""
	},
	computed: {
	},
	watch:{
	},
	methods: {
		toggleConnect: function(){
			this.subscribing = !this.subscribing;
			this.state_login ="";
			this.state_pwd ="";
		},
		pwdC: function(){
			if (this.password_check == this.password){this.state_pwd = ""}
			else {this.state_pwd = "has-warning"}
		},
		emailC: function(){
			if (this.email_check == this.email){this.state_email = ""}
			else {this.state_email = "has-warning"}
		},
		submit: function(){
			if (this.subscribing){this.subscribe()}
			else {this.connect()};
		},
		connect: function(){
			this.$http.post(url+"users/authenticate?name="+ this.pseudo +"&password="+this.password).then(response => {
				logged(response);
			});
		},
		subscribe: function(){
			if (this.password != this.password_check){
				this.state_pwd = "has-error";
			}else if (this.email != this.email_check){
				this.state_email = "has-error";
			}else {
				this.$http.post(url+"users/subscribe?name="+ this.pseudo +"&password="+this.password).then(response => {
					subscribed(response);
				});
			}
		}
	}
})