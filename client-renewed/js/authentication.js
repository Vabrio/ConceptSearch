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
		login.auth.concepts = ansJson.concepts;
		userinfos.infos = ansJson.user;
	 	localStorage.setItem('token', ansJson.token);
		localStorage.setItem('userInfo', JSON.stringify(ansJson.user));
		localStorage.setItem('userConcepts', JSON.stringify(ansJson.concepts));
		$("#logger").modal("toggle");
		/*usercontent.concepts=ansJson.concepts;
		usercontent.userData=ansJson.user;*/
		
	}
}
function subscribed(ans){
	var ansJson = JSON.parse(ans.bodyText);
	if (!ansJson.success) {
		console.log(ansJson.message);
		if (ansJson.type==1) {
			logger.state_login = "has-error";
		}if (ansJson.type==2){
			logger.state_email = "has-error";
		}
	}else {
		$("#logger").modal("toggle");
		userinfos.infos = ansJson.user;
		console.log(userinfos.infos.status);
	}
}
function resetpwd(ans){
	console.log(ans);
}
function checkLogin(ans){
	console.log(ans);
	var ansJson = JSON.parse(ans.bodyText);
	if (!ansJson.success){
		logger.state_login = "has-error";
	} else {
		logger.state_login = "has-success";
	}
}

var logger = new Vue({
	el: "#logger",
	data: {
		subscribing: false,
		forgot_pwd: false,
		pseudo: "",
		password: "",
		password_check: "",
		email: "",
		email_check: "",
		/*firstname: "",
		lastname: "",
		birth_date: "",*/
		state_login: "",
		state_pwd: "",
		state_email: "",
		show_email_verif: false
	},
	computed: {
	},
	watch:{
	},
	methods: {
		toggleConnect: function(){
			this.subscribing = false;
			this.forgot_pwd = false;
			this.state_login ="";
			this.state_pwd ="";
		},
		loginC: function(){
			if (this.subscribing){
				this.$http.get(url+"users/userindb?name="+this.pseudo).then(checkLogin)
			}else{
				this.state_login="";
			}
		},
		pwdC: function(){
			if (this.password_check == this.password){this.state_pwd = "has-success"}
			else {this.state_pwd = "has-warning"}
		},
		emailC: function(){
			if (this.email_check == this.email && validateEmail(this.email)){this.state_email = "has-success"}
			else {this.state_email = "has-warning"}
		},
		submit: function(){
			if (this.subscribing){this.subscribe()}
			else if (this.forgot_pwd){this.forgotpwd()}
			else {this.connect()};
		},
		connect: function(){
			this.$http.post(url+"users/authenticate?name="+ this.pseudo +"&password="+this.password).then(logged);
		},
		subscribe: function(){
			if (this.password != this.password_check){
				this.state_pwd = "has-error";
			}else if (this.email != this.email_check){
				this.state_email = "has-error";
			}else {
				this.$http.post(url+"users/subscribe?name="+ this.pseudo+"&password="+this.password+"&email="+this.email).then(subscribed);
			}
		},
		forgotpwd: function(){
			this.$http.get(url+"users/forgot?email="+ this.email).then(resetpwd);
		}
	}
})