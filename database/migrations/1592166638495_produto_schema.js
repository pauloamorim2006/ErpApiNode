'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProdutoSchema extends Schema {
  up () {
    this.create('produtos', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nome').notNullable()
      table.decimal('estoque', 15, 4).notNullable()
      table.decimal('valor', 15, 2).notNullable()
      table
        .integer('unidade_id')
        .unsigned()
        .references('id')
        .inTable('unidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.boolean('ativo').notNullable()
      table.boolean('permite_fracionar')
      table.string('gtin')
      table.string('ncm')
      table.integer('cfop')
      table.integer('origem')
      table.string('cst')
      table.decimal('aliquota_credito_sn', 15, 4)
      table.decimal('aliquota_icms', 15, 4)
      table.string('cst_pis')
      table.decimal('aliquota_pis', 15, 4)
      table.string('cst_cofins')
      table.decimal('aliquota_cofins', 15, 4)
      table.string('cest')
      table.string('codigo_interno')
      table.integer('cenq_ipi')
      table.string('cst_ipi')
      table.decimal('aliquota_ipi', 15, 4)
      table.decimal('aliquota_icms_st', 15, 4)
      table.decimal('aliquota_mvast', 15, 4)
      table.decimal('aliquota_red_bc_st', 15, 4)
      table.timestamps()
    })
  }

  down () {
    this.drop('produtos')
  }
}

module.exports = ProdutoSchema
