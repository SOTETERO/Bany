import mysql from "mysql2";

export const database = mysql.createConnection({
  host: "172.30.1.62",
  user: "tero",
  password: "helloworld123",
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
