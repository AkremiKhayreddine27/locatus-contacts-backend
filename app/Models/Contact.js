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
    this.addHook("beforeSave", async contact => {
      stringifyJsonData(contact);
    });

    /**
     * A hook to parse json arrays before saving
     * it to the database.
     */
    this.addHook("afterFetch", async contacts => {
      contacts.map(contact => {
        parseJsonData(contact);
      });
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

function convertDates(contact) {
  if (contact.createdAt) {
    contact.createdAt = new Date(contact.createdAt);
  }
  if (contact.lastModified) {
    contact.lastModified = new Date(contact.lastModified);
  }
}

function parseJsonData(contact) {
  try {
    if (contact.emails) {
      contact.emails = JSON.parse(contact.emails);
    }
    if (contact.addresses) {
      contact.addresses = JSON.parse(contact.addresses);
    }
    if (contact.rate) {
      contact.rate = JSON.parse(contact.rate);
    }
    if (contact.phoneNumbers) {
      contact.phoneNumbers = JSON.parse(contact.phoneNumbers);
    }
    if (contact.roles) {
      contact.roles = JSON.parse(contact.roles);
    }
  } catch (e) {
    //console.log(e);
  }
}

function stringifyJsonData(contact) {
  if (contact.emails) {
    contact.emails = JSON.stringify(contact.emails);
  }
  if (contact.roles) {
    contact.roles = JSON.stringify(contact.roles);
  }
  if (contact.rate) {
    contact.rate = JSON.stringify(contact.rate);
  }
  if (contact.phoneNumbers) {
    contact.phoneNumbers = JSON.stringify(contact.phoneNumbers);
  }
  if (contact.addresses) {
    contact.addresses = JSON.stringify(contact.addresses);
  }
}

module.exports = Contact;
