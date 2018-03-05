// Function to call when login
function logged(ans){
	var ansJson = JSON.parse(ans.bodyText);
	if (!ansJson.success){
		console.log( ansJson.message);
		if (ansJson.type == 0){
			login_form.state_login = "has-error";
		}else{
			login_form.state_login = "";
			login_form.state_pwd = "has-error";
		}
	} else{
		console.log( ansJson.message + ansJson.token );
	 	localStorage.setItem('token', ansJson.token);
		/*usercontent.concepts=ansJson.concepts;
		usercontent.userData=ansJson.user;*/
		window.location.href = 'index.html';
	}
}
function subscribed(ans){
	console.log(ans.bodyText);
	var ansJson = JSON.parse(ans.bodyText);
	if (!ansJson.success) {
		console.log(ansJson.message);
		if (ansJson.type) {
			login_form.sub_state = "has-error";
		}
	}else {
		login_form.connect();
	}
}
var login_form = new Vue({
	el: "#login_form",
	data: {
		pseudo: "",
		password: "",
		firstname: "",
		lastname: "",
		email: "",
		birth_date: "",
		sub_state: "",
		state_login: "",
		state_pwd: ""
	},
	computed: {
	},
	methods: {
		connect: function(){
			console.log("Trying to connect");
			this.$http.post(url+"users/authenticate?name="+ this.pseudo +"&password="+this.password).then(response => {
				logged(response);
			});
		},
		subscribe: function(){
			console.log("Trying to subscribe");
			this.$http.post(url+"users/subscribe?name="+ this.pseudo +"&password="+this.password).then(response => {
				subscribed(response);
			});
			//httpAsync(url+"users/subscribe?name="+this.sub_login+"&password="+this.sub_pwd, "", subscribed, "POST");
		}
	}
})