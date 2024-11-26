describe('service-record.cy.ts', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente Angular
    cy.visit('');
  });

  it('Mostrar el boton Nuevo registro y el título', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-servicios');
    cy.contains('.header-section__info__title', 'Registro de servicios').should('be.visible');
    cy.contains('.header-section__info__subtitle', 'Añade y actualiza la base actual de registros y ofertas').should('be.visible');
    cy.contains('button.button-primary', 'Nuevo registro +').should('be.visible');
  });

  it('Funcionamiento del buscador', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-servicios');
    cy.wait(1000);
    cy.get('input.action-input').type('SISGEO{enter}');
  });

  it('Botones de la tabla', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-servicios');
    cy.wait(1000);
    cy.get('td.mat-cell').contains('WFS').should('exist');
    cy.get('.table-cnt').scrollTo('right');
    cy.get('.mat-row').first().find('demand-icon').click({force: true})
    cy.get('select[id="sele"]').select('FEACT');
    cy.get('.close-icon').click();
    cy.get('.mat-row').first().find('edit-icon').click({force: true})
    cy.get('.close-icon').click();
    cy.get('.mat-row').first().find('delete-icon').click({force: true})
    cy.get('.close-icon').click();
  });
  it('Funcionamiento del botón nuevo registro', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-servicios');
    cy.contains('.header-section__info__title', 'Registro de servicios').should('be.visible');
    cy.contains('.header-section__info__subtitle', 'Añade y actualiza la base actual de registros y ofertas').should('be.visible');
    cy.get('button.button-primary').click();
    cy.get('input[formControlName="name"]').type('Nombre de la Capa');
    cy.get('input[formControlName="url"]').type('URL de Destino');
    cy.get('select#version').select('1.0.0');
    cy.get('select[formControlName="service"]').select('WFS');
    cy.get('input#sistema_referencia').type('Sistema de Referencia');
    cy.get('input[formControlName="institution"]').type('Nombre de la Institución');
    cy.get('input#periodicidad').type('Frecuencia de Actualización');
  });
})