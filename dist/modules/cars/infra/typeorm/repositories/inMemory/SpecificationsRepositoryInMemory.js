"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationsRepositoryInMemory = void 0;

var _Specification = require("../../entities/Specification");

class SpecificationsRepositoryInMemory {
  constructor() {
    this.specifications = [];
  }

  async findByIds(ids) {
    const allSpecifications = this.specifications.filter(specification => ids.includes(specification.id));
    return allSpecifications;
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      name,
      description
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    const specification = this.specifications.find(specification => specification.name === name);
    return specification;
  }

  async list() {
    const all = this.specifications;
    return all;
  }

}

exports.SpecificationsRepositoryInMemory = SpecificationsRepositoryInMemory;