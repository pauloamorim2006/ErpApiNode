'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TransportadoraSchema extends Schema {
  up () {
    this.create('transportadoras', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('nome').notNullable()
      table.string('cnpj_cpf_di').notNullable()
      table.string('endereco').notNullable()
      table.string('numero').notNullable()
      table.string('bairro').notNullable()      
      table
        .integer('cidade_id')
        .unsigned()
        .references('id')
        .inTable('cidades')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.boolean('ativo').notNullable()
      table.string('tipo_pessoa').notNullable()
      table.integer('tipo_inscricao_estadual').notNullable()
      table.string('cep')
      table.string('telefone')
      table.string('complemento')
      table.string('email')
      table.string('inscricao_estadual')
      table.timestamps()
    })
  }

  down () {
    this.drop('transportadoras')
  }
}

module.exports = TransportadoraSchema
