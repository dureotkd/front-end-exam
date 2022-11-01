const Core = require("../core");

class UserModel extends Core {
  constructor(props) {
    super(props);
    this.core = new Core();
  }

  getRow() {
    const sql = "SELECT * FROM code_exam.`user`";

    const res = this.core.excute({
      database: "code_exam",
      sql: sql,
      type: "row",
    });

    return res;
  }

  getRowByPk(seq) {
    const sql = `SELECT * FROM code_exam.user WHERE seq = ${seq}`;

    const res = this.core.excute({
      database: "code_exam",
      sql: sql,
      type: "row",
    });

    return res;
  }

  getAll() {
    const sql = "SELECT * FROM code_exam.`user`";

    const res = this.core.excute({
      database: "code_exam",
      sql: sql,
      type: "all",
    });

    return res;
  }
}

const UserModel = new UserModel();

module.exports = champModel;
