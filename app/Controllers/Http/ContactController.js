"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @typedef {import('../../Models/Contact')} */
const Contact = use("App/Models/Contact");

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    const req = request.get();
    let query = Contact.query()
      .with("groups")
      .with("activities");
    if (req.groups) {
      query = query.whereHas(
        "groups",
        builder => {
          builder.whereIn("groups.id", req.groups.map(g => Number.parseInt(g)));
        },
        ">",
        0
      );
    }
    if (req.activities) {
      query = query.whereHas(
        "activities",
        builder => {
          builder.whereIn(
            "activities.id",
            req.activities.map(a => Number.parseInt(a))
          );
        },
        ">",
        0
      );
    }
    return await query.fetch();
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const contact = request.post();
    return await Contact.create(contact);
  }

  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await Contact.find(params.id);
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const changes = request.post();
    return await Contact.query()
      .where("id", params.id)
      .update(changes);
  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const contact = await Contact.find(id);
    return await contact.delete();
  }
}

module.exports = ContactController;
