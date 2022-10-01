import db from '../model';

const { User } = db;

const getUserDeatilsById = (userId: number) => {
  return User.findOne({
    where: { userId },
    attributes: { exclude: ['password', 'isActive'] }
  });
};

export default { getUserDeatilsById };
