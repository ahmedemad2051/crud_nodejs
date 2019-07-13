const knex = require('../db/knex');
const request = require('supertest');
const app = require('../app');
const expect=require('chai').expect;

describe('CRUD Stickers', () => {
    before((done) => {
        knex.migrate.down().then(() => {
            knex.migrate.latest()
                .then(() => {
                    return knex.seed.run();
                }).then(() => done());
        });

    });

    it('works...', function () {
        console.log('its working');
    });

    it('Lists All Records', function (done) {
        request(app)
            .get('/api/stickers')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res)=>{
                expect(res.body).to.be.a('array');
                done();
            });
    });

    it('Get Record By Id', function (done) {
        request(app)
            .get('/api/stickers/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res)=>{
                expect(res.body).to.be.a('object');
                done();
            });
    });
});