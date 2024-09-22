import { expect} from 'chai';
import {describe ,before} from 'mocha';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/index';

let loginToken = '';  // Variable to store the login token
let newUser = {
    firstName: 'hdjshalkj',
    lastName: 'hdjhsjlk',
    emailId: 'dhaakhskjdghj@gmial.com',
    password: 'hdkjhskljak'
};   // Variable to store user details for login
let forgetToken = '';  // Variable to store reset token

describe('User API', () => {
  before(async () => {
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.DATABASE_TEST as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    mongoose.connection.once('open', async () => {
      await mongoose.connection.db.dropDatabase();
    });

  });

  after(async () => {
    await mongoose.disconnect();
  });

  
  describe('Create User', () => {
    it('should create a new user and return 201 status with success message', (done) => {
      request(app.getApp())
        .post('/api/users/')
        .send(newUser)
        .expect(201)
        .end((err, res) => {
          console.log('Create User Response Status:', res.status);
          console.log('Create User Response Body:', res.body);
          if (err) {
            console.error('Error:', err.message);
            return done(err);
          }
          expect(res.body).to.have.property('message').that.equals('User created successfully');
          done();
        });
    });
  });
  
  describe('Login User', () => {
    it('should log in the user created above and return 200 status with a token', (done) => {
      const loginDetails = {
        emailId: newUser.emailId,
        password: newUser.password,
      };

      request(app.getApp())
        .post('/api/users/login')
        .send(loginDetails)
        .expect(200)
        .end((err: any, res: any) => {
          console.log('Login Response Status:', res.status);
          console.log('Login Response Body:', res.body);
          loginToken = res.body.data.generate_Token;
          if (err) {
            console.error('Error:', err.message);
            return done(err);
          }

          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('generate_Token');
          done();
        });
    });
  });
  
  describe('Forget Password', () => {
    it('should generate the reset token to reset the password', (done) => {
      const forgetDetails = {
        emailId: newUser.emailId
      };

      request(app.getApp())
        .post('/api/users/forget_pwd')
        .send(forgetDetails)
        .expect(200)
        .end((err: any, res: any) => {
          console.log('Forget Response Status:', res.status);
          console.log('Forget Response Body:', res.body);
          forgetToken = res.body.data; // Ensure the key is 'resetToken'
          if (err) {
            console.error('Error:', err.message, forgetToken);
            return done(err);
          }      
          // Store the token for future use
          done();
        });
    });
  });

  describe('Reset Password', () => {
    it('should reset the password successfully', (done) => {
      const resetPasswordDetails = {
        token: forgetToken,
        newPassword: '1234572634678@newPass'
      };

      request(app.getApp())
        .post('/api/users/reset_pwd')
        .set('Authorization', `Bearer ${forgetToken}`) // Use the forgetToken as Bearer token
        .send(resetPasswordDetails)
        .expect(200)
        .end((err: any, res: any) => {
          console.log('Reset Password Response Status:', res.status);
          console.log('Reset Password Response Body:', res.body);

          if (err) {
            console.error('Error:', err.message);
            return done(err);
          }

          done();
        });
    });
  });

});


export { loginToken };


//*   npm run test >>>