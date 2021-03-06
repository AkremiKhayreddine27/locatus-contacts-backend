"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Activity = use("App/Models/Activity");
const ContactActivity = use("App/Models/ContactActivity");

/**
 * Resourceful controller for interacting with activities
 */
class ActivityController {
  /**
   * Show a list of all activities.
   * GET activities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Activity.query()
      .with("children")
      .fetch();
  }

  /**
   * Sync activity contacts
   * Detach all contacts
   * Attach new contacts
   */
  async addContacts({ params, request, response, view }) {
    const activityID = params.id;
    const { contactsIds } = request.post();
    const activity = await Activity.find(activityID);
    if (contactsIds.length === 1) {
      const relation = await ContactActivity.query()
        .where({ activity_id: activityID, contact_id: contactsIds[0] })
        .first();
      if (relation) {
        return await activity.contacts().detach(contactsIds);
      } else {
        return await activity.contacts().attach(contactsIds);
      }
    }
  }

  /**
   * Create/save a new activity.
   * POST activities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { display, level, parentId } = request.post();
    return await Activity.create({
      display,
      level,
      parentId
    });
  }

  /**
   * Display a single activity.
   * GET activities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await Activity.find(params.id);
  }

  /**
   * Update activity details.
   * PUT or PATCH activities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const changes = request.post();
    return await Activity.query()
      .where("id", params.id)
      .update(changes);
  }

  /**
   * Delete a activity with id.
   * DELETE activities/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const activity = await Activity.find(id);
    return await activity.delete();
  }
}

module.exports = ActivityController;
