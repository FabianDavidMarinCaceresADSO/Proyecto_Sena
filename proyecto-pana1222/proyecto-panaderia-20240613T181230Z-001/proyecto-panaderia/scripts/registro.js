
import {Enviar, listar} from "../modulos/crud.js";
import is_letters from "../modulos/is_letter.js";
import is_email from "../modulos/is_email.js";

const $form = document.querySelector(".registroform__form")
const $botonRegistro = document.querySelector(".registro__button");
const $nombre = document.querySelector("#nombre");
const $apellido = document.querySelector("#apellidos");
const $correo = document.querySelector("#email");
const $password = document.querySelector("#password");

function limpiar(){
    $nombre.value = "";
    $apellido.value = "";
    $correo.value = "";
    $password.value = "";
}

$form.addEventListener("submit",async (event) => {
    event.preventDefault();
    
    const list = await listar("usuarios") ;
    console.log(list);

    let correoInput = document.querySelector("#email").value 
    let correoRepetido = false
    list.forEach(usuario => {
        if (correoInput === usuario.correo) {
            correoRepetido = true
        }
    });
    
    if($nombre.value == "" || $apellido.value == "" || $correo.value == "" || $password.value == ""){
        alert("Por favor rellene todos los campos");
    }else{
        let rege = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        if(rege.test($correo.value)){
            if (correoRepetido) {
                alert("el correo ingresado ya esta registrado con otro usuario")
            } else{
                const datos = {
                    nombre: $nombre.value,
                    apellido: $apellido.value,
                    password: $password.value,
                    correo: $correo.value
            
                };
                Enviar(datos, `usuarios`).then(() => {
                    alert("Usuario registrado correctamente.");
                }).catch((error) => {
                    alert("Error al registrar el usuario.");
                    console.error(error);
                });
                limpiar();
            }
        }
        else{
            alert("El correo no es valido");
        }
    }
});

$nombre.addEventListener("keypress", (event)=>{
    is_letters(event);
})
$apellido.addEventListener("keypress", (event)=>{
    is_letters(event);
})









