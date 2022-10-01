import { Response, Request } from 'express';
import { AuthService, UserService } from '../services';

const register = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ msg: 'All the required fields are needed' });
  }

  const exist = await AuthService.checkEmailExists(email);
  if (exist) {
    return res.status(400).json({ msg: 'Email already exist' });
  }

  try {
    await AuthService.createUser({ email, password, name });
    return res.status(200).json({ msg: 'User created' });
  } catch (error) {
    return res.sendStatus(400);
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'All the required fields are needed' });
  }
  try {
    const result = await AuthService.checkUserCredentials(email, password);
    return res.status(200).json({ ...result });
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const getUser = async (req: Request, res: Response) => {
  const { userId } = req;

  if (!userId) {
    return res.sendStatus(400);
  }
  try {
    const result = await UserService.getUserDeatilsById(userId);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).send({ message: error?.message || '' });
  }
};

const refreshToken = (req: Request, res: Response) => {
  const REFRESH_TOKEN = req.headers['x-access-token']?.toString();

  if (!REFRESH_TOKEN) {
    return res.status(400).json({ msg: 'refresh_token header is required' });
  }

  return AuthService.generateAccessTokenByRefreshToken(REFRESH_TOKEN)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err: any) => {
      return res.status(400).send({ message: err?.message || '' });
    });
};

export default { register, login, getUser, refreshToken };
