/// <reference types="cypress" />

import { iniciarSesion } from '../../utils'

describe('DMM-43408: Campo piso debe tener un máximo de 3 caracteres JSCR', () => {

    beforeEach(() => {
        iniciarSesion()
        irAMisDatos()
    })

    it('GDE-22: Verificar que el campo piso no sea obligatorio en edición', () => {

        cy.get('input[name="piso"]').clear()

        //TODO: Mejorar estas busquedas
        cy.get('button[type="submit"]').contains('Editar Datos').click()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

    })

    it('GDE-23: Verificar que se permita ingresar 3 caracteres en el campo piso en edición', () => {

        cy.get('input[name="piso"]').clear()
        cy.get('input[name="piso"]').type('12C')

        //TODO: Mejorar estas busquedas
        cy.get('button[type="submit"]').contains('Editar Datos').click()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

    })

    it('GDE-24: Verificar que se permita ingresar menos de 3 caracteres en el campo piso en edición', () => {

        cy.get('input[name="piso"]').clear()
        cy.get('input[name="piso"]').type('2A')

        //TODO: Mejorar estas busquedas
        cy.get('button[type="submit"]').contains('Editar Datos').click()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

    })

    it('GDE-25: Verificar que no se permita ingresar más de 3 caracteres en el campo piso en edición', () => {

        cy.get('input[name="piso"]').clear()
        cy.get('input[name="piso"]').type('12AC')

        
        cy.get('input[name="piso"]').should('have.value', '12A')

    })


    function irAMisDatos() {
        cy.get('a[data-toggle="dropdown"]').click()
        cy.get('a[href="/tramitesadistancia/misdatos"]').click()
    }

})
