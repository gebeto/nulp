const fs = require("fs");

const M = Math.pow(2, 14) - 1;
const A = Math.pow(6, 5);
const C = 5;
const X0 = 32;

const QUANTITY = 100;


function randomList(m, a, c, x0) {
	const list = [];
	list.push(x0)
	for (let n = 0; n < m - 1; n++) {
		const item = (a * list[n] + c) % m;
		list.push(item);
	}
	return list;
}

function *randomGenerator(m, a, c, x0) {
	let n = 0;
	while (true) {
		const shouldStop = yield x0 = (a * x0 + c) % m;
		if (shouldStop === false) break;
		n++;
	}
}

function printList(list, quantity, stdout) {
	stdout = stdout || process.stdout;
	for (let i = 0; i < quantity; i++) {
		stdout.write(`${i + 1}:\t${list[i]}\n`);
	}
}

console.log({M, A, C, X0});

const result = randomList(M, A, C, X0);
printList(result, 10, process.stdout);
printList(result, 10, fs.createWriteStream('out.txt', 'utf-8'));