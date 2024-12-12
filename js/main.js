const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");
const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
const tablaListaCompras = document.getElementById("tablaListaCompras");
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tbody").item(0);
const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont=0;
let costoTotal=0;
let totalEnProductos=0;

let datos = new Array();

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

function getPrecio(){
    return Math.round(Math.random()*10000)/100;
}//getPrecio


btnAgregar.addEventListener("click", function(event){
event.preventDefault();
// Bandera, al ser true permite agregar los datos a la tabla
let isValid = true

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
    isValid=false
} // Validar lenght

if (! validarCantidad()){        // si regresa false
    txtNumber.style.border = 
    "solid red medium";
    alertValidacionesTexto.innerHTML+=
    "<br/><strong>La cantidad no es correcta.</strong>";
    alertValidaciones.style.display=
    "block";
    isValid=false;
}   //Validar cantidad

if (isValid){
   cont++;
   let precio = getPrecio();
   let row= `<tr>
              <td>${cont}</td>
              <td>${txtName.value}</td>
              <td>${txtNumber.value}</td>
              <td>${precio}</td>
            </tr>`;
    let elemento = { "cont": cont,
                     "nombre" : txtName.value,
                     "cantidad" : txtNumber.value,
                     "precio" : precio
                    };
    datos.push(elemento);

    localStorage.setItem("datos", JSON.stringify(datos));


    cuerpoTabla.insertAdjacentHTML("beforeend", row);
    costoTotal += precio * Number(txtNumber.value); 
    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    totalEnProductos+= Number(txtNumber.value);
    productosTotal.innerText =totalEnProductos;

    localStorage.setItem("costoTotal", costoTotal);
    localStorage.setItem("totalEnProductos", totalEnProductos);
    localStorage.setItem("cont", cont);


    txtName.value="";
    txtNumber.value="";
    txtName.focus();
} //isValid



}); // btnAgregar click

btnClear.addEventListener("click", function(event){
event.preventDefault();
txtName.value = "";
txtNumber.value = "";

cont=0;
costoTotal=0;
totalEnProductos=0;
precioTotal.innerText = "$ " + costoTotal.toFixed(2);
contadorProductos.innerText = cont;
totalEnProductos+= Number(txtNumber.value);
productosTotal.innerText =totalEnProductos;

cuerpoTabla.innerHTML="";

txtName.style.border ="";
txtNumber.style.border ="";
alertValidacionesTexto.innerHTML="";
alertValidaciones.style.display="none";
txtName.focus();
}); //btnClear click

window.addEventListener("load", function(event){
    if (this.localStorage.getItem("costoTotal")!=null){
       costoTotal = Number(this.localStorage.getItem("costoTotal"));
    } //null

    if (this.localStorage.getItem("totalEnProductos")!=null){
        totalEnProductos = Number(this.localStorage.getItem("totalEnProductos"));
    } //!null

    if (this.localStorage.getItem("cont")!=null){
        cont = Number(this.localStorage.getItem("cont"));
    } //!null

    if (this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }

    datos.forEach((r)=>{
        let row= `<tr>
        <td>${r.cont}</td>
        <td>${r.nombre}</td>
        <td>${r.cantidad}</td>
        <td>${r.precio}</td>
      </tr>`;
      cuerpoTabla.insertAdjacentHTML("beforeend", row);
    });

    precioTotal.innerText = "$ " + costoTotal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerText =totalEnProductos;
}); //window load
