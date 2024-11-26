import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from '@modules/login/login.component';

describe('Login.cy.ts', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [LoginComponent],
    });
  });

  it('mounts it correctly', () => {
    cy.mount(LoginComponent);
  });

  it('it mounts with the correct dom', () => {
    cy.mount(LoginComponent);
    // Asegúrate de que el formulario esté visible
    cy.get('form.form').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button.button-primary[type="submit"]').should('exist');
  });

  it('debería mostrar un mensaje de error si se envían credenciales inválidas', () => {
    cy.mount(LoginComponent);
    // Asegúrate de que el formulario esté visible
    cy.get('form.form').should('be.visible');

    // Rellena el campo de usuario con un valor inválido
    cy.get('input[name="username"]').type('usuario-invalido@example.com');

    // Rellena el campo de contraseña con una contraseña inválida
    cy.get('input[name="password"]').type('contraseña-invalida');

    // Simula el envío del formulario haciendo clic en el botón "Iniciar Sesión"
    cy.get('button.button-primary[type="submit"]').click();

    // Asegúrate de que el mensaje de error esté presente
    cy.contains('Las credenciales no son válidas').should('be.visible');
  });
});
