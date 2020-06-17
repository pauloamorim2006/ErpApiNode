'use strict'

const Cidade = use('App/Models/Cidade')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with cidades
 */
class CidadeController {
  /**
   * Show a list of all cidades.
   * GET cidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const cidades = await Cidade.query()
      .fetch()

    return cidades
  }  

  /**
   * Create/save a new cidade.
   * POST cidades
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const data = request.only(['codigo_ibge', 'descricao', 'uf'])

      const cidade = await Cidade.create(data)      

      return cidade
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir a cidade'} })
    }
  }

  /**
   * Display a single cidade.
   * GET cidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const cidade = await Cidade.findOrFail(params.id)

      return cidade
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível encontrar a cidade'} })
    }
  }  

  /**
   * Update cidade details.
   * PUT or PATCH cidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const cidade = await Cidade.findOrFail(params.id)
      const data = request.only(['codigo_ibge', 'descricao', 'uf'])

      cidade.merge(data)

      await cidade.save()

      return cidade
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar a cidade`} })
    }
  }

  /**
   * Delete a cidade with id.
   * DELETE cidades/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const cidade = await Cidade.findOrFail(params.id)

      await cidade.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar a cidade'} })
    }
  }
}

module.exports = CidadeController
