import server from '../../src/app'
import userModel from '../../src/models'
import mongoose from 'mongoose'
import request from 'supertest'

const userColl = mongoose.model('user', userModel)

describe("POST /user", ()=> {
    beforeEach(async ()=>{
        await userColl.deleteMany({})
    })

	it("returns user info when insert user is success", async ()=> {
        const res = await request(server)
        .post('/user')
        .send({
            "username": "gie",
            "text": "hehe"
        })
        expect(res.status).toEqual(200)
        expect(Object.keys(res.body)).toContain('_id')
        expect(Object.keys(res.body)).toContain('username')
        expect(Object.keys(res.body)).toContain('text')
	})
})

describe("GET /", ()=> {
	it("renders index.ejs", async ()=> {
        const res = await request(server)
        .get('/')
        expect(res.status).toEqual(200)
        expect(res.body).toEqual({'text':'hello world'})
	})
})