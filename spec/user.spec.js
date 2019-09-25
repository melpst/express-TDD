const server = require('../src/app')
const request = require('supertest')
jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000

describe("User", ()=> {
	it("GET /5d7b5e6da1b9980012232223", async()=> {
        const response = await request(server).get('/user/5d7b5e6da1b9980012232223')
        console.log(response.body)
        expect(response.status).toEqual(200)
        expect(response.body).toBeDefined()
	});
})
