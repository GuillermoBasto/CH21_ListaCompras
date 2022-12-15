let idTimeOut;
let validos;

let txtNombre = document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let total = document.getElementById("precioTotal");

let tabla = document.getElementById("tablaListaCompras")
let cuerpoTabla = tabla.getElementsByTagName("tbody")

let btnAgregar = document.getElementById("btnAgregar");
let alertValidaciones = document.getElementById("alertValidaciones");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

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
        let lista = "<ul>"
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
    }
})

