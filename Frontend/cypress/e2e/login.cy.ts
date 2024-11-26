describe('Login.cy.ts', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente Angular
    cy.visit('');
  });

  it('debería mostrar el formulario de inicio de sesión y enviar credenciales válidas', () => {
    // Asegúrate de que el formulario esté visible
    cy.get('form.form').should('be.visible');

    // Rellena el campo de usuario con un valor válido
    cy.get('input[name="username"]').type('juanpa@gmail.com');

    // Rellena el campo de contraseña con una contraseña válida
    cy.get('input[name="password"]').type('123');

    // Simula el envío del formulario haciendo clic en el botón "Iniciar Sesión"
    cy.get('button.button-primary').click();

    // Asegúrate de que algún elemento que confirme el inicio de sesión esté presente o realiza una comprobación relevante

  });

  it('debería mostrar un mensaje de error si se envían credenciales inválidas', () => {
    // Asegúrate de que el formulario esté visible
    cy.get('form.form').should('be.visible');

    // Rellena el campo de usuario con un valor inválido
    cy.get('input[name="username"]').type('usuario-invalido@example.com');

    // Rellena el campo de contraseña con una contraseña inválida
    cy.get('input[name="password"]').type('contraseña-invalida');

    // Simula el envío del formulario haciendo clic en el botón "Iniciar Sesión"
    cy.get('button.button-primary').click();

    // Asegúrate de que el mensaje de error esté presente
    cy.contains('Las credenciales no son válidas').should('be.visible');
  });
})