import {expect} from 'chai';
import {describe, before, it} from 'mocha';
import UserService from '../../src/services/user.service';
import mongoose from 'mongoose';



describe('User', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }) ;
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe('Get Users', () => {
    it('should return empty array', async () => {
      const result = await new UserService().login_check("", "");
      expect(result).to.be.an('array');
    });
});
});
