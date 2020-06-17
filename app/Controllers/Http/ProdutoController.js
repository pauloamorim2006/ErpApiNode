'use strict'

const Produto = use('App/Models/Produto')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with produtos
 */
class ProdutoController {
  /**
   * Show a list of all produtos.
   * GET produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    const produtos = await Produto.query()
      .with('user')
      .with('unidade')
      .fetch()

    return produtos
  }

  /**
   * Create/save a new produto.
   * POST produtos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      const data = request.only([
        'nome', 'estoque', 'valor', 'unidade_id', 'ativo',
        'permite_fracionar', 'gtin', 'ncm', 'cfop', 'origem',
        'cst', 'aliquota_credito_sn', 'aliquota_icms', 'cst_pis',
        'aliquota_pis', 'cst_cofins', 'aliquota_cofins', 'cest',
        'codigo_interno', 'cenq_ipi', 'cst_ipi', 'aliquota_ipi',
        'aliquota_icms_st', 'aliquota_mvast', 'aliquota_red_bc_st'])

      const produto = await Produto.create({...data, user_id: auth.user.id})      

      return produto
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível incluir o produto'} })
    }
  }

  /**
   * Display a single produto.
   * GET produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    try {
      const produto = await Produto.findOrFail(params.id)

      await produto.load('user')
      await produto.load('unidade')

      return produto
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível encontrar o produto. Motivo: ${err.message}`} })
    }
  }  

  /**
   * Update produto details.
   * PUT or PATCH produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    try {
      const produto = await Produto.findOrFail(params.id)
      const data = request.only([
        'nome', 'estoque', 'valor', 'unidade_id', 'ativo',
        'permite_fracionar', 'gtin', 'ncm', 'cfop', 'origem',
        'cst', 'aliquota_credito_sn', 'aliquota_icms', 'cst_pis',
        'aliquota_pis', 'cst_cofins', 'aliquota_cofins', 'cest',
        'codigo_interno', 'cenq_ipi', 'cst_ipi', 'aliquota_ipi',
        'aliquota_icms_st', 'aliquota_mvast', 'aliquota_red_bc_st'])

      produto.merge(data)

      await produto.save()

      return produto
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: `Não foi possível atualizar o produto`} })
    }
  }

  /**
   * Delete a produto with id.
   * DELETE produtos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    try {
      const produto = await Produto.findOrFail(params.id)

      await produto.delete()
    } catch(err) {
      return response
        .status(err.status)
        .send({ error: { message: 'Não foi possível deletar o produto'} })
    }
  }
}

module.exports = ProdutoController
