/// <reference types="cypress" />

const cuit_usuario1 = Cypress.env('cuit_usuario_1')
const password_usuario1 = Cypress.env('password_usuario_1')


// TODO: Corregir cuando haya un parche
// Normalmente haces beforeEach login y afterEach logout, pero
// por un issue con Cypress (https://github.com/cypress-io/cypress/issues/2831)
// no podes hacer cy.click en el afterEach si un test te rompe.
// Para preservar la unicidad de los tests pongo codigo condicional en beforeEach.
// Si detecta una sesion abierta la cierra y abre otra
const tiempo_espera_prudencial = 500 //en milisegundos

export function iniciarSesion() {
    cy.visit('/tramitesadistancia/nuevo-tramite')

    cy.wait(tiempo_espera_prudencial)
    cy.url().then(url => {
        if (url.includes('/tramitesadistancia/nuevo-tramite')) {
            logout()
        }
    })

    login()
}

function logout() {
    cy.visit('/tramitesadistancia/nuevo-tramite')
    cy.get('a[data-toggle="dropdown"]').click()
    cy.get('a[href="/tramitesadistancia/logout;action=logout"]').click()
}

export function login() {
    cy.visit('/tramitesadistancia/nuevo-tramite')

    //TODO: Mejorar esta busqueda
    cy.get('input[id="F1:username"]').type(cuit_usuario1)
    cy.get('input[id="F1:btnSiguiente"]').click()

    cy.get('input[id="F1:password"]').type(password_usuario1)
    cy.get('input[id="F1:btnIngresar"]').click()
}



