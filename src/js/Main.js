/***************VARIABLES************************* */
let isBg = true;

/*******************FUNCIONES********************* */
function popError(msg){
    document.getElementById("errText").innerHTML = msg;
    $('#errModal').modal('show');
}

/*
$(document).ready(function(){
  $('[data-toggle="tab"').on('shown.bs.tab', function(event){
    $('#navbarNav').removeClass('show').addClass('collapse');
  });
});
*/

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
        addRegistro(inputs["obj_ubicacion"].value, inputs["obj_hora"].value,inputs["obj_ult_ubicacion"].value,inputs["obj_tipo"].value,inputs["obj_descripcion"].value);
        console.log("sendit");
    }
}

function changeScreen(nameScr){
    //Ocultamos todo
    for (let elem of document.getElementsByClassName("screen")) {
        elem.style.display = "none";
    }

    //Condiciones especiales
    if(nameScr == "start" && !isBg){
        document.body.classList.add("bg-dark");
        isBg = true;

    }else if(nameScr != "start" && isBg){
        document.body.classList.remove("bg-dark");
        isBg = false;
    }

    //Cambio de screen
    if(nameScr == "start" || isAuth() )
        document.getElementsByClassName("screen")[nameScr].style.display = "block";
}

function toggleLoader(){
    let loader = document.getElementById("loader");
    loader.style.display = loader.style.display=="none" ? "block" : "none";
}

function clearForm(){
    let inputs = document.getElementById("fpublicar").elements;
    for (let elem of inputs) {
        //console.log("some",elem);
        elem.value = elem.type=="range" ? (1) : (elem.type=="select-one" ? "select" : "");
    }
}

function genHTMLobj(title, descp, time){
    let mainA = document.createElement('a');
    mainA.href = "#"
    mainA.classList.add("list-group-item list-group-item-action flex-column align-items-start");

    let mDiv = document.createElement('div');
    mainDiv.classList.add("d-flex w-100 justify-content-between");

        let htitle = document.createElement('h5');
        htitle.classList.add("mb-1");
        htitle.innerHTML = title;

        let smTime = document.createElement('small');
        smTime.innerHTML = timeAgoGen(time);

    mDiv.appendChild(htitle);
    mDiv.appendChild(smTime);

    let pDes = document.createElement('p');
    pDes.classList.add("mb-1");
    pDes.innerHTML = descp;

    mainA.appendChild(mDiv);
    mainA.appendChild(pDes);

    document.getElementById("objPer").innerHTML += mainA;
}

function timeAgoGen(sgOld){
    let sgNow = new Date().getTime() / 1000;
    let timeDif = Math.floor(sgNow - sgOld);
    let stResult = '';
    //console.log('TIme dif start', timeDif);
    //Seg de diferencia hasta 59sg
    if((timeDif >= 0) && (timeDif <= 59)){
        //seg
        if(timeDif <= 0){
            stResult = 'Hace instantes';
        }else{
            stResult = 'Hace ' + Math.floor(timeDif) + ' seg';
        }
        
    }else{
        timeDif = Math.floor(timeDif / 60);
        //console.log('TIme dif min', timeDif);
        //Min de diferencia hasta 59
        if((timeDif >= 1) && (timeDif <= 59)){
            //Min
            if(timeDif == 1){
                stResult = 'Hace 1 min';
            }else{
                stResult = 'Hace ' + Math.floor(timeDif) + ' mins';
            }
        }else{
            timeDif = Math.floor(timeDif / 60);
           // console.log('TIme dif hrs', timeDif);
            //Hr diferencia hasta 23
            if((timeDif >= 1) && (timeDif <= 23)){
                //hrs
                if(timeDif == 1){
                    stResult = 'Hace 1 hr';
                }else{
                    stResult = 'Hace ' + Math.floor(timeDif) + ' hrs';
                }
            }else{
                timeDif = Math.floor(timeDif / 24);
                //console.log('TIme dif days', timeDif);
                //Dias diferencia
                if((timeDif >= 1) && (timeDif <= 29)){
                    //dias
                    if(timeDif == 1){
                        stResult = 'Hace un dia';
                    }else{
                        stResult = 'Hace ' + Math.floor(timeDif) + ' dias';
                    }
                }else{
                    timeDif = Math.floor(timeDif / 30);
                    //console.log('TIme dif mes', timeDif);
                    //Meses de diferencia
                    if((timeDif >= 1) && (timeDif <= 11)){
                        //month
                        if(timeDif == 1){
                            stResult = 'Hace un mes';
                        }else{
                            stResult = 'Hace ' + Math.floor(timeDif) + ' meses';
                        }
                    }else{
                        //Anos diferencia
                        timeDif = Math.floor(timeDif / 12);
                        //console.log('TIme dif ano', timeDif);
                        if((timeDif >= 1) && (timeDif <= 11)){
                            //years
                            if(timeDif == 1){
                                stResult = 'Hace un año';
                            }else{
                                stResult = 'Hace ' + Math.floor(timeDif) + ' años';
                            }
                        }
                    }
                }
            }
        }
    }

    return stResult;
}