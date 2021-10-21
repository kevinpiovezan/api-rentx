"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUsers1632898883097 = void 0;

var _typeorm = require("typeorm");

class CreateUsers1632898883097 {
  async up(queryRunner) {
    queryRunner.createTable(new _typeorm.Table({
      name: 'users',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'username',
        type: 'varchar',
        isUnique: true
      }, {
        name: 'password',
        type: 'varchar'
      }, {
        name: 'email',
        type: 'varchar'
      }, {
        name: 'driver_license',
        type: 'varchar'
      }, {
        name: 'isAdmin',
        type: 'boolean',
        default: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    queryRunner.dropTable('users');
  }

}

exports.CreateUsers1632898883097 = CreateUsers1632898883097;