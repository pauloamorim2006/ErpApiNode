'use strict'

const Transportadora = use('App/Models/Transportadora')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with transportadoras
 */
class TransportadoraController {
  /**
   * Show a list of all transportadoras.
   * GET transportadoras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const transportadoras = await Transportadora.query()
      .with('user')
      .with('cidade')
      .fetch()

    return transportadoras
  }  

  /**
   * Create/save a new transportadora.
   * POST transportadoras
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {      
      const data = request.only([
        'nome', 'cnpj_cpf_di', 'endereco', 'numero', 'bairro',
        'cidade_id', 'ativo', 'tipo_pessoa', 'tipo_inscricao_estadual',
        'cep', 'telefone', 'complemento', 'email', 'inscricao_estadual'])                 

      const transportadora = await Transportadora.create({...data, user_id: auth.user.id})      

      return transportadora
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir a transportadora'} })
    }
  }

  /**
   * Display a single transportadora.
   * GET transportadoras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const transportadora = await Transportadora.findOrFail(params.id)

      await transportadora.load('user')
      await transportadora.load('cidade')

      return transportadora
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível encontrar a transportadora.`} })
    }
  }  

  /**
   * Update transportadora details.
   * PUT or PATCH transportadoras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const transportadora = await Transportadora.findOrFail(params.id)
      const data = request.only([
        'nome', 'cnpj_cpf_di', 'endereco', 'numero', 'bairro',
        'cidade_id', 'ativo', 'tipo_pessoa', 'tipo_inscricao_estadual',
        'cep', 'telefone', 'complemento', 'email', 'inscricao_estadual'])

      transportadora.merge(data)

      await transportadora.save()

      return transportadora
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar a transportadora`} })
    }
  }

  /**
   * Delete a transportadora with id.
   * DELETE transportadoras/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const transportadora = await Transportadora.findOrFail(params.id)

      await transportadora.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar a transportadora'} })
    }
  }
}

module.exports = TransportadoraController
