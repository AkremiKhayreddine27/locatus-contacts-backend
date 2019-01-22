"use strict";

/*
|--------------------------------------------------------------------------
| ActivitySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Activity = use("App/Models/Activity");
const ContactActivity = use("App/Models/ContactActivity");
const faker = require("faker");

class ActivitySeeder {
  static async run() {
    await Activity.createMany(activities);
    await ContactActivity.createMany(generate());
  }
}

const activities = [
  {
    id: 1,
    display: "Maintenances",
    level: 1,
    parentId: null
  },
  {
    id: 2,
    display: "Assurance",
    level: 1,
    parentId: null
  },
  {
    id: 3,
    display: "Impots & Taxes",
    level: 2,
    parentId: null
  },
  {
    id: 4,
    display: "Plomberie",
    level: 2,
    parentId: 1
  },
  {
    id: 5,
    display: "Electroménager",
    level: 2,
    parentId: 1
  },
  {
    id: 6,
    display: "Electricité",
    level: 2,
    parentId: 1
  },
  {
    id: 7,
    display: "Serrurie",
    level: 2,
    parentId: 1
  },
  {
    id: 8,
    display: "Chauffage",
    level: 2,
    parentId: 1
  },
  {
    id: 9,
    display: "Climatisation",
    level: 2,
    parentId: 1
  },
  {
    id: 10,
    display: "Habitation",
    level: 2,
    parentId: 2
  },
  {
    id: 11,
    display: "Crédit",
    level: 2,
    parentId: 2
  },
  {
    id: 12,
    display: "Autre",
    level: 2,
    parentId: 2
  },
  {
    id: 13,
    display: "Impôt sur le revenu",
    level: 2,
    parentId: 3
  },
  {
    id: 14,
    display: "Taxe Habitation",
    level: 2,
    parentId: 3
  },
  {
    id: 15,
    display: "Taxe Foncière",
    level: 2,
    parentId: 3
  }
];

function generate() {
  const data = [];
  for (let i = 1; i <= 50; i++) {
    data.push({
      activity_id: faker.random.arrayElement(
        activities
          .filter(activity => activity.id > 3)
          .map(activity => activity.id)
      ),
      contact_id: i
    });
  }
  return data;
}

module.exports = ActivitySeeder;
