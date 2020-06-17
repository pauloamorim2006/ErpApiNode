'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword')
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

Route.group(() => {
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.store'],
          ['Project']
        ],
        [
          ['projects.update'],
          ['Project']
        ]
      ]
    ))
  Route.resource('projects.tasks', 'TaskController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['projects.tasks.store'],
          ['Task']
        ],
        [
          ['projects.tasks.update'],
          ['Task']
        ]
      ]
    ))

  Route.resource('unidades', 'UnidadeController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['unidades.store'],
          ['Unidade']
        ],
        [
          ['unidades.update'],
          ['Unidade']
        ]
      ]
    ))

  Route.resource('produtos', 'ProdutoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['produtos.store'],
          ['Produto']
        ],
        [
          ['produtos.update'],
          ['Produto']
        ]
      ]
    ))

  Route.resource('carros', 'CarroController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['carros.store'],
          ['Carro']
        ],
        [
          ['carros.update'],
          ['Carro']
        ]
      ]
    ))

  Route.resource('cidades', 'CidadeController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['cidades.store'],
          ['Cidade']
        ],
        [
          ['cidades.update'],
          ['Cidade']
        ]
      ]
    ))

  Route.resource('clientes', 'ClienteController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['clientes.store'],
          ['Cliente']
        ],
        [
          ['clientes.update'],
          ['Cliente']
        ]
      ]
    ))

  Route.resource('transportadoras', 'TransportadoraController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['transportadoras.store'],
          ['Transportadora']
        ],
        [
          ['transportadoras.update'],
          ['Transportadora']
        ]
      ]
    ))

  Route.resource('condicoes-pagamento', 'CondicaoPagamentoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['condicoes-pagamento.store'],
          ['CondicaoPagamento']
        ],
        [
          ['condicoes-pagamento.update'],
          ['CondicaoPagamento']
        ]
      ]
    ))

  Route.resource('formas-pagamento', 'FormaPagamentoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['formas-pagamento.store'],
          ['FormaPagamento']
        ],
        [
          ['formas-pagamento.update'],
          ['FormaPagamento']
        ]
      ]
    ))

  Route.resource('pedidos', 'PedidoController')
    .apiOnly()
    .validator(new Map(
      [
        [
          ['pedido.store'],
          ['pedido']
        ],
        [
          ['pedido.update'],
          ['pedido']
        ]
      ]
    ))
}).middleware(['auth'])

