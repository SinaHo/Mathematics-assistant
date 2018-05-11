/*
Mathematics Assisstant project 
        By Sina Honarvar and Farzam Ghafouri DEC 2017 - MAR 2018
        */


// division 0 : preparing 
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


/* Division 1 : reading input and designing page
 */

function resetMatrix(bool) {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 6; j++) {
            if (!bool) {
                document.getElementById("i-f".concat(i).concat(j)).value = "";
                document.getElementById("i-s".concat(i).concat(j)).value = "";
            }

            document.getElementById("i-a".concat(i).concat(j)).value = "";
            document.getElementById("d-a".concat(i).concat(j)).style.borderBottom = "none";

        }
    }
}

function replaceMatrix(type) {
    if (type === "dual") {
        document.getElementById("second_matrix").style.display = "block";
        document.getElementById("answer_matrix").style.top = "1200px";
    } else if (type === "simple") {
        document.getElementById("second_matrix").style.display = "none";
        document.getElementById("answer_matrix").style.top = "710px";
    }
}

var type = null;
var op = null;
type_dict = { "0": "Does Nothing", "multiply": "Multiply", "sum": "Sum", "transpose": "Transpose", "boolean_multiply": "Boolean Multiply", "boolean_sum": "Boolean Sum", "determinant": "Determinant", "inverse": "Inverse" };

function getOperation() {
    op = document.getElementById("select_op_menu").value;

    document.getElementById("show_operation").innerHTML = type_dict[op];
    var dual = new Array("multiply", "sum", "boolean_multiply", "boolean_sum");
    var simple = new Array("transpose", "determinant", "inverse");
    if (dual.includes(op)) {
        type = "dual";
        replaceMatrix("dual");
    } else if (simple.includes(op)) {
        type = "simple";
        replaceMatrix("simple");
    } else if (op === "0") {
        type = "null";
    }
    return op;
}



function getMatrixOne() {
    var matrixOne = [];
    i = 0;
    j = 0;
    OutsideLoop:
        while (document.getElementById("i-f".concat(i).concat("0")).value !== "") {
            temp_row = [];
            InsideLoop:
                while (document.getElementById("i-f".concat(i).concat(j)).value !== "") {
                    var errorBool = false;
                    if (!document.getElementById("i-f".concat(i).concat(j)).value.isANumber()) {
                        document.getElementById("d-f".concat(i).concat(j)).style.border = "solid 2px red";
                        errorBool = true;
                    }
                    if (!errorBool) { temp_row[temp_row.length] = parseInt(document.getElementById("i-f".concat(i).concat(j)).value); } else { temp_row[temp_row.length] = 0; }
                    if (j === 5) break InsideLoop;
                    j++;
                }
            matrixOne[matrixOne.length] = temp_row;
            j = 0;
            if (i === 5) break OutsideLoop;
            i++;
        }
    return matrixOne;
}

function getMatrixTwo() {
    var matrixTwo = [];
    var i = 0;
    var j = 0;
    OutsideLoop:
        while (document.getElementById("i-s".concat(i).concat("0")).value !== "") {
            temp_row = [];
            InsideLoop:
                while (document.getElementById("i-s".concat(i).concat(j)).value !== "") {
                    var errorBool = false;
                    if (!document.getElementById("i-s".concat(i).concat(j)).value.isANumber()) {
                        document.getElementById("d-s".concat(i).concat(j)).style.border = "solid 2px red";
                        errorBool = true;
                    }
                    if (!errorBool) { temp_row[temp_row.length] = parseInt(document.getElementById("i-s".concat(i).concat(j)).value); } else { temp_row[temp_row.length] = 0; }
                    if (j === 5) break InsideLoop;
                    j++;
                }
            matrixTwo[matrixTwo.length] = temp_row;
            j = 0;
            if (i === 5) break OutsideLoop;
            i++;
        }
    return matrixTwo;
}


function addAnswer() {
    ans = showAnswer();
    resetMatrix();
    for (i = 0; i < ans.length; i++) {
        for (j = 0; j < ans[0].length; j++) {
            document.getElementById("i-f".concat(i).concat(j)).value = ans[i][j];
        }
    }
}

