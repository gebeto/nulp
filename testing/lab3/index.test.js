const Vector2 = require("./index");

describe("Vector 2", () => {

	it("Set values", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});

		vector.set(10, 10);
		expect(vector).toMatchObject({x: 10, y: 10});
	});
	
	it("Set X", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});

		vector.setX(10);
		expect(vector).toMatchObject({x: 10, y: 1});
	});
	
	it("Set Y", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});

		vector.setY(10);
		expect(vector).toMatchObject({x: 1, y: 10});
	});

	it("Add", () => {
		const vector = new Vector2(1,1);

		expect(vector.x).toBe(1);
		expect(vector.y).toBe(1);

		vector.add(new Vector2(1,2));

		expect(vector.x).toBe(2);
		expect(vector.y).toBe(3);
		expect(vector).toMatchObject(new Vector2(2,3));
	});

	it("Add scalar", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});
		vector.addScalar(1);
		expect(vector).toMatchObject({x: 2, y: 2});
	});

	it("Sub", () => {
		const vector = new Vector2(1,1);

		expect(vector.x).toBe(1);
		expect(vector.y).toBe(1);

		vector.add(new Vector2(1,2));

		expect(vector.x).toBe(2);
		expect(vector.y).toBe(3);
		expect(vector).toMatchObject(new Vector2(2,3));
	});

	it("Sub scalar", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});
		vector.subScalar(10);
		expect(vector).toMatchObject({x: -9, y: -9});
	});

	it("Divide", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});
		vector.divide(new Vector2(2, 2));
		expect(vector).toMatchObject({x: 0.5, y: 0.5});
	});

	it("Divide scalar", () => {
		const vector = new Vector2(1,1);
		expect(vector).toMatchObject({x: 1, y: 1});
		vector.divideScalar(2);
		expect(vector).toMatchObject({x: 0.5, y: 0.5});
	});
	
	it("Multiply", () => {
		const vector = new Vector2(2,2);
		expect(vector).toMatchObject({x: 2, y: 2});
		vector.multiply(new Vector2(10,2));
		expect(vector).toMatchObject({x: 20, y: 4});
	});
	
	it("Copy", () => {
		const vector = new Vector2(2,2);
		const vecClone = vector.clone();
		expect(vector).toBe(vector);
		expect(vector).not.toBe(vecClone);
	});

	it("Length", () => {
		const vector = new Vector2(3, 4);
		expect(vector.length()).toBe(5);
	});

});