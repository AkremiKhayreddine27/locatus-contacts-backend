"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
/*
Factory.blueprint("App/Models/User", faker => {
  return {
    username: faker.username()
  };
});
*/

Factory.blueprint("App/Models/Contact", async faker => {
  let userType = "Particulier";
  let visibility = userType === "Entreprise" ? "public" : "private";
  const name = {
    familyName: faker.first(),
    givenName: faker.last()
  };
  const contactRates = [
    {
      rate: {
        id: 1,
        display: "Prix",
        parent: { id: 1, display: "Réalisations" }
      },
      value: 3,
      votes: [{ contactId: 1, value: 3 }, { contactId: 2, value: 3 }]
    },
    {
      rate: {
        id: 2,
        display: "Qualité",
        parent: { id: 1, display: "Réalisations" }
      },
      value: 3,
      votes: [{ contactId: 1, value: 3 }, { contactId: 2, value: 3 }]
    },
    {
      rate: {
        id: 3,
        display: "Délais",
        parent: { id: 1, display: "Réalisations" }
      },
      value: 3,
      votes: [{ contactId: 1, value: 3 }, { contactId: 2, value: 3 }]
    },
    {
      rate: {
        id: 4,
        display: "Analyse",
        parent: { id: 2, display: "Entreprise" }
      },
      value: 2,
      votes: [{ contactId: 1, value: 2 }, { contactId: 2, value: 2 }]
    },
    {
      rate: {
        id: 5,
        display: "Conseils",
        parent: { id: 2, display: "Entreprise" }
      },
      value: 2,
      votes: [{ contactId: 1, value: 2 }, { contactId: 2, value: 2 }]
    },
    {
      rate: {
        id: 6,
        display: "Engagements",
        parent: { id: 2, display: "Entreprise" }
      },
      value: 2,
      votes: [{ contactId: 1, value: 2 }, { contactId: 2, value: 2 }]
    },
    {
      rate: {
        id: 7,
        display: "Relation client",
        parent: { id: 2, display: "Entreprise" }
      },
      value: 2,
      votes: [{ contactId: 1, value: 2 }, { contactId: 2, value: 2 }]
    }
  ];

  return {
    externalId: null,
    userName: faker.username(),
    title: "",
    name: name,
    userType: userType,
    company_id: faker.pickone([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
    job: "Job",
    phoneNumbers: [
      {
        code: {
          phoneCode: "216",
          countryCode: "TN"
        },
        value: faker.phone(),
        type: "work",
        primary: true
      }
    ],
    emails: [
      {
        value: faker.email(),
        type: "work",
        primary: true
      }
    ],
    addresses: [
      {
        country: faker.country(),
        address: faker.address(),
        postalCode: faker.postcode(),
        city: faker.city(),
        postalBox: faker.postcode(),
        type: "home",
        primary: true
      }
    ],
    webSite: "",
    photo: "",
    rate: contactRates,
    followed: faker.pickone([1, 0]),
    active: faker.pickone([1, 0]),
    visibility: visibility
  };
});