// END division 1 ;;;;


/* division 2 : Calulating Operations
    conists of { sum , multiply , inverse , determinant , boolean sum , boolean multiply}     
start :
     */
function M_multiplyScaller(num, mat) {
    for (i = 0; i < mat.length; i++) {
        for (j = 0; j < mat[0].length; j++) {
            mat[i][j] *= num;
        }
    }
    return mat;
}

function M_sum(mat1, mat2) {
    if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) {
        return "DIMENSION_ERROR";
    }
    ret_mat = [];
    for (i = 0; i < mat1.length; i++) {
        temp = [];
        for (j = 0; j < mat1[0].length; j++) {
            temp[j] = mat1[i][j] + mat2[i][j];
        }
        ret_mat[i] = temp;
    }
    return ret_mat;
}

function M_multiply(mat1, mat2) {
    if (mat1[0].length !== mat2.length) {
        return "DIMENSION_ERROR";
    }
    ret_mat = [];
    l = mat2.length;
    elem = 0;
    for (i = 0; i < mat1.length; i++) { //first loop
        temp = [];
        for (j = 0; j < mat2[0].length; j++) { //second loop
            elem = 0;
            for (k = 0; k < l; k++) { //third loop
                elem += mat1[i][k] * mat2[k][j];
            } //end third loop
            temp[j] = elem;
        } //end second loop
        ret_mat[i] = temp;
    } //end first loop
    return ret_mat;
}

function M_multiply_oneByOne(mat1, mat2) {
    if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) return false;
    ans = []
    for (i = 0; i < mat1.length; i++) {
        ans.push([]);
        for (j = 0; j < mat1[0].length; j++) {
            ans[i].push(mat1[i][j] * mat2[i][j]);
        }
    }
    return ans;

}

function M_transpose(mat) {
    ret_mat = [];
    for (i = 0; i < mat.length; i++) {
        for (j = 0; j < mat[0].length; j++) {
            if (i == 0) {
                ret_mat[j] = [];
            }
            ret_mat[j][i] = mat[i][j];
        }
    }
    return ret_mat;
}

function M_boolean(mat) {
    if (mat === "DIMENSION_ERROR") return mat;
    ret_mat = [];
    for (i = 0; i < mat.length; i++) {
        ret_mat[i] = []
        for (j = 0; j < mat[0].length; j++) {
            if (mat[i][j]) { ret_mat[i][j] = 1; } else { ret_mat[i][j] = 0; }
        }
    }
    return ret_mat;
}



function isBinary(matrix) {
    if (matrix.length !== matrix[0].length) return false;
    for (i = 0; i < matrix.length; i++) {
        for (j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] != 0 && matrix[i][j] != 1) return false;
        }
    }
    return true;
}

function isSmaller(mat1, mat2) {
    if (mat1.length !== mat2.length || mat1[0].length !== mat2[0].length) return false;
    for (i = 0; i < mat1.length; i++) {
        for (j = 0; j < mat1[0].length; j++) {
            if (mat1[i][j] > mat2[i][j]) return false;
        }
    }
    return true;
}

function isReflective(matrix) {
    for (i = 0; i < matrix.length; i++) {
        if (matrix[i][i] != 1) return false;
    }
    return true;
}
/*
function isSymmetric(matrix) {
    return (M_transpose(mat) === mat);
}

function isAsymmetric(matrix) {
    return (M_transpose(mat) === M_multiplyScaller(-1, mat));
}
*/
function isSymmetric(mat) {
    for (i = 0; i < mat.length; i++) {
        for (j = i; j < mat.length; j++) {
            if (mat[i][j] === 1 && mat[j][i] === 0 || mat[i][j] === 0 && mat[j][i] === 1) return false;
        }
    }
    return true;
}

function isAsymmetric(mat) {
    for (i = 0; i < mat.length; i++) {
        for (j = i + 1; j < mat.length; j++) {
            if (mat[i][j] === 1 && mat[j][i] === 1) return false;
        }
    }
    return true;
}


