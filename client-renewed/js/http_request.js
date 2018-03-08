var url="http://localhost:8080/";
//var url="https://concept-search.org:8080/";

new Vue({

  http: {
    root: '/',
    headers: {
		//contentType: "application/x-www-form-urlencoded"
      //Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  }

})
Vue.http.interceptors.push(function(request) {

  // modify method
  //request.method = 'POST';

  // modify headers
  //request.headers.set('X-CSRF-TOKEN', 'TOKEN');
  request.headers.set('Content-Type', 'application/x-www-form-urlencoded');

});