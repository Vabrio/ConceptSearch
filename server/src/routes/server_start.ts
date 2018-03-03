import { PORT, SSL_KEY, SSL_CERTIFICATE, USE_SSL } from "../const/local";

function startServer(app: any){
	if (USE_SSL){
		var privateKey = fs.readFileSync( SSL_KEY );
		var certificate = fs.readFileSync( SSL_CERTIFICATE );
		// START AN HTTPS SERVER (SSL)
		https.createServer({
			key: privateKey,
			cert: certificate
		}, app).listen(port);
	} else {
		// START LISTENING TO A SPECIFIED PORT IN HTTP
		var server = app.listen(PORT, function () {
			var port = server.address().port
			console.log("Server listening on port : %s", port)
		})
	}
}

function startServerSSL(app: any){
	
}

export {startServer}