const fs = require("fs");

const M = Math.pow(2, 31);
const A = Math.pow(2, 16);
const C = 28657;
const X0 = 33;

const QUANTITY = 100;


function randomList(m, a, c, x0) {
	let period = -1;
	const list = [];
	list.push(x0)
	for (let n = 0; n < m - 1; n++) {
		const item = (a * list[n] + c) % m;
		list.push(item);
		if (item === x0 && period < 0) period = n;
	}
	return [list, period];
}

function printList(result, quantity, stdout) {
	stdout = stdout || process.stdout;
	const [list, period] = result;
	for (let i = 0; i < quantity; i++) {
		stdout.write(`${i + 1}:\t${list[i]}\n`);
	}
	stdout.write(`Period: ${period}`);
}

console.log({M, A, C, X0});

const result = randomList(M, A, C, X0);
printList(result, 300, process.stdout);
printList(result, 300, fs.createWriteStream('out.txt', 'utf-8'));