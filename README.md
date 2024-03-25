# AdminPro

1  > Click en Login
    > UsuarioservService > ``loginUsuario(formLogin: UserLogin)`` - se envia las propiedades (nombre y password ) del fomulario en la peticion post al servidor. El servidor envia como respuesta los datos del usuario logueado y el token.
    > Al entrar en el dashboard. Activa el AuthGuard. Verifica el token ``validarToken() : Observable<boolean>`` , se crea el nuevo usuario ``this.usuario = new UsuarioModel(name, email, role, google, uid, img);`` y se almacena el token en el localStorage
    > El token almacenado siempre se va a enviar en todas las peticiones que se hagan al server:
        > ``return this.http.put( `${this.baseUrl}/usuarios/${this.usuario.uid}`, body, {
      headers: {
        'x-token' : this.token
      } } )``
    > Cada vez que necesite crear o modificar el usuario se debe hacer referencia al modelo
        > `public usuario: UsuarioModel;`
        > los modelos en Angular se definen como clases TypeScript que encapsulan los datos y lógica relacionada con esos datos.
        > "Data binding" permite la sincronización automática entre el modelo y la vista. Si el modelo es enlazado a una vista mediante directivas de Angular como {{ }} para interpolación, [ ] para binding de propiedad, o ( ) para binding de eventos, cualquier cambio en las propiedades del modelo se reflejará automáticamente en la vista.