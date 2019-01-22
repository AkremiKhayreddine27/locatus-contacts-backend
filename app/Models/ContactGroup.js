"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ContactGroup extends Model {
  static get table() {
    return "contact_group";
  }
}

module.exports = ContactGroup;
