import mysql from "mysql2";

export const database = mysql.createConnection({
  host: "localhost",
  user: "tero",
  password: "Chlxogh12!",
  database: "bany",
});

database.connect();

export const QuaryDatabaes = (query) => {
  return new Promise((resolve, reject) => {
    database.query(query, (error, rows, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve(rows);
      }
    });
  });
};
