

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
			userinfos.infos={email: "", name:"", created_at: ""};
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
function adaptAlert(ans){
	alerts.show = 1;
}
var alerts = new Vue({
	el: "#alerts",
	data: {
		show: 0,
	},
	methods: {
		resend: function(){
			this.$http.get(url+"users/resend?id="+userinfos.infos.id).then(adaptAlert)
		}
	}
})

function pwdChanged(ans){
	var ansJSON = JSON.parse(ans.bodyText);
	if (ansJSON.success){
		$("#userinfos").modal("toggle");
		login.disconnect();
	}else if (ansJSON.type){
		userinfos.state_old_pwd = "has-error";
	}
	
}
var userinfos = new Vue({
	el: "#userinfos",
	data: {
		infos: {
			name: "",
			email: "",
			created_at: "",
		},
		page: 0,
		pwd: "",
		pwd_old: "",
		pwd_check: "",
		state_pwd: "",
		state_old_pwd: ""
	},
	computed: {
		showmail: function(){
			if (this.infos.email == null || this.infos.email ==""){return 'Vous ne nous avez pas donner votre adresse email'}
			else {return this.infos.email}
		}
	},
	watch:{
		infos: function(val){
			if (val.status == -1){
				alerts.show = 1;
			}else {
				alerts.show = 0;
			}
			if (val.created_at){
				this.infos.created_at = (new Date(this.infos.created_at)).toLocaleString('fr-FR');
			}
		}	
	},
	methods: {
		changePwd: function(){this.page = 1;},
		pwdC: function(){
			if (this.pwd == this.pwd_check){this.state_pwd = "has-success"; return true;}
			else {this.state_pwd = "has-warning"; return false;}
		},
		submit: function(){
			if (this.page==1 && this.pwdC()){
				this.$http.post(url+"users/updatepwd?id="+this.infos.id+"&name="+this.infos.name+"&newpwd="+this.pwd+"&oldpwd="+this.pwd_old+"&token="+login.auth.token).then(pwdChanged)
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

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var user;
if (getCookie("user")){
	user = JSON.parse(getCookie("user"));
} else { user = null;}
if (getCookie("verified_mail") && user != null){
	login.disconnect();
	alerts.show=2;
}