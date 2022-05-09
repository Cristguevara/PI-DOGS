const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');

const agent = session(app);

describe('Dogs id', () => {
    it('GET /dogs/1', function () {
        return agent.get('/dogs/1')
                .expect(200) 
                .expect('Content-Type', /json/)
                .expect(function (res) {
                    expect(res.body).to.eql([{
                        id: 1,
                        name: "Affenpinscher",
                        weight: "3 - 6",
                        height: "23 - 29",
                        image: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
                        life_span: "10 - 12 years",
                        temperament: "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving"
                      }])
                })
          
      })
      it('GET /dogs/20', function () {
        return agent.get('/dogs/20')
                .expect(201) 
                .expect(function (res) {
                    expect(res.body[0]).to.eql('El id de la raza de perro no existe')
                })
          
      })
      it('GET /dogs/asd', function () {
        return agent.get('/dogs/asd')
                .expect(200) 
                .expect(function (res) {
                    expect(res.body[0]).to.eql('El id de la raza de perro no existe')
                })
          
      })
  });