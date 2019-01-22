"use strict";

/*
|--------------------------------------------------------------------------
| ContactSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('../../app/Models/Contact')} */
const Contact = use("App/Models/Contact");
/** @type {import('faker') */
const faker = require("faker");

class ContactSeeder {
  static async run() {
    await Contact.createMany(generate(50));
  }
}

function generate(nbr) {
  const contacts = [];
  const ratesX = [
    1,
    3.75,
    2,
    2.5,
    3.75,
    1.75,
    1,
    1.5,
    2,
    2.75,
    2.5,
    3,
    4,
    3.5,
    3,
    4,
    1.5,
    3.5,
    2.75,
    1.75
  ];
  const ratesY = [
    3.75,
    1.75,
    1,
    1.5,
    2,
    2.75,
    1,
    3.75,
    2,
    2.5,
    3,
    4,
    1.5,
    3.5,
    2.75,
    1.75,
    2.5,
    3,
    4,
    3.5
  ];
  for (let i = 1; i <= nbr; i++) {
    let userType = i > 20 ? "Particulier" : "Entreprise";
    let visibility = userType === "Entreprise" ? "public" : "private";
    const name = {
      familyName: i < 20 ? null : faker.name.firstName(),
      givenName: i < 20 ? faker.company.companyName() : faker.name.lastName()
    };
    const contactRates = [
      {
        rate: {
          id: 1,
          display: "Prix",
          parent: { id: 1, display: "Réalisations" }
        },
        value: ratesY[i - 1],
        votes: [
          { contactId: 1, value: ratesY[i - 1] },
          { contactId: 2, value: ratesY[i - 1] }
        ]
      },
      {
        rate: {
          id: 2,
          display: "Qualité",
          parent: { id: 1, display: "Réalisations" }
        },
        value: ratesY[i - 1],
        votes: [
          { contactId: 1, value: ratesY[i - 1] },
          { contactId: 2, value: ratesY[i - 1] }
        ]
      },
      {
        rate: {
          id: 3,
          display: "Délais",
          parent: { id: 1, display: "Réalisations" }
        },
        value: ratesY[i - 1],
        votes: [
          { contactId: 1, value: ratesY[i - 1] },
          { contactId: 2, value: ratesY[i - 1] }
        ]
      },
      {
        rate: {
          id: 4,
          display: "Analyse",
          parent: { id: 2, display: "Entreprise" }
        },
        value: ratesX[i - 1],
        votes: [
          { contactId: 1, value: ratesX[i - 1] },
          { contactId: 2, value: ratesX[i - 1] }
        ]
      },
      {
        rate: {
          id: 5,
          display: "Conseils",
          parent: { id: 2, display: "Entreprise" }
        },
        value: ratesX[i - 1],
        votes: [
          { contactId: 1, value: ratesX[i - 1] },
          { contactId: 2, value: ratesX[i - 1] }
        ]
      },
      {
        rate: {
          id: 6,
          display: "Engagements",
          parent: { id: 2, display: "Entreprise" }
        },
        value: ratesX[i - 1],
        votes: [
          { contactId: 1, value: ratesX[i - 1] },
          { contactId: 2, value: ratesX[i - 1] }
        ]
      },
      {
        rate: {
          id: 7,
          display: "Relation client",
          parent: { id: 2, display: "Entreprise" }
        },
        value: ratesX[i - 1],
        votes: [
          { contactId: 1, value: ratesX[i - 1] },
          { contactId: 2, value: ratesX[i - 1] }
        ]
      }
    ];

    let contact = {
      id: i,
      externalId: i,
      userName: faker.internet.userName(),
      title: "",
      name: name,
      userType: userType,
      company_id:
        i > 20
          ? faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
          : null,
      job: faker.name.jobTitle(),
      phoneNumbers: JSON.stringify([
        {
          code: {
            phoneCode: "216",
            countryCode: "TN"
          },
          value: faker.phone.phoneNumber(),
          type: "work",
          primary: true
        }
      ]),
      emails: JSON.stringify([
        {
          value: faker.internet.email(),
          type: "work",
          primary: true
        }
      ]),
      addresses: JSON.stringify([
        {
          country: faker.address.country(),
          address: faker.address.streetAddress(),
          postalCode: faker.address.zipCode(),
          city: faker.address.city(),
          postalBox: faker.address.secondaryAddress(),
          primary: true,
          type: "home"
        }
      ]),
      webSite: "",
      photo: "",
      rate: JSON.stringify(contactRates),
      followed: faker.random.arrayElement([1, 0]),
      active: faker.random.arrayElement([1, 0]),
      visibility: visibility
    };
    contacts.push(contact);
  }
  return contacts;
}

module.exports = ContactSeeder;
