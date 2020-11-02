/// <reference types="cypress" />

import { iniciarSesion } from '../../utils'

describe('Regresion: Consultar tramite', () => {

    beforeEach(() => {
        iniciarSesion()
        irAConsulta()
    })

    it('GDE-143: Verificar consulta de tramites válida', () => {
        escribirCampoConsulta('anioBusqueda', '2020')
        escribirCampoConsulta('numeroBusqueda','00194202')
        cy.get('select[name="ecosistemas"]').select('APN')
        escribirCampoConsulta('reparticionBusqueda','SSGA#MM')

        clickEnBuscar()

        cy.contains('h4', 'EX - 2020 - 00194202 - APN - SSGA#MM').should('exist')
    })

    it('GDE-142: Verificar campo "Año" en consulta de tramites', () => {
        escribirCampoConsulta('anioBusqueda', 'test')
        escribirCampoConsulta('numeroBusqueda','00194202')
        cy.get('select[name="ecosistemas"]').select('APN')
        escribirCampoConsulta('reparticionBusqueda','SSGA#MM')

        clickEnBuscar()

        cy.contains('p', 'No existe el expediente consultado').should('exist')
    })

    it('GDE-144: Verificar obligatoriedad del campo "Año" en consulta de tramite', () => {
        limpiarCampoConsulta('anioBusqueda')
        escribirCampoConsulta('numeroBusqueda','00194202')
        cy.get('select[name="ecosistemas"]').select('APN')
        escribirCampoConsulta('reparticionBusqueda','SSGA#MM')

        clickEnBuscar()

        cy.contains('p', 'Debe completar todos los campos para realizar la consulta').should('exist')
    })

    it('GDE-145: Verificar obligatoriedad del campo "Numero" en consulta de tramites', () => {
        escribirCampoConsulta('anioBusqueda', '2020')
        limpiarCampoConsulta('numeroBusqueda')
        cy.get('select[name="ecosistemas"]').select('APN')
        escribirCampoConsulta('reparticionBusqueda','SSGA#MM')

        clickEnBuscar()

        cy.contains('p', 'Debe completar todos los campos para realizar la consulta').should('exist')
    })

    it('GDE-146: Verificar campo "Numero" en consulta de tramites', () => {
        escribirCampoConsulta('anioBusqueda', '2020')
        escribirCampoConsulta('numeroBusqueda','test')
        cy.get('select[name="ecosistemas"]').select('APN')
        escribirCampoConsulta('reparticionBusqueda','SSGA#MM')

        clickEnBuscar()

        cy.contains('p', 'No existe el expediente consultado').should('exist')
    })

    it('GDE-147: Verificar obligatoriedad del campo "Numero" en consulta de tramites', () => {
        escribirCampoConsulta('anioBusqueda', '2020')
        escribirCampoConsulta('numeroBusqueda','00194202')
        escribirCampoConsulta('reparticionBusqueda','SSGA#MM')

        clickEnBuscar()

        cy.contains('p', 'Debe completar todos los campos para realizar la consulta').should('exist')
    })

    it('GDE-149: Verificar obligatoriedad del campo "Area" en consulta de tramites', () => {
        escribirCampoConsulta('anioBusqueda', '2020')
        escribirCampoConsulta('numeroBusqueda','00194202')
        cy.get('select[name="ecosistemas"]').select('APN')
        limpiarCampoConsulta('reparticionBusqueda')

        clickEnBuscar()

        cy.contains('p', 'Debe completar todos los campos para realizar la consulta').should('exist')
    })

    it('GDE-151: Verificar campo "Area" en consulta de tramites', () => {
        escribirCampoConsulta('anioBusqueda', '2020')
        escribirCampoConsulta('numeroBusqueda','00194202')
        cy.get('select[name="ecosistemas"]').select('APN')
        escribirCampoConsulta('reparticionBusqueda','test')

        clickEnBuscar()

        cy.contains('p', 'No existe el expediente consultado').should('exist')
    })
})


function limpiarCampoConsulta(campo) {
    cy.get(`input[name="${campo}"]`).clear()
}

function escribirCampoConsulta(campo, texto) {
    cy.get(`input[name="${campo}"]`).type(texto)
}

function clickEnBuscar() {
    cy.get('a[type="submit"]').contains('Buscar').click()
}

function irAConsulta() {
    cy.get('a[routerlink="expedientes"]').click()
}
