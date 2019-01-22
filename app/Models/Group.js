"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Group extends Model {
  contacts() {
    return this.belongsToMany("App/Models/Contact");
  }
}

module.exports = Group;
