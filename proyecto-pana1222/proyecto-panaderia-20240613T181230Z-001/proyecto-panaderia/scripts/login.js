import {listar} from "../modulos/crud.js";

const $form = document.querySelector(".form__login")
const $botonIngresar = document.querySelector(".botones__ingresar");
const $nombre = document.querySelector('#namr').value;
const $password = document.querySelector('#password').value;




$botonIngresar.addEventListener("click", (event) => {
    event.preventDefault();

    try {
        const response = await fetch('http://localhost:3000/usuarios',   
     {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({ email, password })
        });
    
        if (response.ok) {
          const   
     data = await response.json();
          localStorage.setItem('token', data.token);   
    
          // Redirigir a la página principal o mostrar el contenido protegido
        } else {
          alert('Credenciales incorrectas');
        }
      } catch (error) {
        console.error(error);
        alert('Error al iniciar sesión');
      }
    });



}  