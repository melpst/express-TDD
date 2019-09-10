import {expect} from 'chai';
import config from  'config';
import {server,db} from '../src/app';

describe('Server', ()=>{
    it('tests that server is running current port', async()=>{
        expect(server.address().port).to.equal(config.get('port'))
    })

    // it('can connect to the correct db', async()=>{
    //     expect(db.client.s.url).to.equal(process.env.MONGODB_URL+config.get('database'))
    // })
});