function changeScreen(scrName) {
    let eMain = document.getElementById("main");
    let eStart = document.getElementById("start");
    let eBus = document.getElementById("sbuscar");
    let ePubli = document.getElementById("spubli");

    eMain.style.display = "none";
    eStart.style.display = "none";
    eBus.style.display = "none";
    ePubli.style.display = "none";

    //cerrar navbar
    document.getElementById("navbarNav").classList.remove("show");
    document.getElementById("navbarNav").classList.add("collapse");
    document.body.classList.remove("bg-secondary");

    switch (scrName) {
        case "main":
            if (isAuth()) {
                eMain.style.display = "block";
            } else {
                changeScreen("start");
                popError("Debes iniciar sesion para poder continuar");
            }

            break;

        case "sbuscar":
            if (isAuth()) {
                eBus.style.display = "block";
            } else {
                changeScreen("start");
                popError("Debes iniciar sesion para poder continuar");
            }
            break;

        case "spubli":
            if (isAuth()) {
                ePubli.style.display = "block";
            } else {
                changeScreen("start");
                popError("Debes iniciar sesion para poder continuar");
            }
            break;

        case "start":
            document.body.classList.add("bg-secondary");
            eStart.style.display = "block";
            break;

        default:
            break;
    }
}

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