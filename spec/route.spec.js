const server = require('../src/app')
import request from 'supertest'
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

describe("POST /user", function() {
	it("returns user info when insert user is success", async function() {
        const res = await request(server)
        .post('/user')
        .send({
            "username": "gie",
            "text": "hehe"
        })
        expect(res.status).toEqual(200)
	})
})