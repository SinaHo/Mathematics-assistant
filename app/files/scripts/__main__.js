/*
Mathematics Assisstant project 
        By Sina Honarvar and Farzam Ghafouri DEC 2017 - MAR 2018
        */

const remote = require('electron').remote;
let w = remote.getCurrentWindow();

function quit() {
    var conf = confirm("Are you sure about exiting the app?");
    if (conf === true) {
        w.close();
    }
}