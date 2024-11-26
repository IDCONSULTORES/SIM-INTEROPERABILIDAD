describe('dashboard', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente Angular
    cy.visit('');
  });

  it('Mostrar los cuadros informativos', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/dashboard');
    cy.get('.stat-cnt').should('have.length', 3);
    cy.get('.stat-cnt').eq(0).should('contain', 'Capas inscritas');
    cy.get('.stat-cnt').eq(1).should('contain', 'Programaciones');
    cy.get('.stat-cnt').eq(2).should('contain', 'WFS inscritos');
  });

  it('Debería cambiar el gráfico al hacer clic en los botones', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/dashboard');
    // Haz clic en los botones de cambio de gráfico y verifica que se active el botón seleccionado
    cy.contains('button', 'Lecturas WFS').click();
    cy.contains('button', 'Lecturas WFS').should('have.class', 'button__active');

    cy.contains('button', 'Acciones sobre programaciones').click();
    cy.contains('button', 'Acciones sobre programaciones').should('have.class', 'button__active');

    cy.contains('button', 'Acciones sobre capas').click();
    cy.contains('button', 'Acciones sobre capas').should('have.class', 'button__active');

    cy.contains('button', 'Inserciones').click();
    cy.contains('button', 'Inserciones').should('have.class', 'button__active');

    cy.contains('button', 'ETL').click();
    cy.contains('button', 'ETL').should('have.class', 'button__active');

    // Continúa este proceso para los otros botones
  });

  it('Mostrar las graficas', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/dashboard');
    cy.get('app-basic-chart-area').should('exist');
    cy.get('app-basic-pie-component').should('exist');
    cy.get('app-basic-donut-component').should('exist');
    cy.get('app-notification-table').should('exist');
  });



})