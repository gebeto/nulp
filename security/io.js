const readline = require('readline');

exports.requestInput = function requestInput(message, postProcess) {
	postProcess = postProcess || (value => value);
	
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	return new Promise((resolve, reject) => {
		rl.question(message, (answer) => {
			resolve(postProcess(answer))
			rl.close();
		});
	});
}
