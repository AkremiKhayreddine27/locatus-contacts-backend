"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Contact extends Model {
  static boot() {
    super.boot();

    /**
     * A hook to parse json arrays before saving
     * it to the database.
     */
    this.addHook("beforeSave", async contactInstance => {
      if (contactInstance.emails) {
        contactInstance.emails = JSON.stringify(contactInstance.emails);
      }
      if (contactInstance.roles) {
        contactInstance.roles = JSON.stringify(contactInstance.roles);
      }
      if (contactInstance.rate) {
        contactInstance.rate = JSON.stringify(contactInstance.rate);
      }
      if (contactInstance.phoneNumbers) {
        contactInstance.phoneNumbers = JSON.stringify(
          contactInstance.phoneNumbers
        );
      }
      if (contactInstance.addresses) {
        contactInstance.addresses = JSON.stringify(contactInstance.addresses);
      }
    });
  }

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
