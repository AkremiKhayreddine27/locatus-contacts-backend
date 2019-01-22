"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Contact extends Model {
  static get table() {
    return "Contact";
  }

  groups() {
    return this.belongsToMany(
      "App/Models/Group",
      "contactId",
      "groupId"
    ).pivotTable("ContactGroup");
  }

  activities() {
    return this.belongsToMany(
      "App/Models/Activity",
      "contactId",
      "activityId"
    ).pivotTable("ContactActivity");
  }
}

module.exports = Contact;
