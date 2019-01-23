"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/** @type {import('../../Models/Group')} */
const Group = use("App/Models/Group");

/**
 * Resourceful controller for interacting with groups
 */
class GroupController {
  /**
   * Show a list of all groups.
   * GET groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    return await Group.all();
  }

  /**
   * Sync group contacts
   * Detach all contacts
   * Attach new contacts
   */
  async addContacts({ params, request, response, view }) {
    const groupId = params.id;
    const { contactsIds } = request.post();
    const group = await Group.find(groupId);
    if (contactsIds.length === 1) {
      const relation = ContactGroup.query()
        .where({ contact_id: contactsIds[0], group_id: groupId })
        .first();
      const contactGroup = ContactGroup.query()
        .where({ contact_id: contactsIds[0] })
        .firts();
      if (relation) {
        return await group.contacts().detach(contactsIds);
      } else if (contactGroup) {
        return await contactGroup.update({ group_id: groupId });
      } else {
        return await group.contacts().attach(contactsIds);
      }
    }
  }

  /**
   * Display a single group.
   * GET groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    return await Group.find(params.id);
  }

  /**
   * Create/save a new group.
   * POST groups
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    const { display, level, parentId } = request.post();
    return await Group.create({
      display,
      level,
      parentId
    });
  }

  /**
   * Update group details.
   * PUT or PATCH groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const changes = request.post();
    return await Group.query()
      .where("id", params.id)
      .update(changes);
  }

  /**
   * Delete a group with id.
   * DELETE groups/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const { id } = params;
    const group = await Group.find(id);
    return await group.delete();
  }
}

module.exports = GroupController;
