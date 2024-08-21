import {login} from "../modulos/crud.js";

const $form = document.querySelector(".login__form")
const $botonIngresar = document.querySelector(".botones__Ingresar");



$botonIngresar.addEventListener("click", (event) => {
  event.preventDefault(); 

  const datos = {
      correo: document.querySelector("#email").value,
      password: document.querySelector("#password").value,  
  };

  // Llamar a la función Login para validar los datos
  login(datos).then((usuario) => {
      if (usuario) {  // Si la función Login devuelve un usuario (login exitoso)
          alert("Inicio de sesión exitoso");
          window.location.href = "../cliente/cliente.html";  // Redirige al usuario a la página de clientes
      } else {
          alert("Correo o contraseña incorrectos"); 
      }
  }).catch((error) => {
      alert("Error al iniciar sesión");  
      console.error(error);  
  });
});

