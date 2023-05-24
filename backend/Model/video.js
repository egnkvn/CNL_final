import db from "../db.js";

const Model = {
  getAllSubject: async (next) => {
    const promiseDB = db.promise();
    const result = await promiseDB.query(
      "SELECT DISTINCT subject FROM video ORDER BY subject"
    );
    const subject = [];
    await result[0].map((item) => {
      subject.push(item.subject);
    });
    return subject;
  },
  getSearchResult: async (keyword, subject, next) => {
    keyword = "%" + keyword + "%";
    const promiseDB = db.promise();
    if (subject === undefined) {
      const result = await promiseDB.query(
        "SELECT * FROM video WHERE title LIKE ?",
        [keyword]
      );
      return result[0];
    } else {
      const result = await promiseDB.query(
        "SELECT * FROM video WHERE title LIKE ? AND subject = ?",
        [keyword, subject]
      );
      return result[0];
    }
  },
  getCategoryResult: async (subject, next) => {
    const promiseDB = db.promise();
    const result = await promiseDB.query(
      "SELECT * FROM video WHERE subject = ?",
      [subject]
    );
    return result[0];
  },
};

export { Model };
