import bcrypt from 'bcrypt';

const hashText = async (text: string | undefined) =>
  new Promise((resolve, reject) => {
    if (text) {
      const saltRounds = 10;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) return reject();
        bcrypt.hash(text, salt, (err2, hash) => {
          if (err2) return reject();
          return resolve(hash);
        });
      });
    } else {
      reject();
    }
  });

export { hashText };
