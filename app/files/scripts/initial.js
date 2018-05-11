/*
Mathematics Assisstant project 
        By Sina Honarvar and Farzam Ghafouri DEC 2017 - MAR 2018
        */

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function init() {
    await sleep(1000);
    document.getElementById("welcome").style.display = "block";
    document.getElementById("horizontal_start").style.display = "block";
    await sleep(3000);
    document.getElementById("welcome").style.display = "none";
    document.getElementById("horizontal_start").style.display = "none";
}

function fun() {
    var str = '';
    var i = 0;
    arr = Array();
    for (i = 0; i <= 40; i++) {
        arr.push("</br>");
    }
    str = arr.join("");
    document.write(str);
}

function window_close() {
    confirmation = confirm("Are you sure want to exit");
    if (confirmation) {
        self.close();
        window.close();
    }
}