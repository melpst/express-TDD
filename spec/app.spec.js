const server = require('../src/app')
const config = require('config')

describe("Server", function() {
	it("isn't null", function() {
		expect(server).not.toBeNull()
	});

	it("is defined", function() {
		expect(server).toBeDefined()
	});
})

describe("Database", function() {
	it("isn't null", function() {
		expect(server.db).not.toBeNull()
	});

	it("is defined", function() {
		expect(server.db).toBeDefined()
	});

	it("is connected to correct url", function() {
		if(config.get('database').get('dialect') === 'mongo'){
			expect(server.db.client.s.url).toEqual(process.env.MONGODB_URL+config.get('database').get('url'))
		}
		else if(config.get('database').get('dialect') === 'mock'){
			expect(server.db.url).toEqual(config.get('database').get('url'))
		}
		
	});
})