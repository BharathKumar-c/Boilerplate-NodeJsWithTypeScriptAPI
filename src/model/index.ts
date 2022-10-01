'use strict';

import { Sequelize, DataTypes } from 'sequelize';
import fs from 'fs';
import path from 'path';

const basename = path.basename(__filename);
const db: any = {};

const sequelize = new Sequelize(
  process.env.DB_NAME || '',
  process.env.DB_USER || '',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false,
    define: {
      timestamps: false
    },
    pool: {
      max: 9,
      min: 0,
      idle: 120000
    }
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('DB connected');
  })
  .catch((err) => {
    console.log(err);
  });

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.ts'
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
