describe('demant-service', () => {
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
    cy.visit('/demandas-programadas');
    cy.get('.header-section__info__title').should('contain', 'Demandas Programadas');
    cy.get('input[id="main-searcher"]').type('Texto de prueba');
  });

  it('Debería abrir el panel de expansión y verificar el contenido', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/demandas-programadas');
    cy.get('.mat-expansion-panel-header').first().click();
    cy.get(".general-acordion").should("exist");
    cy.get(".general-acordion table.general-table").should("exist");
    cy.get(".general-acordion table.general-table tbody tr").should("exist");
  });

  it('Funcionalidad de los botones de la Tabla de oferta de servicios', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/demandas-programadas');
    cy.get('.mat-expansion-panel-header').first().click();
    cy.get(".general-acordion").should("exist");
    cy.get(".general-acordion table.general-table").should("exist");
    cy.get(".general-acordion table.general-table tbody tr").should("exist");
    cy.get('#demand-table').should("exist").scrollTo('right');
    cy.get('#demand-table .mat-row').first().find('world-icon').click({force: true})
    cy.contains('button', 'NO').click();
    cy.get('#demand-table .mat-row').first().find('edit-icon').click({force: true})
    cy.get('[formControlName="synchroType"]').select('Programada');
    cy.get('[formControlName="frequency"]').select('Diaria');
    cy.get('[formControlName="startDate"]').type('2023-12-01');
    cy.get('[formControlName="endDate"]').type('2023-12-31');
    cy.get('[formControlName="day"]').select('Lunes');
    cy.get('[formControlName="percent"]').select('80');
    cy.get('.close-icon').click();
    cy.get('#demand-table .mat-row').first().find('delete-icon').click({force: true})
    cy.get('.close-icon').click();
  });

})