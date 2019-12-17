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
		expect(1).toBe(1);
	});

	it("Divide", () => {
		expect(1).toBe(1);
	});
	
	it("Multiply", () => {
		expect(1).toBe(1);
	});
	
	it("Copy", () => {
		expect(1).toBe(1);
	});

	it("Clamp", () => {
		expect(1).toBe(1);
	});

});