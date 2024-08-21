 import {Enviar, listar, eliminar, modificar} from "../modulos/crud.js";

const $form = document.querySelector(".datos__form");
const $botonNuevo_producto = document.querySelector("#nuevo");
let productoID = null;

$botonNuevo_producto.addEventListener("click",(event) => { 
    event.preventDefault();

    const datos = {
        codigo: document.querySelector("#codigo").value,
        nombre:document.querySelector("#nombre").value,
        precio: document.querySelector("#precio").value,
        stock: document.querySelector("#stock").value
    };


    if (productoID === null) {
        // Si clienteId es null, significa que se está añadiendo un nuevo cliente
        Enviar(datos, `productos`).then(() => {
            alert("Producto registrado Exitosamente.");
            list(); // Recargar la lista después de añadir
        }).catch((error) => {
            alert("Error al Registrar el producto.");
            console.error(error);
        });
    } else {
        // Si clienteId no es null, significa que se está modificando un cliente existente
        modificar(productoID, datos, `productos`).then(() => {
            alert("producto modificado correctamente.");
            productoID = null; // Resetear clienteId después de modificar
            list(); // Recargar la lista después de modificar
        }).catch((error) => {
            alert("Error al modificar los producto.");
            console.error(error);
        });
    }
});


// Llama a la función listar para obtener los datos
const list = async () => {
    try{
        const data = await listar(`productos`);  // Llama a la API para obtener los datos de clientes
        renderData(data); // Llama a la función para renderizar los datos en el DOM
    } catch (error) {
        console.error("Error a listar datos:", error);
    }
};


const renderData = (data) => {
    const $tableBody = document.querySelector("#tbody__productos");
    const $fragment = document.createDocumentFragment();

    $tableBody.innerHTML = "";    

    data.forEach(item => {
        console.log(item);

        const tr = document.createElement("tr"); // Crea una fila para la tabla
        const id = document.createElement("td");
        const codigo = document.createElement("td");
        const nombre = document.createElement("td");
        const precio = document.createElement("td");
        const stock = document.createElement("td");
        const botones = document.createElement("td");
        const drop = document.createElement("button");
        const modi = document.createElement("button");

        // Asigna los valores a las celdas
        id.textContent = item.id;
        codigo.textContent = item.codigo;
        nombre.textContent = item.nombre;
        precio.textContent = item.precio;
        stock.textContent = item.stock;

        // Añade los botones
        drop.textContent = "Eliminar";
        modi.textContent = "Modificar";
        drop.classList.add("boton", "delete");
        modi.classList.add("boton", "modi");


        // Event listener para el botón de eliminar
        drop.addEventListener("click", async () => {
            if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
                try {
                    await eliminar(item.id, 'productos');
                    alert("Producto eliminado correctamente.");
                    list(); // Recargar la lista después de eliminar
                } catch (error) {
                    alert("Error al eliminar el producto.");
                    console.error(error);
                }
            }
        });

        modi.addEventListener("click", () => {
                // Rellenar el formulario con los datos del cliente a modificar
            document.querySelector("#codigo").value = item.codigo;
            document.querySelector("#nombre").value = item.nombre;
            document.querySelector("#precio").value = item.precio;
            document.querySelector("#stock").value = item.stock;
            productoID = item.id; // Guardar el ID del cliente para modificarlo más tarde
        });

        botones.appendChild(drop);
        botones.appendChild(modi);

        // Añade las celdas a la fila
        tr.appendChild(id);
        tr.appendChild(codigo);
        tr.appendChild(nombre);
        tr.appendChild(precio);
        tr.appendChild(stock);
        tr.appendChild(botones);

        // Añade la fila al fragmento
        $fragment.appendChild(tr);




    });

        $tableBody.appendChild($fragment);
};
    list();