function isTransitive(matrix) {
    return (isSmaller(M_boolean(M_multiply(matrix, matrix)), matrix));
}

// START INVERSE **********************************************
function kahad(mat, m, n) { //TESTED OK!
    ret = [];
    OUT:
        for (i = 0; i < mat.length; i++) {
            if (i === m) i++;
            if (i === mat.length) break OUT;
            temp = [];
            IN:
                for (j = 0; j < mat.length; j++) {
                    if (j === n) j++;
                    if (j === mat.length) break IN;
                    temp.push(mat[i][j]);
                }
            ret.push(temp);
        }
    return ret;
}

// 2*2
function det_two(mat) {
    return mat[0][0] * mat[1][1] - mat[1][0] * mat[0][1];
}

function inverse_two(mat) {
    ret = [
        [],
        []
    ];
    ret[0][0] = mat[1][1];
    ret[1][1] = mat[0][0];
    ret[1][0] = -1 * mat[1][0];
    ret[0][1] = -1 * mat[0][1];
    addDet(det_two(mat));
    return ret;
}

//3*3

function Cof_three(mat) { // Tested OK!!!!
    Cof = [];
    for (p = 0; p < mat.length; p++) {
        tmp = [];
        for (s = 0; s < mat[0].length; s++) {
            tmp.push(det_two(kahad(mat, p, s)) * ((p + s) % 2 === 0 ? 1 : -1));
        }
        Cof.push(tmp);
    }
    return Cof;
}


function det_three(mat) { //Tested OK!!!
    CofA = Cof_three(mat);
    det = 0;
    for (i = 0; i < 3; i++) {
        det += mat[0][i] * CofA[0][i];
    }
    return det;
}

function inverse_three(mat) {
    addDet(det_three(mat));
    return M_transpose(Cof_three(mat));
}


// 4*4



function Cof_four(mat) {
    CofB = [];
    for (pa = 0; pa < mat.length; pa++) {
        tmpA = [];
        for (sa = 0; sa < mat[0].length; sa++) {
            tmpA.push(det_three(kahad(mat, pa, sa)) * ((pa + sa) % 2 === 0 ? 1 : -1));
        }
        CofB.push(tmpA);
    }
    return CofB;
}


function det_four(mat) {
    CofZ = Cof_four(mat);
    det = 0;
    for (i = 0; i < 4; i++) {
        det += mat[0][i] * CofZ[0][i];
    }
    return det;
}

function inverse_four(mat) {
    addDet(det_four(mat));
    return M_transpose(Cof_four(mat));
}
//5*5

function Cof_five(mat) {
    CofC = [];
    for (pb = 0; pb < mat.length; pb++) {
        tmpB = [];
        for (sb = 0; sb < mat[0].length; sb++) {
            tmpB.push(det_four(kahad(mat, pb, sb)) * ((pb + sb) % 2 === 0 ? 1 : -1));
        }
        CofC.push(tmpB);
    }
    return CofC;
}


function det_five(mat) {
    CofX = Cof_five(mat);
    det = 0;
    for (i = 0; i < 5; i++) {
        det += mat[0][i] * CofX[0][i];
    }
    return det;
}

function inverse_five(mat) {
    addDet(det_five(mat));
    return M_transpose(Cof_five(mat));
}


//6*6

function Cof_six(mat) {
    CofD = [];
    for (pc = 0; pc < mat.length; pc++) {
        tmpC = [];
        for (sc = 0; sc < mat[0].length; sc++) {
            tmpC.push(det_five(kahad(mat, pc, sc)) * ((pc + sc) % 2 === 0 ? 1 : -1));
        }
        CofD.push(tmpC);
    }
    return CofD;
}


function det_six(mat) {
    CofY = Cof_six(mat);
    det = 0;
    for (i = 0; i < 5; i++) {
        det += mat[0][i] * CofY[0][i];
    }
    return det;
}

function inverse_six(mat) {
    addDet(det_six(mat));
    return M_transpose(Cof_six(mat));
}



//END INVERSE ********************************

