 import {Enviar, listar, eliminar, modificar} from "../modulos/crud.js";

const $form = document.querySelector(".datos__form");
const $botonNuevo_producto = document.querySelector("#nuevo");
const $cod = document.querySelector("#codigo");
const $name = document.querySelector("#nombre");
const $preci = document.querySelector("#precio");
const $stock = document.querySelector("#stock");
const $modi = document.querySelector("#modi");
const $clean = document.querySelector("#clean");

function limpiar(){
    $cod.value = ""
    $name.value = ""
    $preci.value = ""
    $stock.value = ""
}

$botonNuevo_producto.addEventListener("click",(event) => { 
    event.preventDefault();
    let existe = false;
    if($cod.value != "" && $name.value != "" && $preci.value != "" && $stock.value != ""){
        listar(`productos`)
            .then((x)=>{
                x.forEach(e => {
                    if(e.id == $cod.value){
                        existe = true;
                    }
                });
                if(existe){
                    alert("El codigo ya esta en uso")
                }
                else{
                    const datos = {
                        id: $cod.value,
                        nombre: $name.value,
                        precio: $preci.value,
                        stock: $stock.value
                    };
                    Enviar(datos, `productos`)
                    alert("Producto registrado")
                    limpiar();
                    list();
                }
            })

    }else{
        alert("Rellene todos los campos")
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

        const tr = document.createElement("tr"); // Crea una fila para la tabla
        const codigo = document.createElement("td");
        const nombre = document.createElement("td");
        const precio = document.createElement("td");
        const stock = document.createElement("td");
        const botones = document.createElement("td");
        const drop = document.createElement("button");
        const modi = document.createElement("button");

        // Asigna los valores a las celdas
        codigo.textContent = item.id;
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
            document.querySelector("#codigo").value = item.id;
            document.querySelector("#nombre").value = item.nombre;
            document.querySelector("#precio").value = item.precio;
            document.querySelector("#stock").value = item.stock;
        });

        botones.appendChild(drop);
        botones.appendChild(modi);

        // Añade las celdas a la fila
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

$modi.addEventListener("click", (event)=>{
    event.preventDefault();
    if($cod.value != "" && $name.value != "" && $preci.value != "" && $stock.value != ""){
        const newdata = {
            nombre: $name.value,
            precio: $preci.value,
            stock: $stock.value
        }
        modificar($cod.value, newdata, `productos`);
        alert("Producto modificado");
        limpiar();
        list();
    }
    else{
        alert("Seleccione un producto");
    }
});

$clean.addEventListener("click", (event)=>{
    event.preventDefault();
    limpiar();
})