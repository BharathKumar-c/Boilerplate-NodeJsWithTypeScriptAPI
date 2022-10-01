import bcrypt from 'bcrypt';
import { JWTService } from '.';
import db from '../model';
import { hashText } from '../util';
import jwtService from './jwt.service';

const { User } = db;

const createUser = async ({ email, password, name }: UserAttributes) => {
  try {
    const hashedPassword = await hashText(password);
    return await User.create({ email, password: hashedPassword, name });
  } catch (error) {
    throw error;
  }
};

const checkEmailExists = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return !!user;
  } catch (error) {
    return false;
  }
};

const checkUserCredentials = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw Error('User does not exist');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      const tokens = jwtService.generateUserTokens(user);
      return tokens;
    } else {
      throw Error('Invalid Email or Password');
    }
  } catch (error) {
    throw error;
  }
};

const generateAccessTokenByRefreshToken = async (refresh_token: string) => {
  try {
    const payload: any = await JWTService.verifyToken(
      refresh_token,
      'refresh_token'
    );
    const data: UserAttributes = {
      email: payload?.email,
      userId: payload.user_id
    };
    const access_token = await JWTService.createToken(data);
    return { access_token, refresh_token };
  } catch (error) {
    throw error;
  }
};

export default {
  createUser,
  checkEmailExists,
  checkUserCredentials,
  generateAccessTokenByRefreshToken
};
