'use strict'

const Cliente = use('App/Models/Cliente')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with clientes
 */
class ClienteController {
  /**
   * Show a list of all clientes.
   * GET clientes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const clientes = await Cliente.query()
      .with('user')
      .with('cidade')
      .fetch()

    return clientes
  }  

  /**
   * Create/save a new cliente.
   * POST clientes
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

      const cliente = await Cliente.create({...data, user_id: auth.user.id})      

      return cliente
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir o cliente'} })
    }
  }

  /**
   * Display a single cliente.
   * GET clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const cliente = await Cliente.findOrFail(params.id)

      await cliente.load('user')
      await cliente.load('cidade')

      return cliente
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível encontrar o cliente.`} })
    }
  }  

  /**
   * Update cliente details.
   * PUT or PATCH clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const cliente = await Cliente.findOrFail(params.id)
      const data = request.only([
        'nome', 'cnpj_cpf_di', 'endereco', 'numero', 'bairro',
        'cidade_id', 'ativo', 'tipo_pessoa', 'tipo_inscricao_estadual',
        'cep', 'telefone', 'complemento', 'email', 'inscricao_estadual'])

        cliente.merge(data)

      await cliente.save()

      return cliente
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar o cliente`} })
    }
  }

  /**
   * Delete a cliente with id.
   * DELETE clientes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const cliente = await Cliente.findOrFail(params.id)

      await cliente.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar o cliente'} })
    }
  }
}

module.exports = ClienteController
