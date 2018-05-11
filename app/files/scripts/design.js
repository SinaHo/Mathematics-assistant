/*
Mathematics Assisstant project 
        By Sina Honarvar and Farzam Ghafouri DEC 2017 - MAR 2018
        */

function prepare_base() {
    exitRotate();
}

/*
function exitRotate() {
    document.getElementById("negative").style.transform = "rotate(45deg)";
    document.getElementById("positive").style.transform = "rotate(-45deg)";
}
*/

function exitOver() {
    document.getElementById("negative").style.transform = "rotate(35deg)";
    document.getElementById("positive").style.transform = "rotate(145deg)";
    document.getElementById("under_cross").style.display = "block";

}

function exitOut() {
    document.getElementById("negative").style.transform = "rotate(45deg)";
    document.getElementById("positive").style.transform = "rotate(135deg)";
    document.getElementById("under_cross").style.display = "none";

}


function clock() {
    var myVar = setInterval(function() {
        myTimer();
    }, 1000);

    function myTimer() {
        var d = new Date();
        document.getElementById("time").innerHTML = d.toLocaleTimeString();
    }
}
clock();
/*
function mainButtonOver(){
    document.getElementById("")
}
*/

function menuIn(id) {
    if (id === "matrix") {
        document.getElementById("matrix_border").style.left = "125px";
        document.getElementById("graph_border").style.left = "100px";
        document.getElementById("vector_border").style.left = "100px"
    } else if (id === "graph") {
        document.getElementById("matrix_border").style.left = "100px";
        document.getElementById("graph_border").style.left = "125px";
        document.getElementById("vector_border").style.left = "100px"
    } else {
        document.getElementById("vector_border").style.left = "125px"
        document.getElementById("matrix_border").style.left = "100px";
        document.getElementById("graph_border").style.left = "100px";

    }

    document.getElementById(id + "_details").style.display = "block";
}

function menuOut(id) {
    document.getElementById("matrix_border").style.left = "150px";
    document.getElementById("graph_border").style.left = "150px";
    document.getElementById("vector_border").style.left = "150px"
    document.getElementById(id + "_details").style.display = "none";
}

function showAlert(title, detail) {
    document.getElementById("dark_screen").style.display = "block";
    document.getElementById("alert_title").innerHTML = title;
    document.getElementById("alert_detail").innerHTML = detail;
}

function hideAlert() {
    document.getElementById("dark_screen").style.display = "none";
}