function inverse(mat) {
    if (mat.length === mat[0].length && mat.length > 1) {
        size = mat.length;
    } else { return "DIMENSION_ERROR"; }
    switch (size) {
        case 2:
            return inverse_two(mat);
        case 3:
            return inverse_three(mat);
        case 4:
            return inverse_four(mat);
        case 5:
            return inverse_five(mat);
        case 6:
            return inverse_six(mat);
        default:
            return "DIMENSION_ERROR";
    }
}

// tuples

function inMul(a, b) {
    if (a.length !== b.length) return false;
    ret = 0;
    for (i = 0; i < a.length; i++) {
        ret += a[i] * b[i];
    }
}

function outMul(a, b) {
    if (a.length !== 3 || b.length !== 3) return false;
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}




// END division 2 ;;;;

/* division 3 : Return and print data ;;
 */



function getAnswer(op, mat1, mat2) {
    var ret_mat;
    switch (op) {
        case "sum":
            ret_mat = M_sum(mat1, mat2);
            break;
        case "multiply":
            ret_mat = M_multiply(mat1, mat2);
            break;
        case "transpose":
            ret_mat = M_transpose(mat1);
            break;
        case "boolean_multiply":
            ret_mat = M_boolean(M_multiply(mat1, mat2));
            break;
        case "boolean_sum":
            ret_mat = M_boolean(M_sum(mat1, mat2));
            break;
        case "inverse":
            ret_mat = inverse(mat1);
            break;
        default:
            ret_mat = "ERROR";
    }
    return ret_mat;
}

function showAnswer() {
    mat1 = getMatrixOne();
    mat2 = getMatrixTwo();
    op = getOperation();
    answer = getAnswer(op, mat1, mat2);
    if (answer === "DIMENSION_ERROR") {
        if (op === "sum") {
            showAlert(answer, "Two matrices of same dimensions can be summed<br /> ".concat(mat1.length).concat("*").concat(mat1[0].length).concat(" and ").concat(mat2.length).concat("*").concat(mat2[0].length));
        } else if (op === "multiply") {
            showAlert(answer, "Number of first matric's columns must be equal to second matric's rows<br />".concat(mat1[0].length).concat(" and ").concat(mat2.length));
        }
        return answer;
    }
    resetMatrix(true);

    for (i = 0; i < answer.length; i++) {
        for (j = 0; j < answer[0].length; j++) {
            temp = answer[i][j];
            if (temp === "undefined") {
                temp = "ERROR";
            }
            document.getElementById("i-a".concat(i).concat(j)).value = temp;
            document.getElementById("d-a".concat(i).concat(j)).style.borderBottom = "solid 1px #201";
        }
    }
    if (op === "inverse") { document.getElementById("det").style.display = "block"; } else {
        document.getElementById("det").style.display = "none";
    }
    return answer;
}

function printAnswer(answer) {
    for (i = 0; i < answer.length; i++) {
        for (j = 0; j < answer[0].length; j++) {
            temp = answer[i][j];
            if (temp === "undefined") {
                temp = "ERROR";
            }
            document.getElementById("i-a".concat(i).concat(j)).value = temp;
            document.getElementById("d-a".concat(i).concat(j)).style.borderBottom = "solid 1px #201";
        }
    }
    return answer;
}

function addDet(det) {
    document.getElementById("det").style.display = "block";
    document.getElementById("det_num").innerHTML = det;
    return 0;
}

function getProperties() {
    mat = getMatrixOne();
    elem = document.getElementById("properties");
    if (!isBinary(mat)) {
        elem.style.display = "none";
        elem.innerHTML = "";
        return false;
    }
    str = "<br />";
    if (isReflective(mat)) { str += "Reflective<br />"; }
    if (isSymmetric(mat)) { str += "Symmetric<br />"; }
    if (isAsymmetric(mat)) { str += "Asymmetric<br />"; }
    if (isTransitive(mat)) { str += "Transitive<br />"; }
    if (isSymmetric(mat) && isReflective(mat) && isTransitive(mat)) { str += "<hr />Equvilance" }
    elem = document.getElementById("properties");
    elem.style.display = "block";
    elem.innerHTML = str;
}


// END division 3 ;;;