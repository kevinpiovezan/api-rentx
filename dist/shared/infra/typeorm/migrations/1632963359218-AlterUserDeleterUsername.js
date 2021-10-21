"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AlterUserDeleterUsername1632963359218 = void 0;

var _typeorm = require("typeorm");

class AlterUserDeleterUsername1632963359218 {
  async up(queryRunner) {
    await queryRunner.dropColumn('users', 'username');
  }

  async down(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'username',
      type: 'varchar'
    }));
  }

}

exports.AlterUserDeleterUsername1632963359218 = AlterUserDeleterUsername1632963359218;