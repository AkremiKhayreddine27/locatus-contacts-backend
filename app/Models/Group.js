"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Group extends Model {
  static get table() {
    return "Group";
  }

  contacts() {
    return this.belongsToMany(
      "App/Models/Contact",
      "groupId",
      "contactId"
    ).pivotTable("ContactGroup");
  }
}

module.exports = Group;
