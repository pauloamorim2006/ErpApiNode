'use strict'

const Unidade = use('App/Models/Unidade')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with unidades
 */
class UnidadeController {
  /**
   * Show a list of all unidades.
   * GET unidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {

    const unidades = await Unidade.query()
      .with('user')
      .fetch()

    return unidades
  }  

  /**
   * Create/save a new unidade.
   * POST unidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only(['descricao', 'sigla'])

      const unidade = await Unidade.create({...data, user_id: auth.user.id})      

      return unidade
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir a unidade'} })
    }
  }

  /**
   * Display a single unidade.
   * GET unidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const unidade = await Unidade.findOrFail(params.id)

      await unidade.load('user')

      return unidade
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível encontrar a unidade'} })
    }
  }  

  /**
   * Update unidade details.
   * PUT or PATCH unidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const unidade = await Unidade.findOrFail(params.id)
      const data = request.only(['descricao', 'sigla'])

      unidade.merge(data)

      await unidade.save()

      return unidade
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar a unidade`} })
    }
  }

  /**
   * Delete a unidade with id.
   * DELETE unidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const unidade = await Unidade.findOrFail(params.id)

      await unidade.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar a unidade'} })
    }
  }
}

module.exports = UnidadeController
