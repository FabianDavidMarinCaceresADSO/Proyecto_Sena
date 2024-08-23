import {Enviar, listar, eliminar, modificar , buscar, patch} from "../modulos/crud.js";

const $form = document.querySelector(".datos__form");
const $form2 = document.querySelector("#form2");
const $botonNuevo_cliente = document.querySelector("#nuevo");
const $codigo = document.querySelector("#cod")
const $documento = document.querySelector("#DOCUMENTO");
const $producto = document.querySelector("#PRODUCTO");
const $precio = document.querySelector("#precio");
const $stock= document.querySelector("#stock");
const $stockDisponible = document.querySelector("#stockDisponible");
const $clean = document.querySelector("#clean");
const $tablaPed = document.querySelector("#tbody__productos");
const $search = document.querySelector("#search");
const $fragCli = document.createDocumentFragment();
const $fragProd = document.createDocumentFragment();
const $pagar = document.querySelector(".pagar");
const $pagoTotal = document.querySelector("#pagoTotal");
const $recibido = document.querySelector("#Recibido");
const $vueltos = document.querySelector("#vueltos");
// $botonNuevo_cliente.addEventListener("click",(event) => { 
//     event.preventDefault();


// });

let suma  = 0;



function limpiar(){
    $documento.value = "pre";
    $producto.value = "";
    $precio.value = "";
    $producto.value = "";
    $stock.value = "";
    $stockDisponible.value = "";
    $search.value = "";
}
function limpiar2(){
    $producto.value = "";
    $precio.value = "";
    $producto.value = "";
    $stock.value = "";
    $stockDisponible.value = "";
    $search.value = "";
}

function listarCliente(){
    listar(`clientes`)
        .then((x)=>{
            x.forEach(e => {
                const option = document.createElement("option");
                option.setAttribute("value", e.Documento)
                option.textContent = e.nombre + " " + e.apellido;
                $fragCli.appendChild(option)
            });
            $documento.appendChild($fragCli)
        })
}
listarCliente();

$form.addEventListener("submit", (event)=>{
    event.preventDefault();
    
    if($documento.value != "pre" && $producto.value != "" && $stock.value != ""){

        let filas = $tablaPed.querySelectorAll("tr");
        let codigoExistente = false;
        

        filas.forEach(fila => {
            let codigo = fila.firstElementChild.textContent;
            

            if (codigo === $codigo.value){
                // cantidad
                let cantidad = fila.firstElementChild.nextElementSibling.nextElementSibling;
                cantidad.textContent = parseInt(cantidad.textContent) + parseInt($stock.value)
                let precio = fila.lastElementChild.previousElementSibling.previousElementSibling;
                let precioTotal = fila.lastElementChild.previousElementSibling;
                
                console.log(precio)
                console.log(precioTotal)
                
                precioTotal.textContent = parseInt(precio.textContent) * parseInt(cantidad.textContent);

                codigoExistente = true
            }
        });

        
        if (!codigoExistente){
            let cantidad = parseInt($stock.value);
            let stockD = parseInt($stockDisponible.value);
            
            if(cantidad > stockD){
                alert("No hay stock sufiente en el momento")
            }
            else{
                const tr = document.createElement("tr");
                const cod = document.createElement("td");
                const nom = document.createElement("td");
                const cant = document.createElement("td");
                const preU = document.createElement("td");
                const preT = document.createElement("td");
                const boto = document.createElement("td");
                const eliminar = document.createElement("button");

                cod.textContent = $codigo.value;
                nom.textContent = $producto.value;
                cant.textContent = $stock.value;
                preU.textContent = $precio.value;
                let canti = parseInt($stock.value); 
                let press = parseInt($precio.value); 
                let milti = press * canti;
                preT.textContent = milti;
                eliminar.textContent = "ELIMINAR";

                eliminar.addEventListener("click", (event)=>{
                    event.preventDefault();
                    tr.remove()
                })

                boto.appendChild(eliminar);
                tr.appendChild(cod);
                tr.appendChild(nom);
                tr.appendChild(cant);
                tr.appendChild(preU);
                tr.appendChild(preT);
                tr.appendChild(boto);
                
                $fragProd.appendChild(tr);
                $tablaPed.appendChild($fragProd);
                limpiar2();
            }
        }

        let pagoTotal = 0;

        let filasAfter = $tablaPed.querySelectorAll("tr");
        
        filasAfter.forEach(fila => {
            let precioTotal = fila.lastElementChild.previousElementSibling;
            
            pagoTotal += parseInt(precioTotal.textContent);
            
        })
        console.log(filas)
        $pagoTotal.value = pagoTotal;

        console.log($pagoTotal);
        
        
        

    }else{
        alert("Rellene todos los campos")
    }

})

$form2.addEventListener("submit", (event)=>{
    event.preventDefault();
    if($search.value != ""){
        buscar($search.value, `productos`)
            .then((x)=>{
                $codigo.value = x.id;
                $producto.value = x.nombre;
                $precio.value = x.precio;
                $stockDisponible.value = x.stock;
                $search.value = "";
            })
            .catch(error=>{
                alert("No se encontro el producto")
                console.error(error);                
            })
    }
})

$clean.addEventListener("click", (event)=>{
    event.preventDefault();
    limpiar();
})




$pagar.addEventListener("click", async (event) =>{
    console.log($vueltos.value);
    

    if ($vueltos.value === "") {
        alert("el recibido es menor al pago total");
    } else{
        // let confirm = confirm("desea realizar la compra");

        if (confirm("desea realizar la compra")) {
            
            let contenido = [];

            let filas = $tablaPed.querySelectorAll("tr");

            filas.forEach(fila => {
                let objetoContenido = {
                    "nombre": fila.firstElementChild.nextElementSibling.textContent,
                    "codigo": fila.firstElementChild.textContent,
                    "precio": fila.lastElementChild.previousElementSibling.previousElementSibling.textContent,
                    "precioTotal": fila.lastElementChild.previousElementSibling.textContent,
                    "cantidad": fila.firstElementChild.nextElementSibling.nextElementSibling.textContent
                    }
                
                    contenido.push(objetoContenido)
            });

            let objeto = {
                    "Documento": $documento.value,
                    "contenido": contenido,
                    "total": $pagoTotal.value,
                    "paga": $recibido.value,
                    "cambio": $vueltos.value
                    }

            Enviar (objeto,`Pedidos`)


            
            let filasAfter = $tablaPed.querySelectorAll("tr");

            const productos = await listar("productos");

            console.log(productos)
            filasAfter.forEach(fila => {
                let cantidad = fila.firstElementChild.nextElementSibling.nextElementSibling.textContent;
                let codigo = fila.firstElementChild.textContent;

                
                productos.forEach(producto => {
                    if (producto.id === codigo) {
                        let stockDisminuido = {
                            "stock": `${parseInt(producto.stock) - parseInt(cantidad)}` 
                        }

                        patch(producto.id, stockDisminuido, `productos`);
                    }
                });

            })

            
        } else{

        }
    }

})

$recibido.addEventListener("input", (event) =>{

    let recibido = parseInt($recibido.value);
    let pagoTotal = parseInt($pagoTotal.value);

    if (recibido >= pagoTotal){
        $vueltos.value = recibido - pagoTotal;
    } else{
        $vueltos.value = "";
    }

        



})

