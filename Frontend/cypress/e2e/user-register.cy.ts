describe('user-register', () => {
  beforeEach(() => {
    // Visita la página donde se encuentra el componente Angular
    cy.visit('');
  });
  it('Inicializacion del componente y eleccion de tipo de usuario', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-usuarios');
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro Usuario');
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Añade y administra los usuarios');
    cy.get('.gray-cnt:contains("Institución")').should('exist').click();
    cy.get('.gray-cnt.is_inactive:contains("Institución")').should('not.exist');
    cy.get('.gray-cnt.is_inactive:contains("Administrador")').should('exist');
    cy.get('.gray-cnt:contains("Administrador")').should('exist').click();
    cy.get('.gray-cnt.is_inactive:contains("Institución")').should('exist');
    cy.get('.gray-cnt.is_inactive:contains("Administrador")').should('not.exist');
    cy.get('.gray-cnt:contains("Institución")').should('exist').click();
    cy.get('button:contains("Confirmar")').should('exist').click();
  });

  it('Usuario Institucion inicializacion y prueba de formulario', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-usuarios');
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro Usuario');
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Añade y administra los usuarios');
    cy.get('.gray-cnt:contains("Institución")').should('exist').click();
    cy.get('.gray-cnt.is_inactive:contains("Institución")').should('not.exist');
    cy.get('.gray-cnt.is_inactive:contains("Administrador")').should('exist');
    cy.get('.gray-cnt:contains("Administrador")').should('exist').click();
    cy.get('.gray-cnt.is_inactive:contains("Institución")').should('exist');
    cy.get('.gray-cnt.is_inactive:contains("Administrador")').should('not.exist');
    cy.get('.gray-cnt:contains("Institución")').should('exist').click();
    cy.get('button:contains("Confirmar")').should('exist').click();
    // Verifica que el título "Registro Usuario" se muestre correctamente
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro Usuario');
    
    // Verifica que el subtítulo "Usuario Institución" se muestre correctamente
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Usuario Institución');
    cy.get('input[formControlName="name"]').type('Nombre de Usuario');
    cy.get('select[formControlName="institutionType"]').select('Privada');
    cy.get('select[formControlName="identificationType"]').select('DNI');
    cy.get('input[formControlName="identificationNumber"]').type('123456789');
    cy.get('input[formControlName="username"]').type('nombreusuario');
    cy.get('input[formControlName="email"]').type('correo@ejemplo.com');
    cy.get('input[formControlName="region"]').type('Región de Prueba');
    cy.get('input[formControlName="phone"]').type('1234567890');
    cy.get('input[formControlName="password"]').type('contraseña123');
    cy.get('input[formControlName="confirmPassword"]').type('contraseña123');
  });


  it('Usuario Administ inicializacion y prueba de formulario', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-usuarios');
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro Usuario');
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Añade y administra los usuarios');
    cy.get('.gray-cnt:contains("Institución")').should('exist').click();
    cy.get('.gray-cnt.is_inactive:contains("Institución")').should('not.exist');
    cy.get('.gray-cnt.is_inactive:contains("Administrador")').should('exist');
    cy.get('.gray-cnt:contains("Administrador")').should('exist').click();
    cy.get('.gray-cnt.is_inactive:contains("Institución")').should('exist');
    cy.get('.gray-cnt.is_inactive:contains("Administrador")').should('not.exist');
    cy.get('.gray-cnt:contains("Administrador")').should('exist').click();
    cy.get('button:contains("Confirmar")').should('exist').click();
    // Verifica que el título "Registro Usuario" se muestre correctamente
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro de Usuario');
    
    // Verifica que el subtítulo "Usuario Institución" se muestre correctamente
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Usuario Administrador');
    cy.get('input[formControlName="name"]').type('Nombre');
    cy.get('input[formControlName="lastNames"]').type('Apellidos');
    cy.get('select[formControlName="identificationType"]').select('DNI');
    cy.get('input[formControlName="identificationNumber"]').type('123456789');
    cy.get('input[formControlName="username"]').type('nombreusuario');
    cy.get('input[formControlName="email"]').type('correo@ejemplo.com');
    cy.get('input[formControlName="region"]').type('Región de Prueba');
    cy.get('input[formControlName="phone"]').type('1234567890');
    cy.get('input[formControlName="password"]').type('contraseña123');
    cy.get('input[formControlName="confirmPassword"]').type('contraseña123');
  });

  it('Modulo de subida de fotos - inicializacion', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-usuarios');
    cy.get('.gray-cnt:contains("Administrador")').should('exist').click();
    cy.get('button:contains("Confirmar")').should('exist').click();
    // Verifica que el título "Registro Usuario" se muestre correctamente
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro de Usuario');
    // Verifica que el subtítulo "Usuario Institución" se muestre correctamente
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Usuario Administrador');
    cy.get('#upload-button-primary').click()
    // Verifica que la sección de carga de fotos se muestre
    cy.get('.upload-form').should('exist');
    // Verifica la presencia de elementos en la sección de carga de fotos
    cy.get('upload-icon').should('exist');
    cy.get('.title').should('exist').should('contain', 'Arrastre su foto o haga click');
    cy.get('.link').should('exist').should('contain', 'aquí');
    cy.get('input[type="file"]').should('exist');
  });
  it('Modulo de subida de fotos - funcionamiento', () => {
    cy.get('form.form').should('be.visible');
    cy.get('input[name="username"]').type('juanpa@gmail.com');
    cy.get('input[name="password"]').type('123');
    cy.get('button.button-primary').click();
    cy.url().should('include', 'registro-de-servicios');
    cy.visit('/registro-de-usuarios');
    cy.get('.gray-cnt:contains("Administrador")').should('exist').click();
    cy.get('button:contains("Confirmar")').should('exist').click();
    // Verifica que el título "Registro Usuario" se muestre correctamente
    cy.get('.header-section__info__title').should('exist').should('contain', 'Registro de Usuario');
    // Verifica que el subtítulo "Usuario Institución" se muestre correctamente
    cy.get('.header-section__info__subtitle').should('exist').should('contain', 'Usuario Administrador');
    cy.get('#upload-button-primary').click()
    // Sube un archivo de imagen utilizando un método como `cy.fixture()` y `cy.get()`
    cy.fixture('example.jpg').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent,
        fileName: 'example.jpg',
        mimeType: 'image/jpeg',
      });
    });

    // Verifica que se cargó la imagen y se muestra la sección de imagen cargada
    cy.get('img.image-uploaded').should('exist');
    cy.get('.buttons button:contains("Confirmar")').should('exist');
    cy.get('.buttons button:contains("Cambiar Imagen")').should('exist');
  });
})