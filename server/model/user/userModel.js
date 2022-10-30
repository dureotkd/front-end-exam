const Core = require("../core");

class UserModel extends Core {
  constructor(props) {
    super(props);

    this.table = "champs";
    this.core = new Core();
  }

  getData() {}

  getRow() {}

  getRowByPk(seq) {}

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

const champModel = new ChampModel();

module.exports = champModel;
