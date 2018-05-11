/*
Mathematics Assisstant project 
        By Sina Honarvar and Farzam Ghafouri DEC 2017 - MAR 2018
        */


String.prototype.isANumber = function() {
    if (this.match(/^-{0,1}\d+$/)) {
        return true;
        //valid integer (positive or negative)
    } else if (this.match(/^\d+\.\d+$/)) {
        return true;
        //valid float
    } else {
        return false;
        //not valid number
    }
};



function getVectors() {
    vecOne = [];
    vecTwo = [];
    for (i = 0; i < 3; i++) {
        if (!document.getElementById("v0-".concat(i)).value.isANumber || !document.getElementById("v1-".concat(i)).value.isANumber()) {
            alert("Wrong Input");
            return false;
        }
        vecOne.push(parseInt(document.getElementById("v0-".concat(i)).value));
        vecTwo.push(parseInt(document.getElementById("v1-".concat(i)).value));
    }
    return [vecOne, vecTwo];
}

function innerMultiply(vecOne, vecTwo) {
    ret = 0;
    for (i = 0; i < 3; i++) {
        ret += vecOne[i] * vecTwo[i];
    }
    return ret;
}

function outerMultiply(vecOne, vecTwo) {
    return [vecOne[1] * vecTwo[2] - vecOne[2] * vecTwo[1], vecOne[2] * vecTwo[0] - vecOne[0] * vecTwo[2], vecOne[0] * vecTwo[1] - vecOne[1] * vecTwo[0]];
}

function len(a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
}

function calculate() {
    a = getVectors()[0];
    b = getVectors()[1];
    document.getElementById("answers").style.display = 'block';
    document.getElementById("inner").innerHTML = "V<sub>1</sub> . V<sub>2</sub> = " + (innerMultiply(a, b));
    document.getElementById("outer").innerHTML = "V<sub>1</sub> * V<sub>2</sub> = (" + (outerMultiply(a, b)) + ")";
    document.getElementById("len1").innerHTML = "|V<sub>1</sub>|<sup>2</sup> = " + (len(a));
    document.getElementById("len2").innerHTML = "|V<sub>2</sub>|<sup>2</sup> =" + (len(b));
    document.getElementById("cosangle").innerHTML = "cosθ = " + (innerMultiply(a, b) / Math.pow(len(a) * len(b), 1 / 2));
    document.getElementById("angle").innerHTML = "θ = " + (Math.acos(innerMultiply(a, b) / Math.pow(len(a) * len(b), 1 / 2)) / Math.PI) + "π";
}