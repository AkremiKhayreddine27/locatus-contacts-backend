"use strict";

/*
|--------------------------------------------------------------------------
| GroupSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const Group = use("App/Models/Group");
const ContactGroup = use("App/Models/ContactGroup");
const faker = require("faker");

class GroupSeeder {
  static async run() {
    await Group.createMany(groups);
    await ContactGroup.createMany(generate());
  }
}

const groups = [
  { id: 1, display: "Clients", level: 1, parentId: null },
  { id: 2, display: "Fournisseurs", level: 1, parentId: null },
  { id: 3, display: "Collaborateurs", level: 1, parentId: null },
  { id: 4, display: "Propriétaires", level: 1, parentId: null },
  { id: 5, display: "Autres", level: 1, parentId: null }
];

function generate() {
  const data = [];
  for (let i = 1; i < 50; i++) {
    data.push({
      group_id: faker.random.arrayElement(groups.map(group => group.id)),
      contact_id: i
    });
  }
  return data;
}

module.exports = GroupSeeder;
