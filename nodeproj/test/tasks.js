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
    describe("POST /getUsers", () => {
        it("it should get the users list", () => {
            chai.request(app)
                // .post('/getUsers')
                .post('/getUsers')
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
    describe("POST /getCursos", () => {
        it("it should get the courses list", () => {
            chai.request(app)
                .post('/getCursos')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');

                    done();
                })
        })
    });

    /////////////GETTING USERS////////
    describe("POST /getTiempos", () => {
        it("it should get the times list of the different courses", () => {
            chai.request(app)
                .post('/getCursos')
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');

                    done();
                })
        })
    });

    /////////////CRUD TIMES////////
    // describe("POST /addTiempos", () => {
    //     it("it should insert the inverted time on a specific course", async () => {
    //         chai.request(app)
    //             .post('/addTiempos')
    //             .type('form')
    //             .set('content-type', 'application/x-www-form-urlencoded')
    //             // .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmF0bWFuQGJhdG1hbi5jb20iLCJpYXQiOjE2MDczMTcyMjN9.9BqyksJmISJ42WJ0NBsNfprLSzdtuO8HiT1XpUW3WrQ')
    //             .set( 'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiYmF0bWFuQGJhdG1hbi5jb20iLCJpYXQiOjE2MDczMTcyMjN9.9BqyksJmISJ42WJ0NBsNfprLSzdtuO8HiT1XpUW3WrQ' )

    //             .send({
    //                 nombreUsuario: 'Tu conciencia',
    //                 tipoCurso: 'Talleres',
    //                 dias: 0,
    //                 horas: 2,
    //                 minutos: 0,
    //                 nombreCurso: 'Backend JavaScript'
    //             })
    //             .end((err, response) => {
    //                 // response.should.have.status(200);
    //                 // response.body.should.be.a('array');
    //                 logger.info(err);

    //                 done();
    //             })
    //     })
    // });

});