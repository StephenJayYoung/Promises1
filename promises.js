var BPromise = require('bluebird');
var fs = BPromise.promisifyAll(require('fs'));

var name;
var email;

var loggedIn = process.argv[2] === 'loggedIn';


// // take 1 was this:

// if (loggedIn) {
// 	BPromise.resolve()
// 	.then(function() {
// 		return fs.readFileAsync('./name.json', { encoding: 'utf8' });
// 	})
// 	.then(function(content) {
// 		name = JSON.parse(content).name;
// 	})
// 	.then(function() {
// 		return fs.readFileAsync('./email.json', { encoding: 'utf8' });
// 	})
// 	.then(function(content) {
// 		email = JSON.parse(content).email;
// 	})
// 	.then(function() {
// 		console.log('I am all done. I got this info... name: %s, email: %s', name, email);
// 	});
// }
// else {
// 	fs.readFileAsync('./name.json', { encoding: 'utf8' }).then(function(content) {
// 		name = JSON.parse(content).name;
// 	})
// 	.then(function() {
// 		console.log('I am all done. I got this info... name: %s, email: %s', name, email);
// 	});
// }




// // take 2 was this:

// fs.readFileAsync('./name.json', { encoding: 'utf8' }).then(function(content) {
// 	name = JSON.parse(content).name;
// })
// .then(function() {
// 	var readEmailPromise;
// 	if (loggedIn) {
// 		readEmailPromise = fs.readFileAsync('./email.json', { encoding: 'utf8' });
// 	}
// 	return readEmailPromise;
// })
// .then(function(content) {
// 	if (content) {
// 		email = JSON.parse(content).email;
// 	}
// })
// .then(function() {
// 	console.log('I am all done. I got this info... name: %s, email: %s', name, email);
// });


// // take 3 is this:


// var promise = fs.readFileAsync('./name.json', { encoding: 'utf8' })

// promise = promise.then(function(content) {
// 	name = JSON.parse(content).name;
// });

// if (loggedIn) {
// 	promise = promise.then(function() {
// 		return fs.readFileAsync('./email.json', { encoding: 'utf8' });
// 	});

// 	promise = promise.then(function(content) {
// 		email = JSON.parse(content).email;
// 	});
// }

// promise = promise.then(function() {
// 	console.log('I am all done. I got this info... name: %s, email: %s', name, email);
// });



// // take 4 is this:


// var promise = fs.readFileAsync('./name.json', { encoding: 'utf8' })
// .then(function(content) {
// 	name = JSON.parse(content).name;
// });

// if (loggedIn) {
// 	promise = promise.then(function() {
// 		return fs.readFileAsync('./email.json', { encoding: 'utf8' });
// 	})
// 	.then(function(content) {
// 		email = JSON.parse(content).email;
// 	});
// }

// promise.then(function() {
// 	console.log('I am all done. I got this info... name: %s, email: %s', name, email);
// });



// take 5 is this:


var promise = BPromise.resolve();

if (loggedIn) {
	promise = promise.then(function() {
		return fs.readFileAsync('./email.json', { encoding: 'utf8' });
	})
	.then(function(content) {
		email = JSON.parse(content).email;
	});
}

promise.then(function() {
	return fs.readFileAsync('./name.json', { encoding: 'utf8' });
})
.then(function(content) {
	name = JSON.parse(content).name;
})
.then(function() {
	console.log('I am all done. I got this info... name: %s, email: %s', name, email);
});
