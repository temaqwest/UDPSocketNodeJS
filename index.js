const UDP = require('dgram');
const server = UDP.createSocket('udp4');

server.on('error', (error) => {
	console.log('Watch out: ', error);
	server.close();
});

server.on('message', (message, data) => {
	const clientMessage = message.toString()
	const reversedClientMessage = clientMessage.split('').reverse().join('')
	
	console.log('Data received from client: ', clientMessage);
	
	server.send(reversedClientMessage, data.port, data.address, (error) => {
		if (error) {
			console.log(data)
			console.log("Error: ", error)
		} else {
			console.log(data)
			console.log('Success');
		}
	})

});

server.on('listening',() => {
	const address = server.address();
	const port = address.port;
	const family = address.family;
	const ipaddr = address.address;
	
	console.log('PORT: ' + port);
	console.log('IP: ' + ipaddr);
	console.log('Server is ' + family);
});

server.on('close',() => {
	console.log('Closed');
});

server.bind(2222, '192.168.68.114');
