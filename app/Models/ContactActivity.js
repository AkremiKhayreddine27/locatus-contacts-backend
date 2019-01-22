"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class ContactActivity extends Model {
  static get table() {
    return "contact_activity";
  }
}

module.exports = ContactActivity;
