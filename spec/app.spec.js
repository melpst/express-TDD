const server = require('../src/app')

describe("Server", function() {
	it("isn't null", function() {
		expect(server).not.toBeNull()
	});

	it("is defined", function() {
		expect(server).toBeDefined()
	});
});