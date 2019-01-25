"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ContactSchema extends Schema {
  up() {
    this.create("contacts", table => {
      table.increments();
      table.json("name");
      table
        .integer("company_id")
        .references("id")
        .inTable("contacts")
        .onDelete('SET NULL')
        .nullable();
      table.integer("externalId");
      table.string("description").nullable();
      table.json("roles").nullable();
      table.boolean("followed");
      table.string("job");
      table.string("photo");
      table.string("title");
      table.string("userName");
      table.string("userType");
      table.string("visibility");
      table.string("webSite");
      table.json("rate");
      table.json("phoneNumbers");
      table.json("emails");
      table.json("addresses");
      table.boolean("active");
      table.date("createdAt");
      table.date("lastModified");
    });
  }

  down() {
    this.drop("contacts");
  }
}

module.exports = ContactSchema;
