import {Enviar} from "../modulos/crud.js";

const $form = document.querySelector(".registroform__form")
const $botonRegistro = document.querySelector(".registro__button");

$botonRegistro.addEventListener("click",(event) => {
    event.preventDefault(); // Evita el envío del formulario

    const datos = {
        nombre: document.querySelector("#nombre").value,
        apellido: document.querySelector("#apellidos").value,
        password: document.querySelector("#password").value,
        correo: document.querySelector("#email").value 

    };
    

      // Llamar a la función para enviar los datos
    Enviar(datos).then(() => {
        alert("Usuario registrado correctamente.");
    }).catch((error) => {
        alert("Error al registrar el usuarioo.");
        console.error(error);
    });
});


