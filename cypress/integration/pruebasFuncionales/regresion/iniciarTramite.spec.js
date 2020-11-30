/// <reference types="cypress" />

import { iniciarSesion,  cuit_usuario1} from '../../utils'

describe('Regresion: Iniciar tramite', () => {

    beforeEach(() => {
        iniciarSesion()
        irAIniciarTramite()
    })

    it('GDE-152: Buscar tramite por nombre', () => {
        escribirEnElBuscador.type('Pedido de informes tasas o balances')
        clickEnBuscar()

        cy.contains('h3', /Se encontraron ([1-9]\d*) resultados/).should('exist')
    })

    it('GDE-153: Buscar tramite por organismo', () => {
        escribirEnElBuscador.type('Ministerio de Agroindustria')
        clickEnBuscar()
        cy.contains('h3', /Se encontraron ([1-9]\d*) resultados/).should('exist')

        cy.get('input[name="keys"]').clear()
        clickEnBuscar()
        cy.contains('li a', 'Ministerio de Agroindustria').click()
        cy.contains('h3', /Tenés ([1-9]\d*) trámites disponibles/).should('exist')
    })

    it('GDE-154: Buscar tramite por nombre y organismo', () => {
        cy.contains('li a', 'Ministerio de Agroindustria').click()
        cy.contains('li a', 'SENASA').click()
        escribirEnElBuscador('constancia de productos orgánicos')

        clickEnBuscar()

        cy.contains('h3', /Se encontró ([1-9]\d*) resultado/)
    })

    it('GDE-155: Iniciar tramite', () => {
        escribirEnElBuscador('Inscripción al Beneficio de la Ley de Promoción del Software')

        clickEnBuscar()

        cy.contains('a[type="submit"]', 'Iniciar Trámite').click()
        cy.get('a[routerlink="/misdatos"]').should('exist')
       
        cy.contains('span', 'Continuar').click()
        cy.get('a[data-toggle="collapse"').click()

        escribirCampoTramite('cuit_cuit', cuit_usuario1)
        escribirCampoTramite('txt_razon_social', 'prueba')
        escribirCampoTramite('txt_num_acto_admin', '123')
        escribirCampoTramite('date_fecha_acto_admin', '01/10/2020')
        escribirCampoTramite('date_fecha_publicacion', '31/10/2020')

        cy.contains('div', 'GUARDAR').click()

        cy.contains('span', 'Confirmar trámite').click()

        cy.contains('h3', 'El trámite está pendiente de generación')
        cy.contains('p', 'Su código esta pendiente de generación')
    })

    function irAIniciarTramite() {
        cy.get('a[routerlink="nuevo-tramite"]').click()
    }

    function clickEnBuscar() {
        cy.get('button[name="op"]').click()
    }

    function escribirEnElBuscador(texto) {
        cy.get('input[name="keys"]').type(texto)
    }

    function escribirCampoTramite(campo, texto){
        cy.get(`input[name="${campo}"]`).type(texto)
    }

})