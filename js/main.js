let btnAgregar = document.getElementById("btnAgregar");
let txtName = document.getElementById("Name");
let txtNumber = document.getElementById("Number");

let alertValidaciones = document.getElementById("alertValidaciones")
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto")

function validarCantidad(){
if (txtNumber.value.lenght<=0){
    return false;
}//length<=0

if(isNaN(txtNumber.value)){
return false;
}//isNaN

if(Number(txtNumber.value)<=0){
return false;
}//>0

return true;
}// Validar cantidad

btnAgregar.addEventListener("click", function(event){
event.preventDefault();
txtName.value = txtName.value.trim();
txtNumber.value = txtNumber.value.trim();

txtName.style.border ="";
txtNumber.style.border ="";
alertValidacionesTexto.innerHTML="";
alertValidaciones.style.display="none";

if (txtName.value.length<3){
    //1. Mostrar la alerta con el error
    //2. Borde de color rojo
    txtName.style.border = 
    "solid red medium";
    alertValidacionesTexto.innerHTML=
    "<strong>El Nombre del producto no es correcto.</strong>";
    alertValidaciones.style.display=
    "block";
} // Validar lenght

if (!validarCantidad()){        // si regresa false
    txtNumber.style.border = 
    "solid red medium";
    alertValidacionesTexto.innerHTML+=
    "<strong>La cantidad no es correcta.</strong>";
    alertValidaciones.style.display=
    "block";
}   //Validar cantidad

function getPrecio(){
    return Math.round(Math.random()*1000)/100;
}
//length<3


});

