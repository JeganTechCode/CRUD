var env = "local"
var configuration = {};
if (env == "local") {
    configuration = {
       
        localhostBackend : 'http://localhost:3002', 
        localhostFrontend:'http://localhost:3000', 
        token: 'https://geolocation-db.com/json/'
    }
} else {
    configuration = {
       
        
       
    }
}

// http://3.110.127.65:3001
// localhost: 'http://localhost:3001'

export default configuration;