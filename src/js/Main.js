function popError(msg){
    document.getElementById("errText").innerHTML = msg;
    $('#errModal').modal('show');
}

$(document).ready(function(){
  $('[data-toggle="tab"').on('shown.bs.tab', function(event){
    $('#navbarNav').removeClass('show').addClass('collapse');
  });
});

/**
 * @author Madot10
 */
function getHr(value){
    return `${value - (value > 12 ? 12 : 0)}:00` + (value > 12 ? 'PM' : 'AM');
}

/**
 * @author Madot10
 */
function rangeTime(ele){
    document.getElementById("timeToShow").innerHTML = getHr(ele.value);
}

function verificarForm(){
    let inputs = document.getElementById("fpublicar").elements;
    let reqInp = ["obj_ubicacion","obj_ult_ubicacion","obj_tipo"];
    let st = true;

    reqInp.forEach(element => {
        if(inputs[element].value == "" || inputs[element].value == "select"){
            st = false;
        }    
    });
    
    return st;
}

function enviarObj(){
    let inputs = document.getElementById("fpublicar").elements;
    if(verificarForm()){
        addRegistro(inputs["obj_ubicacion"].value, inputs["obj_hora"].value,inputs["obj_ult_ubicacion"].value,inputs["obj_tipo"].value);
        console.log("sendit");
    }
}

function changeScreen(nameScr){
    //something more
    if(nameScr == "publicar"){
        //limpiar campos
    }else if(nameScr == "buscar"){
        //chequear tiempo de ultima carga
    }
    $(`#navbarNav a[href="#${nameScr}"] `).tab('show');
}