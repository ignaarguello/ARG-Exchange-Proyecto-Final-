/* 
1. Crearemos un sistema que sea capaz de transformas diferentes divisas y obtener su intercambio. 
2. Primero le pediremos al usuario que ingrese el monto que desea convertir
3. Le pediremos que ingrese la primer divisa
4. Le pediremos que ingrese la segunda divisa (A la cual desea convertir el valor inicial)
5. Le daremos la opcion de invertir esas divisas
6. Finalmente realizaremos la conversion e imprimeremos en el DOM el resultado
*/


//VARIABLES
const dropList = document.querySelectorAll("#select");
const primerMoneda = document.querySelector(".select__1");
const segundaMoneda = document.querySelector(".select__2")
const btnIntercambio = document.querySelector("#btnRealizarIntercambio");
const monto = document.querySelector("#inputMonto");
let valorMonto = monto.value;


//PRIMER FOR PARA RECORRER LAS MONEDAS EN ARCHIVO EXTERNO (PAISES.JS)
for(let i = 0; i < dropList.length; i++) {
    for(codigoDivisa in monedaPaises){
        //
        let selected;
        if(i == 0){
            selected = codigoDivisa == "ARS" ? "selected" : "";
        }
        else if(i == 1){
            selected = codigoDivisa == "USD" ? "selected" : "";
        }
        //
        let opciones =  `<option value="${codigoDivisa}"${selected}> ${codigoDivisa}</option>`
        dropList[i].insertAdjacentHTML("beforeend", opciones);
    }
    dropList[i].addEventListener("change", e =>{
        cargarBanderas(e.target);
    })
}

//CREAMOS LA FUNCION PARA CARGAR LAS BANDERAS
function cargarBanderas(element){
    for(codigo in monedaPaises){
        if(codigo == element.value){
            let imagenTag = element.parentElement.querySelector("img")
            imagenTag.src = `https://flagcdn.com/48x36/${monedaPaises[codigo].toLowerCase()}.png`;
        }

    }
}


//AGREGAMOS UN EVENT AL WINDONW PARA CARGAR Y EJECUTAR FUNCION
window.addEventListener("load", e =>{
    obtenerIntercambio();
})



//AGREGAMOS UN EVENT AL BTN PRINCIPAL PARA EJECUTAR LA CONVERSION
btnIntercambio.addEventListener("click", e =>{
    e.preventDefault();
    obtenerIntercambio();
    conversionExitosa();
})

//FUNCTION PARA EJECUTAR SWEET ALERT
function conversionExitosa(){
    swal({
        title: "Conversion realizada con exito",
        text: `Valor Ingresado: ${monto.value}  
                Moneda Inicial: ${primerMoneda.value}
                Convertidos a: ${segundaMoneda.value}`,
        icon: "success",
        button: "Finalizar",
      });
}



//EXTRAEMOS EL ICONO PARA INVERTIR LAS OPERACIONES Y LE DAMOS FUNCIONABILIDAD
const iconoExchange = document.querySelector(".contenedorIcon");
iconoExchange.addEventListener("click", ()=>{
    let codTemporal = primerMoneda.value;
    primerMoneda.value = segundaMoneda.value;
    segundaMoneda.value = codTemporal;
    cargarBanderas(primerMoneda);
    cargarBanderas(segundaMoneda);
    obtenerIntercambio();
})


//CREAMOS LA FUNCION PRINCIPAL PARA REALIZAE TODAS LAS OPERACIONES
function obtenerIntercambio(){
    const monto = document.querySelector("#inputMonto");
    let tipoCambioText = document.querySelector(".contenedorBtnIntercambio");
    let valorMonto = monto.value;
    if(valorMonto == "" || valorMonto == "0"){
        monto.value = "1";
        valorMonto = 1;
    }
    tipoCambioText.innerText = "Realizando Conversion"
    //INSERTAMOS LA API (EXCHANGERATE-API)
    let url = `https://v6.exchangerate-api.com/v6/6d8067eb3eb7b1234810e973/latest/${primerMoneda.value}`;
    //REALIZAMOS EL FETCH PARA OBTENER LOS DATOS
    fetch(url).
    then(response => response.json()).
    then(result=>{
        let tipoCambio = result.conversion_rates[segundaMoneda.value];
        let totalTipoCambio = (valorMonto*tipoCambio).toFixed(2);
        const tipoCambioText = document.querySelector(".contenedorBtnIntercambio");
        tipoCambioText.classList.add("total");
        tipoCambioText.innerText = `${valorMonto} ${primerMoneda.value} = ${totalTipoCambio} ${segundaMoneda.value}`;
    }).
    catch(()=>{
        tipoCambioText.innerText("Hubo un Error. Intente Nuevamente")
    })
}


                //END.       
        //END.
//END.