const server = require('../../src/app')
const request = require('supertest')
import {finalConfig} from '../../config'

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
		if(finalConfig.database.dialect === 'mongo'){
			expect(server.db.client.s.url).toEqual(process.env.MONGODB_URL+finalConfig.database.url)
		}
		else if(finalConfig.database.dialect === 'mock'){
			expect(server.db.url).toEqual(finalConfig.database.url)
		}
		
	});
})

describe("index", ()=> {
	it("GET /", async()=> {
        const response = await request(server).get('/')
        expect(response.status).toEqual(200)
        expect(response.body).toBeDefined()
	});
})