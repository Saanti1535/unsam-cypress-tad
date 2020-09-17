/// <reference types="cypress" />

import { iniciarSesion } from '../../utils'

describe('DMM-43411: Campo departamento debe tener un máximo de 3 caracteres JSCR', () => {

    beforeEach(() => {
        iniciarSesion()
        irAMisDatos()
    })

    it('GDE-5: Verificar que NO sea obligatorio el campo departamento en edición', () => {

        cy.get('input[name="depto"]').clear()

        //TODO: Mejorar estas busquedas
        cy.get('button[type="submit"]').contains('Editar Datos').click()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

    })

    it('GDE-7: Verificar que se permita ingresar 3 caracteres en el campo departamento en edición', () => {

        cy.get('input[name="depto"]').clear()
        cy.get('input[name="depto"]').type('12C')

        //TODO: Mejorar estas busquedas
        cy.get('button[type="submit"]').contains('Editar Datos').click()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

    })

    it('GDE-8: Verificar que se permita ingresar menos de 3 caracteres en el campo departamento en edición', () => {

        cy.get('input[name="depto"]').clear()
        cy.get('input[name="depto"]').type('2A')

        //TODO: Mejorar estas busquedas
        cy.get('button[type="submit"]').contains('Editar Datos').click()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

    })

    it('GDE-9: Verificar que no se permita ingresar más de 3 caracteres en el campo departamento en edición', () => {

        cy.get('input[name="depto"]').clear()
        cy.get('input[name="depto"]').type('12AC')

        
        cy.get('input[name="depto"]').should('have.value', '12A')

    })


    function irAMisDatos() {
        cy.get('a[data-toggle="dropdown"]').click()
        cy.get('a[href="/tramitesadistancia/misdatos"]').click()
    }

})
