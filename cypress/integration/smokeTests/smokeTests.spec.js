/// <reference types="cypress" />

import { iniciarSesion } from '../utils'

describe('Smoke Tests', () => {

    describe('Al intentar entrar a Inicio Publico', () => {

        beforeEach(() => {
            cy.visit('/tramitesadistancia/inicio-publico')
        })

        it('Carga correctamente', () => {
            cy.get('img[src="images/tramitesadistancia_logo.svg"]').should('exist')
        })

        it('Si haces click en el panel de ayuda te redirige a la url de ayuda', () => {

            cy.visit('/tramitesadistancia/inicio-publico', {
                onBeforeLoad(win) {
                    cy.stub(win, 'open')
                }
            })

            cy.get('a').contains('Ayuda').click()

            cy.window().its('open').should('be.calledWith', 'https://tramitesadistancia.gob.ar/ayuda.html')
        })

    })

    describe('Al intentar entrar a Nuevo Tramite dandote de alta', () => {

        beforeEach(() => {
            iniciarSesion()
        })

        it('Carga correctamente', () => {
            cy.get('img[src="images/tramitesadistancia_logo.svg"]').should('exist')
        })

    })
})
