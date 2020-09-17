/// <reference types="cypress" />

import { iniciarSesion } from '../../utils'

describe('DMM-41741: Permitir código de país telefónico distinto a la nacionalidad', () => {
    beforeEach(() => {
        iniciarSesion()
        irAMisDatos()
    })

    it('GDE-27: Verificar que se permita agregar un código de área argentino y un domicilio argentino', () => {
        limpiarCampoMisDatos('codigoPais')
        escribirCampoMisDatos('codigoPais', '+54')

        limpiarCampoMisDatos('telefono')
        escribirCampoMisDatos('telefono', '455566664')

        clickEnEditarDatos()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')
    })

    it('GDE-29: Verificar que se permita agregar un código de área extranjero y domicilio argentino', () => {
        limpiarCampoMisDatos('codigoPais')
        escribirCampoMisDatos('codigoPais', '+55')

        limpiarCampoMisDatos('telefono')
        escribirCampoMisDatos('telefono', '455566664')

        clickEnEditarDatos()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

        cy.visit('/tramitesadistancia/nuevo-tramite')
        irAMisDatos()

        limpiarCampoMisDatos('piso')
        escribirCampoMisDatos('piso', '2A')

        clickEnEditarDatos()

        cy.contains('p', 'Datos personales actualizados con éxito').should('exist')

        cy.get('input[name="codigoPais"]').should('have.value', '+55')
    })

    it('GDE-32: Verificar obligatoriedad del código de área en caso de ingresar un teléfono de contacto.', () => {
        limpiarCampoMisDatos('codigoPais')

        limpiarCampoMisDatos('telefono')
        escribirCampoMisDatos('telefono', '45556666')

        clickEnEditarDatos()

        //No es lo mas apropiado, pero cypress parece no poder acceder al modulo de zk
        cy.contains('p', 'Datos personales actualizados con éxito').should('not.exist')
    })

    it('GDE-34: Verificar que el código de área sea un código válido', () => {
        limpiarCampoMisDatos('codigoPais')
        escribirCampoMisDatos('codigoPais', 'asd')

        limpiarCampoMisDatos('telefono')
        escribirCampoMisDatos('telefono', '45556666')

        clickEnEditarDatos()

        //No es lo mas apropiado, pero cypress parece no poder acceder al modulo de zk
        cy.contains('p', 'Datos personales actualizados con éxito').should('not.exist')
    })

    it('GDE-35:Verificar longitud del campo código de área', () => {
        limpiarCampoMisDatos('telefono')
        escribirCampoMisDatos('telefono', '45556666')

        limpiarCampoMisDatos('codigoPais')
        escribirCampoMisDatos('codigoPais', '+4444')

        //No es lo mas apropiado, pero cypress parece no poder acceder al modulo de zk
        cy.contains('p', 'Datos personales actualizados con éxito').should('not.exist')

    })

    //TODO: Mejorar esta busqueda
    function clickEnEditarDatos() {
        cy.get('button[type="submit"]').contains('Editar Datos').click()

    }

    function limpiarCampoMisDatos(campo) {
        cy.get(`input[name="${campo}"]`).clear()
    }

    function escribirCampoMisDatos(campo, texto) {
        cy.get(`input[name="${campo}"]`).type(texto)
    }

    function irAMisDatos() {
        cy.get('a[data-toggle="dropdown"]').click()
        cy.get('a[href="/tramitesadistancia/misdatos"]').click()
    }

})
