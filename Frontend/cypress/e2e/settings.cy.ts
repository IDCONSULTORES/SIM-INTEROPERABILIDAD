describe('settings', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente Angular
    cy.visit('');
  });
  it('Deberia cargar los campos y elementos del formulario', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/configuracion');
    cy.get('.header-section__info__title').should('exist');

    // Verifica que el subtítulo exista
    cy.get('.header-section__info__subtitle').should('exist');

    // Cambiar al modo de edición
    cy.get('#edit-button').should('exist');
    cy.get('#edit-button').click();

    // Verifica que los campos del formulario existan
    cy.get('input[formControlName="server_type"]').should('exist');
    cy.get('input[formControlName="name_server"]').should('exist');
    cy.get('input[formControlName="port"]').should('exist');
    cy.get('input[formControlName="user_db"]').should('exist');
    cy.get('input[formControlName="psswd_server"]').should('exist');
    cy.get('input[formControlName="database_name"]').should('exist');
  });

  it('Llenado del formulario de edicion', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/configuracion');
    // Cambiar al modo de edición
    cy.get('#edit-button').click();

    // Ingresa valores en los campos del formulario
    cy.get('input[formControlName="server_type"]').type('Plataforma 1');
    cy.get('input[formControlName="name_server"]').type('177.177.77.77');
    cy.get('input[formControlName="port"]').type('1340');
    cy.get('input[formControlName="user_db"]').type('Usuario 1');
    cy.get('input[formControlName="psswd_server"]').type('Contraseña 1');
    cy.get('input[formControlName="database_name"]').type('Base de Datos 1');
  });



})