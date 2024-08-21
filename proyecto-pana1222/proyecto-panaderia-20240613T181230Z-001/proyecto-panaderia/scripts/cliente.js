import {Enviar, listar, eliminar, modificar} from "../modulos/crud.js";

const $form = document.querySelector(".datos__form");
const $botonNuevo_cliente = document.querySelector("#nuevo");
let clienteId = null;

$botonNuevo_cliente.addEventListener("click",(event) => { 
    event.preventDefault();

    const datos = {
        Documento: document.querySelector("#documento").value,
        nombre:document.querySelector("#nombre").value,
        apellido: document.querySelector("#apellido").value,
        telefono: document.querySelector("#telefono").value,
        email: document.querySelector("#email").value
    };


    if (clienteId === null) {
        // Si clienteId es null, significa que se está añadiendo un nuevo cliente
        Enviar(datos, `clientes`).then(() => {
            alert("Cliente registrado Exitosamente.");
            list(); // Recargar la lista después de añadir
        }).catch((error) => {
            alert("Error al Registrar el cliente.");
            console.error(error);
        });
    } else {
        // Si clienteId no es null, significa que se está modificando un cliente existente
        modificar(clienteId, datos, `clientes`).then(() => {
            alert("Cliente modificado correctamente.");
            clienteId = null; // Resetear clienteId después de modificar
            list(); // Recargar la lista después de modificar
        }).catch((error) => {
            alert("Error al modificar el cliente.");
            console.error(error);
        });
    }
});


// Llama a la función listar para obtener los datos
const list = async () => {
    try{
        const data = await listar(`clientes`);  // Llama a la API para obtener los datos de clientes
        renderData(data); // Llama a la función para renderizar los datos en el DOM
    } catch (error) {
        console.error("Error a listar datos:", error);
    }
};


const renderData = (data) => {
    const $tableBody = document.querySelector("#tbody__clientes");
    const $fragment = document.createDocumentFragment();

    $tableBody.innerHTML = "";    

    data.forEach(item => {
        console.log(item);

        const tr = document.createElement("tr"); // Crea una fila para la tabla
        const id = document.createElement("td");
        const Documento = document.createElement("td");
        const nombre = document.createElement("td");
        const apellido = document.createElement("td");
        const telefono = document.createElement("td");
        const email = document.createElement("td");
        const botones = document.createElement("td");
        const drop = document.createElement("button");
        const modi = document.createElement("button");

        // Asigna los valores a las celdas
        id.textContent = item.id;
        Documento.textContent = item.Documento;
        nombre.textContent = item.nombre;
        apellido.textContent = item.apellido;
        telefono.textContent = item.telefono;
        email.textContent = item.email;

        // Añade los botones
        drop.textContent = "Eliminar";
        modi.textContent = "Modificar";
        drop.classList.add("boton", "delete");
        modi.classList.add("boton", "modi");


        // Event listener para el botón de eliminar
        drop.addEventListener("click", async () => {
            if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
                try {
                    await eliminar(item.id, 'clientes');
                    alert("Cliente eliminado correctamente.");
                    list(); // Recargar la lista después de eliminar
                } catch (error) {
                    alert("Error al eliminar el cliente.");
                    console.error(error);
                }
            }
        });

        modi.addEventListener("click", () => {
                // Rellenar el formulario con los datos del cliente a modificar
            document.querySelector("#documento").value = item.Documento;
            document.querySelector("#nombre").value = item.nombre;
            document.querySelector("#apellido").value = item.apellido;
            document.querySelector("#telefono").value = item.telefono;
            document.querySelector("#email").value = item.email;
            clienteId = item.id; // Guardar el ID del cliente para modificarlo más tarde
        });

        botones.appendChild(drop);
        botones.appendChild(modi);

        // Añade las celdas a la fila
        tr.appendChild(id);
        tr.appendChild(Documento);
        tr.appendChild(nombre);
        tr.appendChild(apellido);
        tr.appendChild(telefono);
        tr.appendChild(email);
        tr.appendChild(botones);

        // Añade la fila al fragmento
        $fragment.appendChild(tr);




    });

        $tableBody.appendChild($fragment);
};
    list();