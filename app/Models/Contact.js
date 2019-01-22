"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Contact extends Model {
  static get createdAtColumn() {
    return "createdAt";
  }

  static get updatedAtColumn() {
    return "lastModified";
  }

  groups() {
    return this.belongsToMany("App/Models/Group");
  }

  activities() {
    return this.belongsToMany("App/Models/Activity").pivotTable(
      "contact_activity"
    );
  }
}

module.exports = Contact;
