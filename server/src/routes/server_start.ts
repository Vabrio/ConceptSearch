//------------------------------------------------------------------
// Start the server using ssl or usual http depending on the params 
// in const/local
//------------------------------------------------------------------
import { PORT, SSL_KEY, SSL_CERTIFICATE, USE_SSL } from "../const/local";
const https = require('https');
const fs = require('fs');

function startServer(app: any){
	if (USE_SSL){
		var privateKey = fs.readFileSync( SSL_KEY );
		var certificate = fs.readFileSync( SSL_CERTIFICATE );
		// START AN HTTPS SERVER (SSL)
		https.createServer({
			key: privateKey,
			cert: certificate
		}, app).listen(PORT);
		console.log("SERVER STARTED IN SSL AT PORT : " + PORT);
	} else {
		// START LISTENING TO A SPECIFIED PORT IN HTTP
		var server = app.listen(PORT, function () {
			var port = server.address().port
			console.log("Server listening on port : %s", port)
		})
	}
}

export {startServer}
