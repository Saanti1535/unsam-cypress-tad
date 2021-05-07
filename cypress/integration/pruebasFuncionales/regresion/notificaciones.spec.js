/// <reference types="cypress" />

import { iniciarSesion,  cuit_usuario1} from '../../utils'

describe('Regresion: Notificaciones', () => {
    beforeEach(() => {
        //FIXME: esta linea hace falta para que no se rompa el login
        cy.visit('/tramitesadistancia/nuevo-tramite')
        iniciarSesion()
        irANotificaciones()
    })
    it('GDE-192: Verificar que se pueda filtrar por nombre de tramite la solapa de notificaciones', () => {
        escribirEnElCampoDeBusqueda('Poder Revocado')
        cy.get('td:contains("Poder Revocado")').should('have.length',2)

    });

    it('GDE-193:Verificar que se pueda filtrar por numero de tramite en la solapa notificaciones', () => {
        escribirEnElCampoDeBusqueda('EX-2020-00271560-   -APN-DA#IGJ')
        cy.get('td:contains("EX-2020-00271560-   -APN-DA#IGJ")').should('have.length',1)

    });
});

function irANotificaciones() {
    cy.get('a[routerlink="notificaciones"]').click()
}

function escribirEnElCampoDeBusqueda(texto){
    cy.get('input[class="input-sm form-control "]').type(texto)
}