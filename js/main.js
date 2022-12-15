let idTimeOut, validos, cantidad;
let totalEnProductos=0, costoTotal=0, precio=0, contador = 0;
let datos = []; ///new array();

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("precioTotal");

let tabla = document.getElementById("tablaListaCompras")
let cuerpoTabla = tabla.getElementsByTagName("tbody");

let btnClear = document.getElementById("btnClear");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let contadorProductos = document.getElementById("contadorProductos");
let productosTotal = document.getElementById("productosTotal");
let precioTotal = document.getElementById("precioTotal")


function getPrecio(){
    return Math.floor(Math.random()*50*100)/100;
}//funcion para sacar precio

function validarNombre(){
    return (txtNombre.value.length>2)?true:false;
}//validar nombre

function validarCantidad() {
    if(txtNumber.value.length==0){
        return false;
    }
    if (isNaN(txtNumber.value)){
        return false;
    }
    if (parseFloat(txtNumber.value)<=0){
        return false
    }
    return true
}//validar cantidad


btnAgregar.addEventListener ("click", function(event){
    event.preventDefault();
    clearTimeout(idTimeOut);
    alertValidacionesTexto.innerHTML="";
    if ((!validarNombre()) || (!validarCantidad())){
        let lista = "Llena los campos correctamente <ul>"
        if (! validarNombre()){
            txtNombre.style.border = "solid red 1px";
            lista += "<li>Ingresa un nombre válido</li>";
        }
        if (! validarCantidad()){
            txtNumber.style.border = "solid red 1px";
            lista += "<li>Ingresa un numero válido</li>";
        }
        lista += "</ul>"
        alertValidacionesTexto.insertAdjacentHTML("beforeend",lista);
        alertValidaciones.style.display="block";
        
        idTimeOut = setTimeout(function(){
            alertValidaciones.style.display="none";
        }, 4000);
        return false;
    } //if validaciones
    txtNumber.style.border="";
    txtNombre.style.border="";
    alertValidaciones.style.display="none";
    contador++;
    contadorProductos.innerHTML = contador;
    cantidad = parseFloat(txtNumber.value);
    totalEnProductos += cantidad;
    productosTotal.innerHTML = totalEnProductos;
    precio = getPrecio();
    costoTotal += precio * cantidad;
    precioTotal.innerHTML = "$ " + costoTotal.toFixed(2);

    //ALMACENAMIENTO EN LOCAL DE LAS VARIABLES
    localStorage.setItem("contadorProductos", contador);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("costoTotal", costoTotal);

    let row = `<tr>
    <td>${contador}</td>
    <td>${txtNombre.value}</td>
    <td>${txtNumber.value}</td>
    <td>${precio}</td>
    </tr>`;
    cuerpoTabla[0].insertAdjacentHTML("beforeend",row);

    let elemento = `{
    "id" : ${contador},
    "nombre": "${txtNombre.value}",
    "cantidad": ${txtNumber.value},
    "precio": ${precio}
    }`;
    
    datos.push(JSON.parse(elemento));
    //console.log(datos);
    localStorage.setItem("datos", JSON.stringify(datos));


    txtNombre.value="";
    txtNumber.value="";
    txtNombre.focus();
})// funciotn click al boton agregar

txtNombre.addEventListener("blur", function(event){
    event.preventDefault();
    event.target.value = event.target.value.trim();
});// funcion blur que quita los espacios en blanco del nombre

txtNumber.addEventListener("blur", function(event){
    event.preventDefault();
    event.target.value = event.target.value.trim();
});// funcion blur para el numero ingresado

window.addEventListener("load", function(event){
    let temp = localStorage.getItem("contadorProductos");
    if (temp!=null){
        contador = parseInt(temp);
        contadorProductos.innerHTML = contador;
    }
    temp = localStorage.getItem("totalEnProductos");
    if (temp!=null){
        totalEnProductos = parseInt(temp);
        productosTotal.innerHTML = totalEnProductos;
    }
    temp = localStorage.getItem("costoTotal");
    if (temp!=null){
        costoTotal = parseFloat(temp);
        precioTotal.innerHTML = "$ " + costoTotal.toFixed(2);
    }

    temp = localStorage.getItem("datos");
    if (temp!=null){
        datos = JSON.parse(temp);
        datos.forEach(element => {
            cuerpoTabla[0].innerHTML += `<tr>
            <th>${element.id}</td>
            <td>${element.nombre}</td>
            <td>${element.cantidad}</td>
            <td>$ ${element.precio}</td>
            </tr>`;
        });
    }//if
});

btnClear.addEventListener ("click", function(event){
    event.preventDefault();
    contador = 0;
    contadorProductos.innerHTML = contador;
    totalEnProductos = 0;
    productosTotal.innerHTML = totalEnProductos;
    costoTotal = 0;
    precioTotal.innerHTML = "$ " + costoTotal.toFixed(2);
    cuerpoTabla[0].innerHTML="";

    localStorage.removeItem("contadorProductos");
    localStorage.removeItem("totalEnProductos");
    localStorage.removeItem("costoTotal");
    localStorage.removeItem("datos");

    localStorage.clear();
})