describe('service-record.cy.ts', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente Angular
    cy.visit('');
  });

  it('Mostrar el título y probar el buscador', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/oferta-de-servicios');
    cy.get('.header-section__info__title').should('contain', 'Ofertas de Servicios - SERNANP');
    cy.get('.header-section__info__subtitle').should('contain', 'Añade y administra la base actual de registros WFS');
    cy.get('input[id="main-searcher"]').type('Texto de prueba');
  });

  it('Debería abrir el panel de expansión y verificar el contenido', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/oferta-de-servicios');
    cy.get('.mat-expansion-panel-header').first().click();
    cy.get(".general-acordion").should("exist");
    cy.get(".general-acordion table.general-table").should("exist");
    cy.get(".general-acordion table.general-table tbody tr").should("exist");
  });

  it('Pestañas Disponibilidad y Ofertas', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/oferta-de-servicios');
    cy.get('.mat-expansion-panel-header').first().click();
    cy.get(".general-acordion").should("exist");
    cy.get(".general-acordion table.general-table").should("exist");
    cy.get(".general-acordion table.general-table tbody tr").should("exist");
    cy.get(".button-primary:contains('Ofertas')").should("exist");
    cy.get(".button-primary:contains('Ofertas')").click();
    cy.get(".button-primary:contains('Disponibilidad')").should("exist");
    cy.get(".button-primary:contains('Disponibilidad')").click(); 
  });

  it('Funcionalidad de los botones de la Tabla de oferta de servicios', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/oferta-de-servicios');
    cy.get('.mat-expansion-panel-header').first().click();
    cy.get(".general-acordion").should("exist");
    cy.get(".general-acordion table.general-table").should("exist");
    cy.get(".general-acordion table.general-table tbody tr").should("exist");
    cy.get(".button-primary:contains('Ofertas')").should("exist");
    cy.get(".button-primary:contains('Ofertas')").click();
    cy.get('#offer-table').should("exist").scrollTo('right');
    cy.get('#offer-table .mat-row').first().find('#layer-button').click({force: true})
    cy.get('.close-icon').click();
    cy.get('#offer-table .mat-row').first().find('time-icon').click({force: true})
    cy.get('[formControlName="synchroType"]').select('Programada');
    cy.get('[formControlName="frequency"]').select('Diaria');
    cy.get('[formControlName="startDate"]').type('2023-12-01');
    cy.get('[formControlName="endDate"]').type('2023-12-31');
    cy.get('[formControlName="day"]').select('Lunes');
    cy.get('[formControlName="percent"]').select('80');
    cy.get('.close-icon').click();
    cy.get('#offer-table .mat-row').first().find('#download-button').click({force: true})
  });


  
})