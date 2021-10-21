"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecificationsCars1633577675799 = void 0;

var _typeorm = require("typeorm");

class CreateSpecificationsCars1633577675799 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'specifications_cars',
      columns: [{
        name: 'car_id',
        type: 'uuid'
      }, {
        name: 'specification_id',
        type: 'uuid'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'FKCarsSpecifications',
        referencedTableName: 'cars',
        referencedColumnNames: ['id'],
        columnNames: ['car_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }, {
        name: 'FKSpecificationsCars',
        referencedTableName: 'specifications',
        referencedColumnNames: ['id'],
        columnNames: ['specification_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationsCars');
    await queryRunner.dropForeignKey('specifications_cars', 'FKCarsSpecifications');
    await queryRunner.dropTable('specifications_cars');
  }

}

exports.CreateSpecificationsCars1633577675799 = CreateSpecificationsCars1633577675799;