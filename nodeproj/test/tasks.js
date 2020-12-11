// const { request } = require('chai');
process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { response } = require('express');
const app = require('../index');
const logger = require('../utils/logger');

chai.use(chaiHttp);

describe('Tasks Api', () => {


    /////////////GETTING USERS////////
    describe("GET /getUsers", () => {
        it("it should get the users list", () => {
            chai.request(app)
                // .post('/getUsers')
                .get('/getUsers')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');

                    done();
                })
        })
    });

    describe('POST /login', () => {
        it('it should get the token with a correct account request', async () => {
            chai.request(app)
                .post('/login')
                .type('form')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send({ mail: 'batman@batman.com', password: '9450476b384b32d8ad8b758e76c98a69' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    done();
                });
        });
    });

    /////////////GETTING USERS////////
    describe("GET /getCursos", () => {
        it("it should get the courses list", () => {
            chai.request(app)
                .get('/getCursos')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    // logger.info(response);
                    logger.info(res);
                    done();
                })
        })
    });

    /////////////GETTING USERS////////
    describe("GET /getTiempos", () => {
        it("it should get the times list of the different courses", () => {
            chai.request(app)
                .get('/getTiempos')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');

                    done();
                })
        })
    });
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmF0bWFuQGJhdG1hbi5jb20iLCJpYXQiOjE2MDczNzk1NTB9.1hFedxZpYERJIux1sGG1-Q6NmoUO_jP5J9DyRHCnT7U";

    ///////////CRUD TIMES////////
    describe("POST /addTiempos", () => {
        it("it should insert the inverted time on a specific course",  () => {
            chai.request(app)
                .post('/addTiempos')
                .set('Content-Type', 'application/x-www-form-urlencoded')
                // .set( 'Authorization', 'Bearer ' + token )
                .set({'Authorization': 'Bearer ' + token })
                .type('form')
                .send({
                    nombreUsuario: 'Tu conciencia',
                    tipoCurso: 'Talleres',
                    dias: 0,
                    horas: 2,
                    minutos: 0,
                    nombreCurso: 'Backend JavaScript'
                })
                .end((err, res) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    logger.info(res);

                    done();
                });
        })
    });

});