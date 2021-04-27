import { logoutSafe } from "../../utils"

const cuit_usuario2 = Cypress.env('cuit_usuario_2')
const password_usuario2 = Cypress.env('password_usuario_2')

describe('Regresion: login', () => {

    beforeEach(() => {
        logoutSafe()
    })

    it('GDE-203:Verificar login invalido con AFIP', () => {
        cy.visit('/tramitesadistancia/nuevo-tramite')

        cy.get('input[id="F1:username"]').type(cuit_usuario2)
        cy.get('input[id="F1:btnSiguiente"]').click()

        cy.get('input[id="F1:password"]').type(password_usuario2)
        cy.get('input[id="F1:btnIngresar"]').click()

        cy.get('span[id="F1:msg"]').contains("Clave o usuario incorrecto")
    })
})

