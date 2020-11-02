/// <reference types="cypress" />

import { iniciarSesion } from '../../utils'

describe('Regresion: Consultar tramite', () => {

    beforeEach(() => {
        iniciarSesion()
        irAConsulta()
    })

    it('GDE-143: Verificar consulta de tramites válida', () => {
        cy.contains('h2', 'Consultá Trámites').should('exist')
    })
})

function irAConsulta() {
    cy.get('a[routerlink="expedientes"]').click()
}
