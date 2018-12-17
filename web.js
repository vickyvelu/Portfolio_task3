var http = require('http');

var fs = require('fs');


function handle_incoming_request (req, res) {

    console.log("INCOMING REQUEST: " + req.method + " " + req.url);

    load_sensor_data(function(err, readings){

    if (err) { 

       console.log("Couldn't read file");

    }

    console.log(readings);

    res.writeHead(200, { "Content-Type" : "application/json" });

    res.end(JSON.stringify({temperature : readings.slice(0, 2),humidity : readings.slice(3, 5),windspeed : readings.slice(6, 8),time : readings.slice(9, 14),location : readings.slice(15, 30)}));

   });

}


function load_sensor_data(callback) {

   fs.readFile(

   "sensorlog.txt",'utf8',

   function (err, readings) {

   if (err) {

   callback(err);

return;


}

callback(null, readings);

}

);

}

var s = http.createServer(handle_incoming_request);

s.listen(8080);