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
      contactInstance.emails = JSON.stringify(contactInstance.emails);
      contactInstance.roles = JSON.stringify(contactInstance.roles);
      contactInstance.rate = JSON.stringify(contactInstance.rate);
      contactInstance.phoneNumbers = JSON.stringify(
        contactInstance.phoneNumbers
      );
      contactInstance.addresses = JSON.stringify(contactInstance.addresses);
    });

    this.addHook("beforeUpdate", async contactInstance => {
      if (contactInstance.dirty.emails) {
        contactInstance.emails = JSON.stringify(contactInstance.emails);
      }
      if (contactInstance.dirty.roles) {
        contactInstance.roles = JSON.stringify(contactInstance.roles);
      }
      if (contactInstance.dirty.rate) {
        contactInstance.rate = JSON.stringify(contactInstance.rate);
      }
      if (contactInstance.dirty.phoneNumbers) {
        contactInstance.phoneNumbers = JSON.stringify(
          contactInstance.phoneNumbers
        );
      }
      if (contactInstance.dirty.addresses) {
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
