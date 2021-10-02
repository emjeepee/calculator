








// The whole of this app's code is in the 
// following init function:
const init = () => {

//---------------------------------------------------------------------

//---------------------------------------------------------------------

let overflowPara = document.querySelector("#overflowPara") ;
let truncatePara = document.querySelector("#truncatePara") ;
let ACkey = document.querySelector("#ACkey") ;
let cancelKey = document.querySelector("#cancelKey") ;

// For the dot key
let dotKey = document.querySelector("#dotKey") ;

//For the instructions steel button:
let ssInstructionsDiv = document.querySelector("#ssInstructionsDiv") ;

//For the walnut instructions drawer:
let walnutInstrDrawer = document.querySelector("#walnutInstrDrawer") ;



// The following is obviously global!!!
// (arrayOfPara1Refs and arrayOfPara2Refs have to be 
// global (for some reason) -- an fn in a setTimeOut refers
// to them (in myDisplayText) and if they're not 
// global they're not seen by the code in the fn! ).
let arrayOfPara1Refs =[]
let arrayOfPara2Refs =[]
for (let k = 0; k < 10 ; k++) {
    posNo   =  (10-k)
    idPara1 = "pos" + posNo + "para1"
    idPara2 = "pos" + posNo + "para2"
    arrayOfPara1Refs.push(document.getElementById(idPara1))
    arrayOfPara2Refs.push(document.getElementById(idPara2))
                                  } // end for
// So arrayOfPara1Refs is [*refForPos10para1*, *refForPos9para1*, *refForPos8para1*, ...]
// and 
// arrayOfPara2Refs is [*refForPos10para2*, *refForPos9para2*, *refForPos8para2*, ...]
// and each array is of length 10
//----------

// A rounding function, taken from 
// https://stackoverflow.com/questions/7342957/how-do-you-round-to-1-decimal-place-in-javascript
function round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
                                 } // end fn
//----------



// KEEP
// THE FOLLOWING DOESN'T WORK -- debugger says 
// "[] is not a funtion" whatever that means,
// pointing to the line beginning 
// (function (){ below!
// Now use an IIFE to get references to both  
// <p>s in each porthole div. Then put the refs
// into arrays.
// IIFE format: (function () { // do stuff ; })();
/*
// For the display portholes:
(function (){
    for (let k = 0; k < 10 ; k++) {
    posNo   =  (10-k)
    idPara1 = "pos" + posNo + "para1"
    idPara2 = "pos" + posNo + "para2"
    arrayOfPara1Refs.push(document.getElementById(idPara1))
    arrayOfPara2Refs.push(document.getElementById(idPara2))
                                  } // end for

})() // end self-invoking fn
*/
// END KEEP

// The following is a global function that 
// myDisplayText uses. If that is the only class that uses it
// put it in that class rather having it global as it is now
function stringToArray(strng) {
    
    let myArr = []
    for (let i = 0; i < strng.length; i++) {
        myArr.push( strng.substr(i,1)  )
    // use str.substr(7, 6)-- means 6 chars from and incl [7] 
                                           } // end for
    return myArr
                               } // end fn

//---------------------------------------------------------------------


// EVENT LISTENERS

// Now an event listener for the 
// steel instructions button:
ssInstructionsDiv.addEventListener("click", animateDrawer)

// A GLOBAL(!!!) var for the event listener callback below:  
let closed = true

// The callback for the event listener above
function animateDrawer() {
      event.stopPropagation();

      // if drawer is open:  
    if (closed) {
        document.getElementById('walnutInstrDrawer').classList.remove('instrDrawerDiv');
        document.getElementById('walnutInstrDrawer').classList.remove('instrDrawerDivCLOSE');
        document.getElementById('walnutInstrDrawer').classList.add('instrDrawerDivOPEN');
        closed = false
                } 
                
                else {// if drawer isclosed 
            document.getElementById('walnutInstrDrawer').classList.remove('instrDrawerDiv');
        document.getElementById('walnutInstrDrawer').classList.remove('instrDrawerDivOPEN');
        document.getElementById('walnutInstrDrawer').classList.add('instrDrawerDivCLOSE');
        closed = true
                        } // end if
                        
                    }




// Add the same event listener to all operand divs (ie buttons)
// and a different one to all operator divs (WHY!!!?). Here operand means 
// all numbers and dot, operator means the rest ofthe keys:
document.querySelectorAll('.keyClassOperand').forEach(item => {
    item.addEventListener('click', respondToOperandKey)
                                                       })

document.querySelectorAll('.keyClassOperator').forEach(item => {
    item.addEventListener('click', respondToOperatorKey)
                                                       })

// Add event listener to document to listen for keydown.
// The callback to this event listener eventually mimics
// the callback for a calculator-button click. 
// The callback must call globl fn respondToKeyboardKeyPress and 
// give it as arg an array that contains two string members
// that contain info about the keboard key pressed.
// This aray matches the one created by the callback for
// the calculator button click event listener.
// The array to create is, eg, ["1", "operand"].
// respondToKeyboardKeyPress calls 
// myMain.actOnKeyPressPublic(valuePlusTypeArr).
//  

document.addEventListener('keydown', function (event) {
let keyboardKeyCode = "" ;
let keyboardKeyPressed  = "" ;

    if (event.key === 'c' || event.key === '0' || event.key === '1' ||
        event.key === '2' || event.key === '3' || event.key === '4' ||
        event.key === '5' || event.key === '6' || event.key === '7' ||  
        event.key === '8' || event.key === '9' || event.key === '.' ||    
        event.key === '-' || event.key === '+' || event.key === '*' ||    
        event.key === '/' || event.key === '=' || event.key === 'a'
        ) {
    // get the value of the keyboard key pressed
    // (ECMAScript 2015 deprecated "keyCode"):
    keyboardKeyCode = event.key || event.keyCode ;
    // Convert the key value to a string:
    keyboardKeyPressed = keyboardKeyCode.toString()
    // keyboardKeyPressed now is, eg, "5" or "c"
          } // end if
 
// Now use the table below to create
    // the array to send to fn respondToKeyboardKeyPress
    // (and from that fn to myMain.actOnKeyPressPublic):

/*
Calc button      data-value        data-symbolType   
------------------------------------------
AC               "AC"                 "AC"
C                "cancel"             "cancel"
*,-,+            "*","-","+"          "multPlusMinus"
/                "/"                  "divide"
1-9            "1"-"9"          "number1-9"
0                "0"                  "number0" 
.                "."                  "dot"
=                "="                  "="

*/
if (keyboardKeyPressed == "a") {
        // reset event listener on dotKey div (button)
    // and reset flag:
    dotKey.addEventListener("click", respondToOperandKey)
    // Alow operation of thedot key again:
    myDotFlagContainer.publicSetFlag(true)
    respondToKeyboardKeyPress(["AC", "AC"])
                               }  // end if

if (keyboardKeyPressed == "c") {
        // reset event listener on dotKey div (button)
    // and reset flag:
    dotKey.addEventListener("click", respondToOperandKey)
    
    respondToKeyboardKeyPress(["cancel", "cancel"])
                               }  // end if



if (
keyboardKeyPressed == "*" ||
keyboardKeyPressed == "+" ||
keyboardKeyPressed == "-"
   ) {
    // reset event listener on dotKey div (button)
    // and reset flag:
    dotKey.addEventListener("click", respondToOperandKey)
    // Alow operation of thedot key again:
    myDotFlagContainer.publicSetFlag(true)
    respondToKeyboardKeyPress([keyboardKeyPressed, "multPlusMinus"])
     }  // end if

if (
keyboardKeyPressed == "/"
   ) {
    // reset event listener on dotKey div (button)
    // and reset flag:
    dotKey.addEventListener("click", respondToOperandKey)
    // Alow operation of thedot key again:
    myDotFlagContainer.publicSetFlag(true)
    respondToKeyboardKeyPress([keyboardKeyPressed, "divide"])
     }  // end if


if ( 
keyboardKeyPressed == "1" ||
keyboardKeyPressed == "2" ||
keyboardKeyPressed == "3" ||
keyboardKeyPressed == "4" ||
keyboardKeyPressed == "5" ||
keyboardKeyPressed == "6" ||
keyboardKeyPressed == "7" ||
keyboardKeyPressed == "8" ||
keyboardKeyPressed == "9" 
   ) {
    respondToKeyboardKeyPress([keyboardKeyPressed, "number1-9"])
     }  // end if

if (keyboardKeyPressed == ".") {
    // A flag has to be set to tell code whether
    // it's OK to to have a dot appear 
    // in the display (obviously it's not OK 
    // to click/type "3.65.6").
    // If the flag is true 
    // i)    send [".", "dot"] as arg
    // to respondToKeyboardKeyPress.
    // ii)   remove event listener from 
    // the dot div 
    // iii)  reset flag
    // If the flag is false 
    // i)  do nothing
    if (myDotFlagContainer.publicGetFlag()) {
        
        // i)
        respondToKeyboardKeyPress([".", "dot"])    
        // ii)
        dotKey.removeEventListener("click", respondToOperandKey)
        // iii)
        myDotFlagContainer.publicToggleFlag()
                                            } // end if

    if (myDotFlagContainer.publicGetFlag() == false) {
        // do nothing
                                                     } // end if
        
                                }  // end if

if (keyboardKeyPressed == "0") {
    respondToKeyboardKeyPress(["0", "number0"])
                               }  // end if

if (keyboardKeyPressed == "=") {
    // reset event listener on dotKey div (button)
    // and reset flag:
    dotKey.addEventListener("click", respondToOperandKey)
    // Alow operation of thedot key again:
    myDotFlagContainer.publicSetFlag(true)
    respondToKeyboardKeyPress(["=", "equals"])
                               }  // end if

                }); // end setting of event listener 


// The fn called by the callback for (relevant) keyboard key presses:
function respondToKeyboardKeyPress(valuePlusTypeArr) {
// If the keyboard key pressed is dot
// disable the 
// Call method of instance of Main class and feed it info
// gleaned from the keyboard key pressed
    myMain.actOnKeyPressPublic(valuePlusTypeArr)
                                                      } // end fn


//--------------------------------------
// The callbacks for the event listeners for clicking the calculator 
// divs (buttons).
// sun12Sept21: I don't remember why there are two that are exactly the same!
// These callback collect data about which key awas clicked and send it
// to an fn of myMain:

function respondToOperandKey(event) {
    
    let arrMember0 = this.getAttribute('data-value') ;
    let arrMember1 = this.getAttribute('data-symbolType') ;
    let valuePlusTypeArr = [arrMember0, arrMember1] ;
// Call method of instance of Main class and feed it info
// gleaned from the key pressed
    myMain.actOnKeyPressPublic(valuePlusTypeArr)
    event.stopPropagation();
                                    } // end fn


function respondToOperatorKey(event) {
    let arrMember0 = this.getAttribute('data-value') ;
    let arrMember1 = this.getAttribute('data-symbolType') ;
    let valuePlusTypeArr = [arrMember0, arrMember1] ;
// Call method of instance of Main class and feed it info
// gleaned from the key pressed
    myMain.actOnKeyPressPublic(valuePlusTypeArr)
    event.stopPropagation();
                                     } // end fn


//---------------------------------------------------------------------

// Instantiations
// Note these must be in this order (for obvious reasons)!  
myDisplayText         = new DisplayText("Deco calculator…") ; 
myCalculatingMachine  = new CalculatingMachine() ;
myLegalityChecker     = new LegalityChecker() ;
myMain                = new Main() ;
myDotFlagContainer    = new DotFlagContainer(true) ;
// Now a counter used by a function in myDisplayText:
myCounterTest         = new CounterTest(1)


//---------------------------------------------------------------------

// Class definitions
// Class Main
// An instance of this class receives input from the key presses:
function Main(startupArr) { // tues21sept21 ends line 959
// Remember that code must only use arg startupArr
// on instantiation

    // first some vars:
let arrToSendToMyCalc      = [] ;
let textToDisplayArr       = [] ;
let everyKeyTypedArr       = ["Startup"] ;
let everyKeyTypedArrOfArrs = [["Startup", "Startup"]] ;
let leadingZeroArray       = [] ;
let workingArray           = [] 
let biggestNumber
let runOfCharReturnArr 

// Helper fns:

//--------

// The following fn calls lookForCharInArrayTest
// and lookForCharInArray to determine 
// whether an array has an
// AC or operator in it going backwards from 
// member[arr.length-2]. This fn returns 
// the index of the nearest AC/operator to 
// the end of the array:  
function findACorOperator(arr, arrOfArrs){

    let ACind = -1
    let multPlusMinusInd = -1
    let divInd = -1
    let startUpInd = -1
    let biggestNumber
    let searchResultAC = lookForCharInArray(arr, "AC")
    let searchResultSU = lookForCharInArray(arr, "startUp")
    let searchResultMultPlusMinus = lookForCharTypInArrOfArrs(arrOfArrs, "multPlusMinus")
    let searchResultDiv = lookForCharInArray(arr, "/")
    if (searchResultAC[0]) {
        
        ACind = searchResultAC[1]
                           } // end if
    if (searchResultMultPlusMinus[0]) {
        
        multPlusMinusInd = searchResultMultPlusMinus[1]
                                      } // end if
    if (searchResultDiv[0]) {
        
        divInd = searchResultDiv[1]
                            } // end if
    if (searchResultSU[0]) {
        
        startUpInd = searchResultSU[1]
                           } // end if                                
    
    biggestNumber = findBiggestOfThree(ACind, multPlusMinusInd, divInd)
    if (biggestNumber-startUpInd > 0) {
        // do nothing
                                      } else {
        biggestNumber = startUpInd                                         
                                              } // end if-else
    return biggestNumber
                                            } // end fn
    
//-------

// This fn determines whether there is 
// an unbroken sequence of the character 
// char from (but not including) ind1 
// to (and including) ind2 in array arr.
// ind1 will be the number returned by
// findACorOperator:
function runOfChar(arr,ind1,char) {

    let myArray = []
    let total = 0
    for (let i = ind1+1; i < (arr.length); i++) {
            myArray.push(arr[i])
                                                } // end for
    
    for (let j = 0; j < myArray.length; j++) {
        if (myArray[j] == char) {
            total += 1 
                                } // end if
                                             } // end for
    
        if (total == myArray.length) {
// If user has clicked only one zero 
// return [false, false]:
if (total == 1) {
    return [false, false]   
                } // end if
            return [true, total]
        
                                     } // end if
    return [false, false]
                                    } // end fn
    
//--------
// This function splices out the excess
// zeros from everyKeyEverTyped and 
// everyKeyEverTypedArayOfArays,
// which are the first two args (ie a run
// of zeros gets converted to one zero). 
// The third arg is the index from which
// to do the splicing
// The fourth arg is the number of chars to remove. 
// The fifth arg is the char to splice in:  
function removeExcessZeros(arr, arrOfArrs, biggest, numToRemove){
    // Remove all the zeros in the run:
    arr.splice(biggest+1, numToRemove)
    arrOfArrs.splice(biggest+1, numToRemove)
    // Put one zero in their place:
    arr.push("0")
    arrOfArrs.push(["0", "number0"])
                                                                } // end fn

//--------

// The following fn looks for the first occurrence 
// of character char in array arr but going backwards 
// from the member at index[arr.length-2]. This 
// fn returns [true, *index*] if
// it's in there or [false, false] if it's not:
function lookForCharInArray(arr, char) {

    for (let i = arr.length-1; i >-1 ; i--) {
    if (arr[i] == char) {

        return [true, i]
                        } // end if
                                         } // end for
    return [false, false]
                                         } // end fn

//--------

// The following fn looks for the first occurrence 
// of character type typ in array or arrays arr 
// but going backwards 
// from the member at index[arr.length-2]. This 
// fn returns [true, *index*] if
// it's in there or [false, false] if it's not:
function lookForCharTypInArrOfArrs(arr, typ) {
    
    for (let i = arr.length-1; i >-1 ; i--) {
        
        if (arr[i][1] == typ) {
        return [true, i]
                        } // end if
                                          } // end for
    return [false, false]
                                         } // end fn
//--------

// The follwowing finds the largest of three numbers,
// none of which equals the other two:
function findBiggestOfThree(num1, num2, num3){

    let biggestNumber
        if (num1 > num2) {
            if (num1 > num3) {
                biggestNumber = num1
                             } else  {
                       biggestNumber = num3
                                } // end if-else
                         } else {
                        if (num2 > num3) {
                            biggestNumber = num2
                                         } else {
                                    biggestNumber = num3
                                                }  // end if-else
                                } // end if-else
    return biggestNumber
                                                    }
    
    //--------
    

// feed this fn arr everyKeyTyped and 
// the index of the divide symbol in 
// an array like this: [[*everyKeyTyped*], *index*].
// This fn will return […, 1, /, 0, +]
function all0sAndDot(arr, indx){
    let intermediateArray = arr 
        // Remove all 0s or a dot from between the divide 
    // and the final symbol in the array
            intermediateArray.splice(indx+1, ((arr.length-1)-(indx+1)))
    // so now arr is […, 1, /, +]
    
    // Now insert a zero after the divide:
    intermediateArray.splice(indx+1, 0, "0");
    // so now intermediateArray is […, 1, /, 0, +]

    return intermediateArray
                                        } // end fn
    
    
  // If arr is, eg, […, 1, /, 0, ., 0, 0, 0, =]
  // find the index of the divide symbol in arr
  // and return either [true, *index*] or [false, false]: 
    function lookForDivide(arr){
    for (let i = arr.length-2; i > -1; i--) {
    if ( // if its mutlPlusMinus 
        // or number1-9 jump out of the fn
        arr[i] == "+" ||
        arr[i] == "-" ||
        arr[i] == "*" ||
        arr[i] == "1" ||
        arr[i] == "2" ||
        arr[i] == "3" ||
        arr[i] == "4" ||
        arr[i] == "5" ||
        arr[i] == "6" ||
        arr[i] == "7" ||
        arr[i] == "8" ||
        arr[i] == "9" ||
        arr[i] == "AC" 
       )
                        {
        return [false, false]
                         } // end if multPlusMinus
    
    if ( arr[i] == "/") {
        return [true, i]
                        } //end if "/"
                                            } // end for
    
                                            } // end fn
    


// The following fn returns, eg, 
//  […, *number0-9*, "/", "0", "="] if 
// user clicks …number0-9/0000= (any number of zeros)
// or clicks …number0-9/.000000= (any number of zeros)
// or clicks …number0-9/0.000= (any number of zeros)
// otherwise returns [false, false]
function truncZerosAndDot(arrayArg) {
    let zerosDotTestArr = arrayArg
    let divideIndex ; // 
    
// if arrayArg does include a "/" symbol:    
    if(findDivideIndex(arrayArg)[0]){
    // W3 - How to use splice():
    // someArray.splice() changes someArray.
    // From and including position 2, remove 2 items: 
    // fruits.splice(2, 2);
    // and 
    // From and including position 2, remove one element and add two: 
    // fruits.splice(2, 1, "Lemon", "Kiwi");
    zerosDotTestArr.splice( divideIndex+1, (zerosDotTestArr.length-1)-(divideIndex+1), "0" ) ;
    // return [true, […, "/", "0", "="]] :
    return [true, zerosDotTestArr]
                                           } else {// eg use clicked 
                                                   // number0-9*0.000000etc = 
    return [false, false]    
                                                  }

//-----

// This fn returns 
// i)  [true, divideIndex] when arrayArg includes "/"
// ii) [false , false]  when arrayArg does not include "/"    
    function findDivideIndex(arrayArg) {
        // The for loop uses arrayArg.length-2
        // below because arrayArg's last member is 
        // always "=" or an operator (which could be "/"):
    for (let i = arrayArg.length-2; i > -1 ; i--) {
     if (arrayArg[i]!="0" && arrayArg[i]!=".") { // wtf is the point of this outer if?
         if (arrayArg[i]=="/") {
            divideIndex = i
            return [true, divideIndex]
                                } else {
    // arrayArg[i] is, eg, "4"
    // do nothing
    return [false , false]
                                       } // end if-else
                                               } // end if not 0 not dot
                                                  } // end for 
                                         }
                                                    } // end fn truncZerosAndDot

//---


// Now a fn to return the concatenated 
// version of a run of string members in 
// an array of strings. 
// arg start is the starting index (including)
// arg end is the finishing index (not including)
// arg arrayArg is the array:
function sliceConcat(start, end, arrayArg) {
    let st = start
    let en = end 
    let newArray = arrayArg.slice(st, en)
    let stringToReturn = ""
    for (let i = 0; i < newArray.length; i++) {
        stringToReturn = stringToReturn.concat(newArray[i])
                                              } // end for      
        return stringToReturn
                                                   } // end fn
    
//---    

// Now a helper fn to check if two arrays are the same.
// Apparently only works if arrays' members are
// primitives (rather than objects)
function arrayEquals(a, b) {
    return Array.isArray(a) &&
      Array.isArray(b) &&
      a.length === b.length &&
      a.every((val, index) => val === b[index]);
                              } // end fn

// Now a helper used when the user 
// has clicked "=" after a number 
// (of any length) to determine what 
// came before the number. This fn 
// returns [false, i] when that character
// is "AC" or "startUp" and returns 
// [true, i] when the character is an operator:
function testForIllegalEquals(){
    
    for (let i = (everyKeyTypedArr.length-2); i > -1 ; i--) {
        if (
            (parseInt(everyKeyTypedArr[i]) < 10 ) ||
            (everyKeyTypedArr[i] == ".")
           ) 
        {
        // do nothing
        } else { // if everyKeyTypedArr[i] = +-*/, =, startUp, AC 
            if ((everyKeyTypedArr[i] == "AC") ||
                (everyKeyTypedArr[i] == "startUp") 
               )
                {
                return [false, i]
                } else { // if everyKeyTypedArr[i] = +-*/, =
                    return [true, i]
                       } // end if-else
               } // end if-else
                                                               } // end for
                               } ; // end fn

//---

    // Event listener calls the following function:
    // Check the key is legal. If so act in a way that 
    // depends on the keypressed.
    // arrayArg below is, eg, ["*" , "operator"] or ["4", "operand"]
this.actOnKeyPressPublic = function (arrayArg) {
    actOnKeyPressPrivate(arrayArg)
                                               } // end callActOnKeyPress()
function actOnKeyPressPrivate(arrayArg) { // this LONG fn ends on line 
        // On instantiation of this class this fn
    // rxes as arg ["startUp", "startUp"]
    // On the press of a calculator button 
    // this fn rxes, eg, ["*" , "operator"] or 
    // ["0", "operand"]. 
    
    // This fn does 4 things: 
    // 1) passes the rxed array to instance 
    // fn legalityCheckPublic of myLegalityChecker, 
    // which checks whether the button pressed was 
    // legal or not. 
    // If legal, legalityCheckPublic returns, eg, 
    // [true, ["AC", "AC"]]
    // If not legal, legalityCheckPublic returns, eg, 
    // [false, ["0", "zero"]].
    // Code also changes array permNextSymbol 
    // of myLegalityChecker to the appropriate value.
    // 2) adds the key symbol to everyKeyTypedArr
    // and the key symbol array to everyKeyTypedArrOfArrs
    // (and in the case of only the cancel key removes 
    // that addition)
    // 3) fills array arrToSendToMyCalc in a way 
    // that depends on what button was clicked and  
    // the circumstances under which the user clicked it.
    // 4) Send arrToSendToMyCalc to myCalculatingMachine
    
    // When button click was legal:

    // case 1) 
    // user clicks C key ( "cancel")
    // legalityCheckPublic rxes ["cancel", "cancel"] (arrayArg below)
    // If legal legalityCheckPublic returns [true, ["cancel", "cancel"]] ).
    // Code now changes myMain's arrToSendToMyCalc to either 
    // [ [], ["whatToDo", "cancel"]] or 
    // [ [], ["whatToDo", "displayACsymbol"]]
    // depending on circumstances.
    // This is the only key whose click code does not 
    // represent by adding a member to arrays 
    // everyKeyTypedArr everyKeyTypedArrOfArrs (or at 
    // least code adds it then removes it).

    // case 2)
    // user clicks on "AC"  
    // legalityCheckPublic rxes ["AC", "AC"] (arrayArg below)
    // and returns [true, ["AC", "AC"]] ).
    // Code now changes arrToSendToMyCalc to [ [], ["whatToDo", "displayACsymbol"]].
    // Code also changes permitted next symbol to appropriate value
    // (by calling an fn of myLegalityChecker).


    // case 2) 
    // user clicks on "*", "/", "+" or "-"   
    // legalityCheckPublic rxes, eg, ["+", "multPlusMinus"] (arrayArg below)
    // and returns [true, ["+", "multPlusMinus"]])
    // Code changes arrToSendToMyCalc to [ [], ["whatToDo", "store"]].
    // Code also changes permitted next symbol to appropriate value.
    // Code changes arrToSendToMyCalc to [ [], ["whatToDo", "store"]].
    // Code also changes permitted next symbol to appropriate value.

    // case 4) 
    // user clicks on "="
    // legalityCheckPublic rxes, eg, ["=", "equals"] (arrayArg below)
    // and returns [true, ["=", "equals"]])
    // Code changes arrToSendToMyCalc to [ [], ["whatToDo", "calculate"]].
    // Code also changes permitted next symbol to appropriate value.

    // case 5)
    // user clicks a number from 1 to 9 
    // legalityCheckPublic rxes, eg, ["5", "number1-9"] or ["7", "number1-9"] (arrayArg below)
    // and returns, eg, [true, ["5", "number1-9"]]).
    // If this number comes after a dot then 
    // code must disable all keys for numbers 0 to 9 and for dot
    // Code now changes arrToSendToMyCalc to [ [], ["whatToDo", "store"]].
    // Code must change permitted next symbol to appropriate value.

    // Case 6) 
    // user clicks 0 
    // legalityCheckPublic rxes ["0", "zero"] (arrayArg below)
    // Code must now change arrToSendToMyCalc to [ [] ["whatToDo", "store"]]
    // or [ [".", "leading zero dot"] ["whatToDo", "store"]] depending 
    // on an if (explanation to follow).
    // Code must change permitted next symbol to appropriate value.

    // Case 7) 
    // user clicks dot 
    // legalityCheckPublic rxes [".", "dot"] (arrayArg below)
    // Code must now change arrToSendToMyCalc to [ [] ["whatToDo", "store"]]
    // or [ [".", "leading zero dot"] ["whatToDo", "store"]] depending 
    // on an if (explanation to follow).
    // Code must change permitted next symbol to appropriate value.
    
    // case 8) 
    // Button click was NOT legal:
    // legalityCheckPublic rxes, eg, ["*", "multPlusMinus"] and   
    // returns [false, ["*", "multPlusMinus"]])
    // Code now changes arrToSendToMyCalc to [ [], ["whatToDo", "warning"]].
    
    
    // If key press is legal:
    if ((myLegalityChecker.legalityCheckPublic(arrayArg) )[0] == true) {
        
        // First reset the array myMain will send to myCalculatingMachine  
        arrToSendToMyCalc = [ ] ;
        // Now put the key clicked on into array everyKeyTypedArr
        // This only happens if the key pressed was legal
        everyKeyTypedArr.push(arrayArg[0])
        // Now put the array of the key clicked on into array everyKeyTypedArrOfArrs
        // This only happens if the key pressed was legal: 
        everyKeyTypedArrOfArrs.push(arrayArg)
        // everyKeyTypedArr.length
        // everyKeyTypedArrOfArrs.length

        // Case 1)        
if (arrayArg[0] == "cancel") {
    
    // first remove the c symbol just put into everyKeyTypedArr
    // (because the cancel symbol is the only one that doesn't
    // get put into that array):
    everyKeyTypedArr.pop()
    everyKeyTypedArrOfArrs.pop()

// if the user typed, eg, 
// 3405c  or
// 
// Remember that everyKeyTypedArr is now ["3","4","0","5"]
// because code does not add "c" to it (or adds it then 
// removes it in the line above!).
// case i)
// If previous character was number0-9 or operator and 
// the character before that wasn't an AC or =:

    if (
        (
         (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "number1-9" ||
         (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "number0" ||
         (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "minus" ||
         (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "multPlus" ||
         (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "divide" 
        ) 
         &&
        (
         everyKeyTypedArr[everyKeyTypedArr.length-2] != "AC" &&
         everyKeyTypedArr[everyKeyTypedArr.length-2] != "="
        )
       ) {
           
            // remove the last character and character array from relevant arrays:
            everyKeyTypedArrOfArrs.pop()
            everyKeyTypedArr.pop()
            
            arrToSendToMyCalc.push([])
            arrToSendToMyCalc.push(["whatToDo", "cancel"])

            // change permNextSymbol
            myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
         } // end if

// case ii)         
// If previous char was a dot         
if ((everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "dot") {
    everyKeyTypedArrOfArrs.pop()
    everyKeyTypedArr.pop()
    
    // re-enable dot key:
    dotKey.addEventListener('click', respondToOperandKey)
    arrToSendToMyCalc = [[ ], ["whatToDo", "cancel"]]
    
    // change permNextSymbol
    myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;

                                                    } // end if

// case iii)
// If previous char was a number0-9 and the 
// char before that was AC          
if (
    ( (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "number1-9" ||
      (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-1])[1] == "number0"   ) &&
      (everyKeyTypedArrOfArrs[everyKeyTypedArrOfArrs.length-2])[1] == "AC" 
   )
 {
    everyKeyTypedArrOfArrs.pop()
    everyKeyTypedArr.pop()
    
    arrToSendToMyCalc.push([AC, AC])
    arrToSendToMyCalc.push(["whatToDo", "displayACsymbol"])

    // change permNextSymbol
    myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;

  } // end if

                               } // end if key clicked was "cancel"



        // Case 1)
        if (arrayArg[0] == "AC") {
            
            // First re-enable the dot key:
            dotKey.addEventListener('click', respondToOperandKey)
            // Reset arrToSendToMyCalc -- has already been reset!:
            // arrToSendToMyCalc = [] ;
            // arrayArg is ["AC", "AC"]
            arrToSendToMyCalc = [ [ ] ] ;
            // Now leave message for myCalculation saying display required:
            arrToSendToMyCalc.push(["whatToDo", "displayACsymbol"])
            // so arrToSendToMyCalc is now:
            // [ [ ], ["whatToDo", "displayACsymbol ]
            // Change the permitted next symbol:
            myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
                                 } // end if





        // Case 2)     if user clicked an operator
        if (arrayArg[1] == "multPlus" || arrayArg[1] == "divide" || arrayArg[1] == "minus") {
            // First re-enable the dot key:
            dotKey.addEventListener('click', respondToOperandKey)
            
            // Deal with the pressing of two minuses:
            // If user clicked "-" and the key 
            // clicked before that was "-" set 
            // permNextSymbol 
            // to prevent a third minus (or any 
            // other not-permitted symbol):
            if ( arrayArg[1] == "minus" ) {
                // Deal with the case of a third minus:
                if (                    
                    (everyKeyTypedArr[(everyKeyTypedArr.length-2)] == "-") &&
                    (
                     (everyKeyTypedArr[(everyKeyTypedArr.length-3)] == "-")  ||
                     (everyKeyTypedArr[(everyKeyTypedArr.length-3)] == "+")  ||
                     (everyKeyTypedArr[(everyKeyTypedArr.length-3)] == "*")  ||
                     (everyKeyTypedArr[(everyKeyTypedArr.length-3)] == "/")  ||
                     (everyKeyTypedArr[(everyKeyTypedArr.length-3)] == "AC") ||
                     (everyKeyTypedArr[(everyKeyTypedArr.length-3)] == "startUp")
                    )
                   ) {
                        arrToSendToMyCalc.push([], ["whatToDo", "warning"])
                        // now remove the "=" from the end of everyKeyTypedArr
                        // and everyKeyTypedArrOfArrs:
                        everyKeyTypedArr.pop()
                        everyKeyTypedArrOfArrs.pop()
                      } else {// if it's, eg, "1", "-"
arrToSendToMyCalc.push(arrayArg) ;
// Now leave message for myCalculation saying calculation required:
arrToSendToMyCalc.push(["whatToDo", "store"])
// so arrToSendToMyCalc is now, eg:
// [ ["+", "multPlusMinus"], ["whatToDo", "store"] ]
// Change the permitted next symbol:
myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
                             }   
                                          } // end if it's a minus

// If arrayArg is ["+", "multPlus"] or ["/", "divide"]
                 if(
                    arrayArg[1] == "multPlus" ||
                    arrayArg[1] == "divide"   ||
                    arrayArg[1] == "minus" 
                   ) {
arrToSendToMyCalc.push(arrayArg) ;
// Now leave message for myCalculation saying calculation required:
arrToSendToMyCalc.push(["whatToDo", "store"])
// so arrToSendToMyCalc is now, eg:
// [ ["+", "multPlusMinus"], ["whatToDo", "store"] ]
// Change the permitted next symbol:
myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
                        } // end if
                                                                                            } // end if multPlusMinus or divide
                                             

        // Case 4)                                                                      
        if (arrayArg[0] == "=") {
            
            // First re-enable the dot key:
            dotKey.addEventListener('click', respondToOperandKey)
            // Reset arrToSendToMyCalc -- has already been reset!:
            //arrToSendToMyCalc = [] ;
            // first test for /000000= or /000.0000= or /.000=
            // truncZerosAndDot(arrayArg) returns
// return [true, ["/", "0", "="]] or 
// [false, false] 
// truncZerosAndDot deals with:
// user clicking number1-9/0000000000etc=
// or   clicking number1-9/.0000000000etc=
// or   clicking number1-9/0.0000000000etc = 
if (truncZerosAndDot(everyKeyTypedArr)[0]) { // if user tried to divide by 0 
    // remove the = char from everyKeyTypedArr and 
    // remove the last char array from everyKeyTypedArrOfArrs:
    everyKeyTypedArr.pop()
    everyKeyTypedArrOfArrs.pop()
    // change arrToSendToMyCalc to
    // [ [ ], ["warning", "snarky message"] ] : 
    arrToSendToMyCalc = [ [ ] ]
    arrToSendToMyCalc.push(["warning", "snarky message"])
    // now set permNextSymbol to what it was before
    // (the following line changes arrays listOfPermNextSymbolArrays
    // and permNextSymbol):
    myLegalityChecker.goToPreviouslistOfPermNextSymbolArraysPublic()
                                           }  else // If user has NOT tried to divide by zero: 
                { 
                
                // First check whether user has
                // clicked either eg, "startUp", "2", "2", "=" or
                //                    "AC", "34", "="
                // (ie clicked = illegally).
                if ( testForIllegalEquals()[0] ) // ie user did NOT click "=" illegally
                    { arrToSendToMyCalc = [ [ ] ] ;
                        
                        // Now leave message for myCalculation saying calculation required:
                        arrToSendToMyCalc.push(["whatToDo", "calculate"])
                        // so arrToSendToMyCalc is now:
                        // [ [ ], ["whatToDo", "calculate"] ]
                        // Change the permitted next symbol:
                        myLegalityChecker.changePermNextSymbolPublic(arrayArg) ; 
                    }  else { // user clicked = illegally
                        arrToSendToMyCalc = [ [ ] ] ;   
                        arrToSendToMyCalc.push(["whatToDo", "warning"])
                        // now remove the "=" from the end of everyKeyTypedArr
                        // and everyKeyTypedArrOfArrs:
                        everyKeyTypedArr.pop()
                        everyKeyTypedArrOfArrs.pop()
                            } // end if-else     
                            
                }   // end if-else (user tried to divide by zero or not)
                                    } // end if user clicked "="



        // case 5) 
        if (arrayArg[1] == "number1-9") {
            
            // Reset arrToSendToMyCalc -- has already been reset!:
            // arrToSendToMyCalc = [] ;
            arrToSendToMyCalc = [arrayArg] ;
            // arrayArg is, eg, ["1", "number1-9"]
            // Now leave message for myCalculation saying store 
            // the symbol in the array
            arrToSendToMyCalc.push(["whatToDo", "store"])  
            // so arrToSendToMyCalc is now, eg:
            // [["1", "number1-9"], ["whatToDo", "store"]]
            // Change the permitted next symbol:
            myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
            
                                        } // end if number1-9

        // Case 6)                                                                      
        if (arrayArg[1] == "number0") {
// After the user clicks a 0 fn findACorOperator 
// returns the index of the closest operator, AC 
// or startUp to the 0 in array everyKeyTypedArr 
// (and hence everyKeyTypedArrOfArrs):
biggestNumber = findACorOperator(everyKeyTypedArr, everyKeyTypedArrOfArrs)

runOfCharReturnArr = runOfChar(everyKeyTypedArr,biggestNumber,"0")
// runOfChar() returns either [true, 6] or [false, false]
if (runOfCharReturnArr[0]) { // if this is an unnecessary leading zero

            removeExcessZeros(everyKeyTypedArr, everyKeyTypedArrOfArrs, biggestNumber, runOfCharReturnArr[1])
            arrToSendToMyCalc.push([ ], ["whatToDo", "do nothing"])     
                           }
if (!(runOfCharReturnArr[0])) {  // if this is a necessary zero
    
    // Now leave message for myCalculation saying calculation required:
    
    arrToSendToMyCalc.push(arrayArg, ["whatToDo", "store"])
    // so arrToSendToMyCalc is now:
    // [ [ ], ["whatToDo", "store"] ]
    // Change the permitted next symbol:
    myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
                              } // end if                            

                                     } // end if case 6)


        // Case 7)                                                                      
        if (arrayArg[0] == ".") {
            
            // First disable the dot key
            // to prevent suer clicking 
            // two dots (eg 3.45.6) :
            dotKey.removeEventListener('click', respondToOperandKey)
            // arrayArg is [".", "dot"]
            // If the dot has come after
            // AC or
            // = or 
            // *, /, +, - or 
            // startUp
            // add a leading zero:
            if (
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "AC" ||
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "=" || 
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "*" ||
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "/" ||
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "+" ||
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "-" ||
            everyKeyTypedArr[(everyKeyTypedArr.length)-2] == "startUp" 
                ) {
                // change everyKeyTypedArr. everyKeyTypedArr was, eg
                // […, "AC", "."]:
                everyKeyTypedArr.pop() ;
                everyKeyTypedArr.push("0") ;
                everyKeyTypedArr.push(".") ;
                leadingZeroArray = ["0.", "leading zero dot"]
                arrToSendToMyCalc.push(leadingZeroArray)    
                  }  else {                                                       
            // Reset arrToSendToMyCalc:
            arrToSendToMyCalc = [] ;
            arrToSendToMyCalc = [ arrayArg ] ;
                           } // end if-else
            // Now leave message for myCalculation saying store:
            arrToSendToMyCalc.push(["whatToDo", "store"])
            // so arrToSendToMyCalc is now either:
            // [ ["0.", "leading zero dot"], ["whatToDo", "store"] ]
            // or 
            // [ [".", "dot"], ["whatToDo", "store"] ]
            // Change the permitted next symbol:
            myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
                                 } // end if dot
                                 
// case xx                                 
if (arrayArg[0] == "startUp") {
    
    // First re-enable the dot key:
    dotKey.addEventListener('click', respondToOperandKey)
    arrToSendToMyCalc = [[ ], ["whatToDo", "startUp"]]
    myLegalityChecker.changePermNextSymbolPublic(arrayArg) ;
                              } // end if

                                                                    // end if legal
                                                                        } else { // if not legal
    // case 8)
    
    // if user typed a key that is NOT legal:
    // 2) leave message for myCalculator:
    // Reset arrToSendToMyCalc:
    arrToSendToMyCalc = [] ;
    arrToSendToMyCalc = [ [] ] ;    
    // Now leave message for myCalculation saying do thing:
    arrToSendToMyCalc.push(["whatToDo", "warning"])
    // so arrToSendToMyCalc is now, eg:
    // [ [], ["whatToDo", "warning"] ]
                                                                               } // end if-else legal 
                                                                          

// Now send arrToSendToMyCalc to myCalculatingMachine
sendArrToMyCalcPrivate(arrToSendToMyCalc) ;

                                                    } // end fn

function sendArrToMyCalcPrivate(arr){
    // mon6sept21 The following explanation is out of date:
    // The following fn returns,
// Case 1) Key pressed was "AC": 
// Returns ["largeText", "change", "- -"]
// Case 2) Key pressed was "=": 
// Returns, eg, ["largeText", "change", "34.6"]
// Case 3) Key pressed was legal but not "AC" nor "=", 
// Return, eg, ["largeText", "change", "33+"]
// Case 4) i)  Key press was not legal and NOT 0:
// Return ["smallText", "keep", "Not legal"]:
// Case 4) ii) Key press was not legal and WAS 0:
// Return ["smallText", "keep", "Divide by zero? *&nbsp &nbsp &nbsp, etc*  What were you thinking?"]
textToDisplayArr = (myCalculatingMachine.calculateResultPublic(arr)) ;

// Now send textToDisplayArr to myDisplayText:

myDisplayText.publicSetDisplayText(textToDisplayArr) ;

                                    }   // end fn      
                                    
// Instantiation code
// ==================
// Remember that startupArr is the arg to this CLASS constructor:
actOnKeyPressPrivate(["startUp", "startUp"])

// End of program!
                                } // end Main class def 


//----------------------
// Now a class whose instance Main's instance calls. 
// Main's instance sends this class's instance a key 
// symbol array, eg ["7", "operand"] and this class's
// instance returns either (eg):
// 1)  [true, ["4", "operand"]] 
// or
// 2)  [false, ["-", "operator"]]
// depending on whether the key press was legal or not.

function LegalityChecker() {
    // This class's instance needs to determine what a rxed symbol is.
    // It does this by looking for the symbol in one of many array,
    // listed below:
    let startPermNextSymbol        = ["startUp", "AC", "number1-9", "number0", "dot", "minus"] ;
    let permNextSymbol             = startPermNextSymbol ;
    let allCancelArr               = ["AC"] ;
    let minusArr                   = ["-"] ;
    let multPlusArr                = ["*", "+"] ;
    let divideArr                  = ["/"] ;
    let equalsArr                  = ["="] ;
    let numbers1to9arr             = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] ;
    let zeroArr                    = ["0"] ;
    let dotArr                     = ["."] ;
    let cancelArr                  = ["cancel"] ;
    let listOfPermNextSymbolArrays = [ startPermNextSymbol ] 
    // let listOfPermNextSymbolArrays = [ ["startUp", "AC", "number1-9", "number0", "dot"] ] 
    
    

    
    // NOTE:
/*    All of the key buttons have these two
properties:
1) data-value 
2) data-symbolType

This function makes use of the value 
of a key's data-symbolType property:

Key    data-value      data-symbolType   
------------------------------------------
AC     "AC"            "AC"             
*,+,-   "*","+","_"    "multPlusMinus"        
/       "/"            "divide"
=       "="            "equals"
1-9     "1" to "9"     "number1-9" (regardless of number) 
0       "0"            "number0" 
.       "."            "dot"

*/
    
    // We're in class LegalityChecker

    // The following is a list of arrays, each containing 
    // permitted next symbols. The user clicks a key
    // and (if the key was legal) code changes 
    // permittedNextSymbol to one of the arrays depending on
    // what key the user clicked. myLegalityChecker looks at
    // permittedNextSymbol to determine whether a key clicked
    // was legal or not.

    //1)
    // User clicks "AC":
    // code sets permittedNextSymbol to startPermNextSymbol. This also
    // happens on instantiation of this class, ie on startup
    
    // 2)
    // User clicks "*", "+", or "-":
    const afterMinus = ["AC", "cancel", "number1-9", "number0", "dot", "minus"  ] ;
    // User has clicked two minuses:
    const afterTwoMinuses = ["AC", "cancel", "number1-9", "number0", "dot" ] ;

    // 3)
    // User clicks "*", "+", or "-":
    const afterMultPlus = ["AC", "cancel", "number1-9", "number0", "dot", "minus"  ] ;

    // 4)
    // User clicks "/":
    const afterDivide = ["AC", "cancel", "number1-9", "number0", "dot", "minus"  ] ;
    
    // 5)
    // "=":
    const afterEquals = ["AC", "multPlus", "divide", "minus" ] ;

    // 6)
    //  "1" -> "9":
    const afterNumber1to9 = ["AC", "multPlus", "minus", "divide", "equals", "number1-9", "number0", "dot", "cancel" ] ;
    
    // 7)
    // "0":
    const afterNumber0 = ["AC", "multPlus", "minus", "divide", "equals", "number1-9", "number0", "dot", "cancel" ] ;
 
    // 8)
    // ".":
    const afterDot = ["AC", "multPlus", "minus", "divide", "equals", "number1-9", "number0", "cancel" ] ; 

    // 9)
    // "AC"
    const afterAC = ["AC", "number1-9", "number0", "dot", "minus" ] ;     

    // 10)
    // "startUp"
    const afterStartUp = ["AC", "number1-9", "number0", "dot", "minus" ] ;     

    
// ----    
// A public fn that directly changes permNextSymbol.
// arg arr is, eg, afterDot:
this.directlyChangepermNextSymbol = function (arr) {
    permNextSymbol = arr ;
                                                } // end fn

// A public fn that calls a private fn (below it):
this.legalityCheckPublic = function (symbolArr) {
    return legalityCheckPrivate(symbolArr)
                                                } // end fn

    function legalityCheckPrivate(keySymbolArr) {
        // This fn returns either: 
        // [true,  *keySymbolArr*] or 
        // [false, *keySymbolArr*],  
        // where keySymbolArr is, eg, ["4", "number1-9"] or ["AC", "AC"]
        // or ["*", "multPlus"]
        
        // 1) Check that the key press is legal.
        // Remember inArrayOrNot returns true or false:
        if (inArrayOrNot(keySymbolArr[1], permNextSymbol)){
        // If the user pressed a permitted key:
            return ([true, keySymbolArr])
                                                          } else {
        // If the user pressed a key not permitted:
        return ([false, keySymbolArr])
                                                                 } // end if-else key legal

                                                  } // end fn legalityCheckPrivate()

// ---- 

this.changePermNextSymbolPublic = function (keySymbolArr) {
    changePermNextSymbolPrivate(keySymbolArr) ;
                                                          } // end fn 


function changePermNextSymbolPrivate(keySymbolArr) {
// This fn called when key press was legal
// Change array permNextSymbol depending on what was typed.
// First reset permNextSymbol:

        
        // First check whether startup has occurred:
        if (keySymbolArr[0] == "startUp") {
            permNextSymbol = startPermNextSymbol ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                          } // end if
        // 1)
        // If it's an all cancel (keySymbolArr is ["AC", "AC"]):
        if (keySymbolArr[0] == "AC") {
            permNextSymbol = afterAC ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                         } // end if

        // 2)
        // If it's "*" or "+" (keySymbolArr 
        // is [("*" or "+"), "multPlus"]):
        if (inArrayOrNot(keySymbolArr[0], multPlusArr)) {
            permNextSymbol = afterMultPlus ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                        } // end if

        // 3)
        // If it's "-"(keySymbolArr 
        // is ["-", "minus"]):
        if (keySymbolArr[0] == "-") {
            permNextSymbol = afterMinus ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                        } // end if

        // If user as clicked two minuses (keySymbolArr 
        // is ["--", "minus"]):
        if (keySymbolArr[0] == "--") {
            permNextSymbol = afterTwoMinuses ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                        } // end if
                                                    
        // 4)
        // If it's a divide (keySymbolArr is ["/", "divide"]):
        if (keySymbolArr[0] == "/") {
            permNextSymbol = afterDivide ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                      } // end if
        
        // 5)                                                         
        // If it's an equals (keySymbolArr is ["=", "equals"]):
        if (keySymbolArr[0] == "=") {
            permNextSymbol = afterEquals ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                      } // end if

        // 6)
        // If it's a number from 1 to 9:
        if (inArrayOrNot(keySymbolArr[0], numbers1to9arr)) {
            permNextSymbol = afterNumber1to9 ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                       } // end if

        // 7)
        // If it's a "0":
        if (keySymbolArr[0] == "0") {
            permNextSymbol = afterNumber0  ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                       } // end if                                                    
        // 8)
        // If it's a ".":
        if (keySymbolArr[0] == ".") {
            permNextSymbol = afterDot  ;
            // Add to list of all permitted next symbol arrays:
            listOfPermNextSymbolArrays.push(permNextSymbol) 
                                                       } // end if                                                    

        // 9)
        // If it's a "cancel":
        if (keySymbolArr[0] == "cancel") {
            // Need to remove the last array in listOfPermNextSymbolArrays
            // and set permNextSymbol to the new last array:
            listOfPermNextSymbolArrays.pop() 
            permNextSymbol = listOfPermNextSymbolArrays[(listOfPermNextSymbolArrays.length-1)]
                                                       } // end if                                                    

        // not needed:                                                       
        // return ([true, keySymbolArr]) 
                                                    } // end fn

//------

// Now two fns to take listOfPermNextSymbolArrays to its previous state
// and change permNextSymbol to the last array in that new
// listOfPermNextSymbolArrays:
this.goToPreviouslistOfPermNextSymbolArraysPublic = function () {
    goToPreviouslistOfPermNextSymbolArraysPrivate() ;
                                                          } // end fn 


function goToPreviouslistOfPermNextSymbolArraysPrivate() {
    listOfPermNextSymbolArrays.pop() 
    permNextSymbol = listOfPermNextSymbolArrays[(listOfPermNextSymbolArrays.length-1)]    
                                                         } // end fn



                            } // end class def LegalityChecker

//----------------------------------------------------------

// tues7sept: the following OUT OF DATE
// Now a class that Main uses to calculate the result of 
// the user's key press:
// 1) Generate a string to display ["- - "] if user presses "AC".
//    In this case this class simply returne ["- - "].
// 2) Calculate the result and generate string for it if user presses "=",
//    eg "6453.32"
//    In this case this class must 
//    a) strip the end messages from the array of arrays it rxes.
//    b) reduce the array of arrays it rxes to an array
//    c) If the array above is, say, ["1", "*", "2", "+", "3", "-", "2", "*", "2" ]
//       reduce that array to ["3", "*"  "2"] and hand it to the fn that can 
//       calculate the result of the equation that those three array members 
//       represent                            
// 3) Generate appropriate string if user pressed operand, dot or operator,
//    eg in this sequence: 
//    "3"   [user then types 4] ->
//    "3+4" [user types *] ->
//    "7*"  [user types 2] ->
//    "7*2" [user types -] ->
//    "14-" [user types 13] ->
//    "14-13" , etc
// 4) Generate strings in an array that code shows temporarily when user types an illegal key,
//    maybe ["You can't type that key, pal", "warning"]

// This class has a private method calculateResultPrivate 
// that receives array arrToSendToMyCalc from Main.
// arrToSendToMyCalc contains different things depending on what the key press was:
// Case 1) Key press was "AC": 
// arrToSendToMyCalc = [  ["whatToDo", "displayACsymbol"]  ]
// This fn must simply return string "- -"
// and empty array keyStoreArray.
// Case 2) Key press was "=": 
// arrToSendToMyCalc = [ ["=", "="], ["whatToDo", "calculate"]]
// This fn must calculate the result, empty array keyStoreArray and return, eg, "43.2" 
// Case 3) Key press was legal but not "AC" nor "=", 
// arrToSendToMyCalc =  eg: [ ["1", "operand"], ["whatToDo", "store"] ]
//  
// Case 4) Key press was not legal:
// arrToSendToMyCalc = [ ["whatToDo", "warning"] ].
function CalculatingMachine(){       // thurs16sept ends line 1457
// First some vars
let singleSymbolStore = "" ;
// The following array contains a cumulative list of 
// symbols code must display
let keyStoreArray     = [ ] ;
let keyStoreArrayCompressed = []
// Those used in fn xxxx:
let intermArr         = []  ;
// Those used in fn shortenArray():
    let ccat1               = ""  ;
    let noOperatorPresent   = true  ;
    let shortenedArr        = [] ;
// Those used in fn calcResultOf3Symbols():
    let operandOne = null ;
    let operandTwo = null ;
    let functionStore = {
    "*": function(x,y){return x*y},
    "/": function(x,y){return x/y},
    "+": function(x,y){return x+y},
    "-": function(x,y){return x-y},
                        } ;
    let functionToUse = functionStore["*"];                    
//Those used in calculateResultPrivate:
let arrFromFnReturnArray1

    // 
//---    

// A helper function that  
function reduceArray1New(arr){
    let arrToReturn = arr
    // If arr has length 1, 2 or 3 it is ignored and 
    // simply returned. If > 3 it is changed and returned. 
     if (arr.length > 3) {
        arrToReturn = []
        arrToReturn = changeArray1(arr)
        return [true, arrToReturn] ;
    } else {
        return [false, arrToReturn] ;
           }//end if-else
                             } // end fn


// A helper  function that reduceArray1New 
// employs
// It converts [1, +, 2, +, 3, +] to [6, +]
// [1, +, 2, +, 3, +, 4, +] to [10, +]
// and 
// [1, +, 2, +, 3] to [6] 
// [1, +, 2, +, 3, +, 4] to [10]
function changeArray1(arr){
// Type A
// Need to convert [1, +, 2, +, 3, +] to [6, +]
// Need to convert [1, +, 2, +, 3, +, 4, +] to [10, +]
// and 
// Type B
// Need to convert [1, +, 2, +, 3] to [3, +, 3]
// Need to convert [1, +, 2, +, 3, +, 4] to [6, +, 4]
let iterats
let inter1  = arr[0]
let intermediary1 = [ ]

// If the array is of type A:
if (arr.length%2==0) {
iterats = ((arr.length)-2)/2
                 } 

// If the array is of type B:
if (arr.length%2==1) {
iterats = ((arr.length+1)-2)/2
                 }                      

if (arr.length > 3) {
        for (let i = 0; i < iterats; i++) {
            intermediary1 = [ ]
            intermediary1.push(inter1)
            intermediary1.push(arr[(2*i)+1])
            intermediary1.push(arr[(2*i)+2])
            inter1 = calcResultOf3Symbols(intermediary1) ;
            
            // If the array is of type A:
            if ((arr.length%2==0) && (i == iterats-1)) {
                inter1 = calcResultOf3Symbols(intermediary1) ;
                intermediary1 = [ ]
                intermediary1.push(inter1)
                                                       } // end if
                                          } // end for
// let testArr12     = ["1", "+", "2", "+", "3", "+", "4"]  // --> [10] 
// Add the last symbol if it's an operator:
if (arr[arr.length-1] == "+") { // NOTE: any operator -- change this!!!!
intermediary1.push(arr[arr.length-1])                              
                          } // end if

return intermediary1                                  
                                
                     } // end if length > 3
                         } // end fn
    




// A helper function that takes in resultArray
// from fn xxxxxxx and produces an array to 
// send to myDisplayText: 
function sendToMyDisplayText(arr){
    let arrTosend = arr
    // case 1)
    // If the last char is mult, plus or divide:
    if (
        arr[(arr.length-1)] == "+" ||
        arr[(arr.length-1)] == "*" ||
        arr[(arr.length-1)] == "/"
       ) 
       {
           
        // Remove the last char
        // and send what's left:   
        arrTosend.pop()
        return arrTosend
       } 
       // case 2)
       // If the last char is a number
       if ( 
            arr[(arr.length-1)] != "+" &&
            arr[(arr.length-1)] != "*" &&
            arr[(arr.length-1)] != "-" &&
            arr[(arr.length-1)] != "/" 
          ) { 
           // send the last char:
           arrTosend = arrTosend.slice(arrTosend.length-1)
           
           return arrTosend
              } // end if-else
       
    // if last char is a minus:   
    if (arr[(arr.length-1)] == "-") {
        // case 3)
        // If there's only one char: 
        if (arr.length == 1) {
            
            // send the minus by itself:
            // No code actually needed here!
            arrTosend = arrTosend 
            return arrTosend
                             } // end if
        // case 4)                     
        // If last but one char is an operator:
        if ( 
            arr[(arr.length-2)] == "-" ||
            arr[(arr.length-2)] == "+" ||
            arr[(arr.length-2)] == "*" ||
            arr[(arr.length-2)] == "/" 
            ) {
            
            // Send the last minus:
            arrTosend = arrTosend.slice(arrTosend.length-1)
            return arrTosend
                                        } // end if                    
        // case 5)                                
        // If the last but one char is not an operator:
        if (arr.length>1) {
            if (
                arr[(arr.length-2)] != "*" && 
                arr[(arr.length-2)] != "/" && 
                arr[(arr.length-2)] != "-" && 
                arr[(arr.length-2)] != "+"  
               ) {
                   // send the last but one char:
                   
                   arrTosend.pop()
                   arrTosend = arrTosend.slice(arrTosend.length-1)
                return arrTosend
                 }  // end if    
                          } // end if
        
                                    } // end if last char is minus 
                                         } // end fn
    




// First a helper fn.
// This fn converts an array to a string:
function arrayToString(arr) {

    let stringToReturn = ""

    for (let i = 0; i < arr.length; i++) {

        stringToReturn = stringToReturn.concat(arr[i])
                                         }
    return stringToReturn                                         
                             } // end fn

// A public and a private function 
// to get keyStoreArrayCompressed:

this.getkeyStoreArrayCompressedPublic = function (){
    return (getkeyStoreArrayCompressedPrivate())
                                                    } // end fn

function getkeyStoreArrayCompressedPrivate(){
    return keyStoreArrayCompressed
                                            } // end fn


// First a function that takes an array of strings
// (eg ["1", "1", "1"]) and returns an array of 
// the concatenation of the members of the 
// first array (eg ["111"]):
function concatMembers(arr){
let concatArr = [] ;
let myConcat  = "" ;
    for (let i = 0; i < arr.length; i++) {
        myConcat = myConcat.concat(arr[i]) ;
                                         }
concatArr.push(myConcat) ;                                          
return concatArr ;                                        
                            } // end fn

// Now a private fn that solves the equation 
// indicated by the three symbols in 
// the array argument it receives (eg 
// ["1", "+", "2"]). This fn returns 
// an array containing a string that is the 
// result of solving that equation,
// eg ["3"]:
function calcResultOf3Symbols(arr){

let calculationResult = 0;
let stringToReturn = "" ;
let arrayToReturn = [] ;
    // Calculate the result.
// arr will always be something like this:
// ["2", "+", "3"]. It will always have three members 
// and members [0] and [2] are operands and 
// member [1] is an operator. 
// This fn returns a string 
// (NOTE: following vars already declared in 
// class (at the top)):
operandOne = Number(arr[0]) ;
operandTwo = Number(arr[2]);

functionToUse = functionStore[arr[1]] ;
calculationResult = functionToUse(operandOne, operandTwo)

stringToReturn =  calculationResult.toString() ;

arrayToReturn.push(stringToReturn)
return arrayToReturn ;  
                                    } // end fn calcResultOf3Symbols

// Now a private method that calculateResultPrivate
// calls. It receives an array and does one 
// of two things:
// 1) If the array has 4 members, eg, 
// ["11", "+", "22", "+"] it returns 
// [true, ["33", "+"]]
// 2) But if the array has three or fewer members,
// eg, ["11", "+", "22"]
// it simply returns the array plus false, like this:
// [false, ["11", "+", "22"]]
function reduceArray1(arr){

let intermediary1     = arr ;
let lastSymbolInArray = "" ;

    // If arr has length 1, 2 or 3 it is ignored and 
// simply returned. If > 3 it is changed and returned. 
    // Using the example above
// first set intermediary1 to ["2", "*", "3", "+"]:

// Then set lastSymbolInArray to "+",
// the last symbol in the rxed
// array:
lastSymbolInArray = arr[arr.length-1]
// The following Code runs when 
// the number of legal 
// keys (that are not "AC" or "=")
// in arr is 4 (so arr.length is never
// greater than 4)
if (arr.length > 3) {
// Now set intermediary1 to ["2", "+", "3"]:
    intermediary1 = arr.slice(0,3) ;    
// Now calculate what the members of intermediary1 
// represent and set intermediary1 to an array  
// containing a string that repersents 
// that result:    
intermediary1 = calcResultOf3Symbols(intermediary1) ;

// So now intermediary1 =, eg, ["5"] 
    // Now set intermediary1 to ["5" , "+"]:    
    intermediary1.push(lastSymbolInArray)
    
    return [true, intermediary1] ;
} else {

    return [false, intermediary1] ;

      }//end if-else

                         } // end fn



// Now a private method that calculateResultPrivate
// calls. This fn takes in an array such as 
// ["1", "1", "1", "*", "2", "2", "2", "*"] and returns
// ["111", "*", "222", "*"]. 
// If the array takes in ["1"] it returns ["1"].
// possible scenarios:
// (-)111--222 where first minus is actually 
// any operator.
// NOTE: The following situations cannnot arise 
// (as they are dealt with in myMain):
// --111+222
// ---111+222 etc
// 111---222 etc

function reduceArray(arr) {

    let operandString1 = "" 
    let arrIvalue      = null
    let reducedArray   = [] 
    let arrayToReturn  = [] 
    let newArray       = [] 
    let indexesArray   = [] 
    let myArray        = [] 
    let bigArray       = [] 
    let myString       = ""
    // Now a couple of flags:
    let pushOS1 = false
    let pushArri = false
// First populate newArray so that 
// it contains a 1 everywhere arr
// has a symbol for sign, a number or dot 
// and a 0 everywhere it has an operator:
for (let i = 0; i < arr.length; i++) {

if (i == 0) {
    // Simply push 1 into newArray cos 
    // the first symbol is always a sign minus 
    // or a number:
    newArray.push(1)
            } // end if

if (i > 0) {
    // If symbol arr[i] is not an operator:
    if ((arr[i]!= "/") &&
        (arr[i]!= "*") &&
        (arr[i]!= "+") &&
        (arr[i]!= "-") ) {
            newArray.push(1)
                         } // end if not operator

    // If symbol arr[i] is an operator:
    if ((arr[i]== "/") ||
        (arr[i]== "*") ||
        (arr[i]== "+") ||
        (arr[i]== "-") ) {
                // If it's a minus:
                if (arr[i]== "-") {
                    // If previous symbol was operator
                    if ((arr[i-1]== "/") ||
                        (arr[i-1]== "*") ||
                        (arr[i-1]== "+") ||
                        (arr[i-1]== "-") ) {
                               newArray.push(1)
                                           } // end if prev symbol operator
                    // If previous symbol was not an operator
                    if ((arr[i-1]!= "/") &&
                        (arr[i-1]!= "*") &&
                        (arr[i-1]!= "+") &&
                        (arr[i-1]!= "-") ) {
                            newArray.push(0)
                                         } // end if
                                   } else {// if it's a mult, plus or divide 
                                    newArray.push(0)        
                                          }// end if it's a mult, plus or divide 
                         } // end if operator
           } // end if i > 0
        } // end for loop

// So now everywere newArray has a 1 
// that's where code has to concatenate 
// the member of arr, ie when 
// arr is      ["1", "2", "3", "+", "-", "9", "9"]  (ie user wants to calclate 123 + -99)        
// newArray is [ 1,   1,   1,   0,   1,   1,   1 ]
// Now create an array that contains the indexes 
// of the zeros in newArray: 
for (let i = 0; i < arr.length; i++) {
    if (newArray[i]==0) {
        indexesArray.push(i)
                        } // end if
                                      } // end for loop
// So now indexesArray is, eg, [3] or [4,7,9]

// I've tested the following 
// and it works: 
if (indexesArray.length == 0) {
    myString = arrayToString(arr)
    bigArray.push(myString)
    myString = ""
                              }  

// I've tested the following 
// and it works: 
if (indexesArray.length == 1) {
    myArray  = arr.slice(0,indexesArray[0])
    myString = arrayToString(myArray)
    bigArray.push(myString)  
    bigArray.push(arr[indexesArray[0]])  
    // If there are any numbers/dot after
    // the last operator
    if (arr[(indexesArray[0]+1)]) {
        myArray  = arr.slice(indexesArray[0]+1)
        myString = arrayToString(myArray)
        bigArray.push(myString)  
                                  } // end if

    myString = ""
    myArray  = [ ] 
                              } // end if

// if arr is       [1,1,+,2,2,+,3,3,+,4,4]
// indexesArray is [2,5,8]
// if arr is       [1,+,2,+]
// indexesArray is [1,3]
if (indexesArray.length > 1) {
    for (let i = 0; i < indexesArray.length; i++) {
        if (i==0) {
            myArray  = arr.slice( 0, indexesArray[i] )    
                  } 
        if(i>0) {
            myArray  = arr.slice( (indexesArray[i-1]+1), (indexesArray[i]) )
                } // end if

        myString = arrayToString(myArray)
        bigArray.push(myString)
        bigArray.push(arr[indexesArray[i]])
                                              } // end for
// If there's more stuff in arr beyond the last operator:
if ( (arr.length-1) > indexesArray[(indexesArray.length)-1] ) {
    myArray  = arr.slice( (indexesArray[(indexesArray.length)-1]+1) )
    myString = arrayToString(myArray)
    bigArray.push(myString)
                                                              } // end if
     
        myString = ""
        myArray  = [ ] 

                            } // end if

return bigArray                            
                              } // end fn reduceArray

//---

// Now a public fn that instance myMain calls
// if te user clicked a legal calculator key.
// This fn calls a private fn.
// The private fn receives an array as argument that 
// depends on what the user typed and returns an array
// (that myMain will send to myDisplayText) that  
// depends on what array it received:
//-----------------------------------------------------------------------------------------------------
/*
user           actOnKeyPressPrivate sends                               calculateResultPrivate   
clicks         arrayToSenToMyCalc                                                returns
               (myCalculatingMachine's                                          
               calculateResultPrivate rxes)                          
-------------------------------------------------------------------------------------------------------
cancel         1) [ [ ], ["whatToDo", "cancel"] ]                    ["show", "runOfChars", "12"] (eg)
               2) [ [ ], ["whatToDo", "displayACsymbol"] ]           ["show", "runOfChars", "....."]
-------------------------------------------------------------------------------------------------------
AC                [ [ ], ["whatToDo", "displayACsymbol"] ]           [show", "runOfChars", "....."]
-------------------------------------------------------------------------------------------------------
operator      1) [["+", "multPlus"], ["whatToDo", "store"]]          either
              2) [["*", "multPlus"], ["whatToDo", "store"]]          ["show", "runOfChars", "3*"] (eg)
              3) [["-", "minus"],    ["whatToDo", "store"]]               or 
              4) [["/", "divide"],   ["whatToDo", "store"]]          ["show", "answer", "36"] (eg)
-------------------------------------------------------------------------------------------------------
equals        1) [[], ["whatToDo", "snarky message"]]   ["snarky message", "snarky message", "Div by zero? …"]       
              2) [[], ["whatToDo", "calculate"]]                 ["show", "answer", "3861"] (eg)
              3) [[], ["whatToDo", "warning"]]                    ["error", "error", "Not legal"]
-------------------------------------------------------------------------------------------------------
number1-9        [["8","number1-9"],["whatToDo", "store"]](eg)        ["show", "runOfChars", "3"] (eg)
-------------------------------------------------------------------------------------------------------
number0       1) [["0", "number0"], ["whatToDo", "do nothing"]]      ["do nothing", "do nothing", ""] 
              2) [["0", "number0"], ["whatToDo", "store"]]           ["show", "runOfChars", "30"] (eg)           
-------------------------------------------------------------------------------------------------------
"."           1) [["0.", "leading zero dot"],["whatToDo","store"]]      ["show","runOfChars","0."](eg)
              2) [[".", "dot"],              ["whatToDo","store"]]            as above (?)
-------------------------------------------------------------------------------------------------------
"startUp"        [[ ], ["whatToDo", "startUp"]]              ["startUp", "startUp", "startUp"]
(not actually
clicked by 
user)
-------------------------------------------------------------------------------------------------------
@illegal key@    [[ ], ["whatToDo", "warning"]]                       ["error", "error", "Not legal"]
(user clicks
an illegal key)
-------------------------------------------------------------------------------------------------------
*/

// So there are actually six cases to deal with:
// case 1) arr[1][1] == "displayACsymbol"
// case 2) arr[1][1] == "store"
// case 3) arr[1][1] == "calculate"
// case 4) arr[1][1] == "snarky warning"
// case 5) arr[1][1] == "warning"
// case 6) arr[1][1] == "cancel"
// case 7) arr[1][1] == "startUp"


    this.calculateResultPublic = function (arr) {
    return calculateResultPrivate(arr)
                                                } // end fn

// Now the private method called by the public one above:
function calculateResultPrivate(arr) {
let resultArray = [] ;

// case 6
// If user clicked cancel
if (arr[1][1] == "cancel") {
    // Remove the last symbol from keyStoreArray:
    keyStoreArray.pop()
    keyStoreArrayCompressed = reduceArray(keyStoreArray) ;
    arrFromFnReturnArray1 = reduceArray1(keyStoreArrayCompressed)
    if (arrFromFnReturnArray1[0]) { // if keyStoreArrayCompressed has > 3 members
        keyStoreArrayCompressed = arrFromFnReturnArray1[1]
        keyStoreArray           = arrFromFnReturnArray1[1]
                                  } // end if
    if (!arrFromFnReturnArray1[0]) {  // if keyStoreArrayCompressed has < 4 members
        keyStoreArrayCompressed = arrFromFnReturnArray1[1]
                                   } // end if-else
    resultArray = ["show", "runOfChars", concatMembers(keyStoreArrayCompressed)[0]] ;
    return resultArray
                            } // end if


// case 1) arr[1][1] == "displayACsymbol"
    if (arr[1][1] == "displayACsymbol") { 
    // Toast keyStoreArray and 
    // keyStoreArrayCompressed and return the 
    // string ".  .  . " in an array
    keyStoreArray = [] ;    
    keyStoreArrayCompressed = [] ;    
    
    resultArray = ["show", "runOfChars", "....."];
    return resultArray

                                        } // end if

// cases 2), 3), 5) and 7) 
if (arr[1][1] == "store") {
    
    // arr is, eg, [["-","minus"],["whatToDo","store"]]
    // Push only the symbol to keyStoreArray
    // , which
    // eventually ends up looking like, eg:
    // [ "1", "1", "+", "2", "2", "+" ]
    
    keyStoreArray.push(arr[0][0]) ;     
    
    // Now create keyStoreArrayCompressed from 
    // keyStoreArray so that it looks like this: 
    // ["11", "+", "22", "+" ]   (see array above)
    
    keyStoreArrayCompressed = reduceArray(keyStoreArray) ;
    
    // Now create, eg, ["33", "+"] by using fn reduceArray1
    // and set keyStoreArrayCompressed to that.
    // reduceArray1 returns 
    // [true, ["33", "+"]] when it rxes an arr of 4 symbols (eg ["11", "+", "22", "+"])
    // [false, ["11", "+", "22"]]  when it rxes an arr of 3 symbs or less (eg ["11", "+", "22"])

    arrFromFnReturnArray1 = reduceArray1New(keyStoreArrayCompressed)
    // OLD  // arrFromFnReturnArray1 = reduceArray1(keyStoreArrayCompressed) // OLD  // 
    keyStoreArrayCompressed = arrFromFnReturnArray1[1]
    

    if (arrFromFnReturnArray1[0]) { // if keyStoreArrayCompressed > 3 members (eg ["11", "+", "22", "+"])
        
        
        // so now keyStoreArrayCompressed 
        // is ["33", "+"]
// Now change ["33", "+"] to ["33"], which code wll send to 
// myDisplayText and put that into resultArray at postion [2]:
resultArray = []   
resultArray.push("show")
resultArray.push("answer") 

resultArray.push(arrayToString(sendToMyDisplayText(keyStoreArrayCompressed)))
    // Using example directly above this fn must 
    // return, eg, ["largeText", "change", "33"]
    //OLD: //resultArray = ["show", "answer", concatMembers(keyStoreArrayCompressed)[0]] ;
                                  } // end if

    if (!arrFromFnReturnArray1[0]) {  // if keyStoreArrayCompressed has < 4 members
        // so keyStoreArrayCompressed is now ["11", "+", "22"]
        
        resultArray = ["show", "runOfChars", arrayToString(sendToMyDisplayText(keyStoreArrayCompressed))] ;        
                                   } // end if
    
    return resultArray ;
                                   } // end if (arr[1][1] == "store")



// case ??
// (user clicks "=" immediately after startup)
if (arr[1][1] == "do nothing") {
    return  ["do nothing", "do nothing", ""] 
                               } // end if                                   



// case 4) arr[1][1] == "calculate"
// This only happens when user clicks a legal "="
if (arr[1][1] == "calculate") {
    // Evaluate the expression represented by the symbols
    // in keyStoreArray and return 
    // the result of the calculation:
    resultArray = ["show", "answer"]
    // Use an intermediate array to make manipulation easier:
    intermArr.push((calcResultOf3Symbols(keyStoreArrayCompressed))[0])
    // So now intermArr is, eg ["3"] (as user had typed, eg, 1+2= )
    // Now change resultArray:
    resultArray.push(intermArr[0]) ;
    // So now resultArray is ["show", "change", "3"]
    // Now set keyStoreArrayCompressed to be the result of the calculation:
    keyStoreArrayCompressed = [ ]
    keyStoreArrayCompressed.push(intermArr[0])
    // Toast the intermediate array:
    intermArr = []
    
    // So resultArray is now, eg, 
    // [ ["largeText", "change", "4"] ]:
        return resultArray ;
                                      } // end if

// case 8) arr[1][1] == "warning"
if (arr[1][1] == "warning") {
resultArray = ["error", "error", "Not legal"]
return resultArray
                            } // end if

// case 6) arr[1][1] == "snarky message"
if (arr[1][1] == "snarky message") {
resultArray = ["snarky message", "snarky message", " Divide by zero? What were you thinking?" ]

return resultArray; 
                                   } // end if


// case 9)
// array rxed       = [ [], ["whatToDo", "startUp"] ] 
// array to return  = ["smallText", "keep", "Deco calculator …"]
if (arr[1][1] == "startUp") {
    return  ["startUp", "startUp", "startUp"]
                            } // end if

                                     }   // end fn calculateResultPrivate

                             }   // end CalculatingMachine class def                           

//-------------------------------------------------                             

// Now a class that displays text
// The instance of this class receives an array
// of three members. each is a string that tells
// this class what to do. 
//[*rxedArray*][0] has value
// "smallText" or "largeText" and tells this class 
// what size to set the display text.
//[*rxedArray*][1] has value
// "keep" or "change"
// "keep" tells this class 
// to keep the previously displayed text 
// after displaying the error message for a short while.
// "change" means simply change the display text
//[*rxedArray*][2] has value, eg,
// "Not legal", which is the message to display
// There are four cases:
// case 1, this class rxes
// ["largeText", "change", "- -"]
// case 2, this class rxes, eg,
// ["largeText", "change", "3265.4"]
// case 3, this class rxes, eg,
// ["largeText", "change", "4+"] ;
// case 4i), this class rxes
// ["smallText", "keep", "Not legal"]
// case 4ii), this class rxes
// ["smallText", "keep", "Divide by zero? *&nbsp &nbsp &nbsp, etc*  What were you thinking?"]
function DisplayText() {   // 19Sept21 this ends line xx
    
// First a helper fn.

// The following fn takes an array of symbols
// that represents the result of a calculation 
// (the "answer"). Code calls this fn when 
// the answer is a decimal whose point has
// an index <9 and there are more than 10 chars.
// This fn looks at how many chars in the answer
// would appear after the point and fit in the display
// and rounds the last one.
// This fn takes as args:
// 1) the array
// 2) the index of the point 
function truncDec(arr, pointInd){
    let charsAfterPoint = 0
    let toRound = 0
    let rounded = 0
    let roundedStr = ""
    let roundedArr = []
    
    charsAfterPoint = 9-pointInd
    toRound = parseFloat(arrayToString(arr))
    // call the rounding fn taken from SO: 
    rounded = round(toRound, charsAfterPoint)
    // Now rounded is, eg, number 0.66666667,
    // so convert it to a string and then to an array:
    roundedStr = rounded.toString() 
    roundedArr = stringToArray(roundedStr)
    // So now roundedArr is, eg, […, "6", "7"]
    return roundedArr
                                } // end fn



// This fn converts an array to a string:
function arrayToString(arr) {

    let stringToReturn = ""

    for (let i = 0; i < arr.length; i++) {

        stringToReturn = stringToReturn.concat(arr[i])
                                         }
    return stringToReturn                                         
                             } // end fn
//---

// putStringIntoDisplay calls the 
// following fn, which converts text 
// it rxes in arr (the text to display)
// into x.xx*10ey form and either 
// truncates or rounds the x.xx 
// (and returns a string). Arg 
// truncOrRound is either 
// "truncate" or "round". Arg
// plusMinus is a boolean that indicates
// whether the number in question is positive or negative:
// putStringIntoDisplay calls the 
// following fn only when the string
// to display is an answer that has 
// more than 10 chars.
// This function converts the text 
// it rxes in arr (the text to display)
// into the the form x.xx*10ey, 
// where x.xx may be rounded.
// This fn returns a string.
// Arg plusMinus is a boolean for  
// whether the number in question
// is positive or negative.
// Arg decOrNot is a boolean for
// whether or not the the text to 
// display is a decimal. 
// There are two cases in which code calls
// This fn:
// 1) the text to display is a decimal 
// and the index of the dot is >8 
// 2) the text to display is not a decimal.
function convertTo10expForm(arr, decOrNot, plusMinus) {
    let posNeg = 1 // default is for negative number
    let diffAsString = ""
    let myNumber = 0  
    let beforeNewDecPoint = [] 
    let significand = []
    let finalText = ""
    let dotIndex = 0
    
    // If the number is a positive number,
    // ie plusMinus == true:
    if (plusMinus) {
        posNeg = 0
                   } // end if
    
// Whether Case 1) or 2)
    // Grab the first (3+posNeg) chars:
    beforeNewDecPoint = arr.slice(0,(3+posNeg))
    // beforeNewDecPoint is now either, eg,
    // ["1", "6", "7"] or
    // ["-", "1", "6", "7"] 
    // Put a "." after the (1+posNeg)th member of beforeNewDecPoint:
    beforeNewDecPoint.splice((1+posNeg),0,".")
    significand = beforeNewDecPoint
    // So now significand is 
    // ["1", ".", "6", "7"]   or
    // ["-", "1", ".", "6", "7"] 
 
// Round member[2+posNeg]
    myNumber = parseFloat(arrayToString(significand))
    // so myNumber is = 1.67 or -1.67
    // Now round myNumber to 1 decimal places 
    myNumber=round(myNumber, 1) // NOTE: fn is from stack exch
    // So myNumber is now 1.7 or -1.7
    // Convert to a string:
    significand = myNumber.toString()
    // So significand is now "1.7" or "-1.7"
                         
    // If the answer is NOT  
    // a decimal):
    if (!decOrNot) {
// Remember significand is now 
// "1.7" or "-1.7"
// Create the exponent (ie the y in xx.x*10ey)
// as a string.
// If the number is positive:
if (plusMinus) {
    myNumber = (arr.length-1).toString()    
               } // end if
// If the number is negative:
if (!plusMinus) {
    myNumber = (arr.length-2).toString()
                } // end if

finalText = significand.concat('X10e')
finalText = finalText.concat(myNumber)
// So finalText is now, eg,
// "1.7X10e12"
return finalText
                    } // end if text represents a NOT decimal


    // If the answer is 
    // a decimal:
    if (decOrNot) {
dotIndex = lookForCharInArray(arr, ".")[1]
// Remember significand is now 
// "1.7" or "-1.6"
finalText = significand.concat('X10e')
// So significand is now, eg,
// "1.7*10e" or "-1.6*10e"
// If the number is positive:
if (plusMinus) {
    diffAsString = (dotIndex-1).toString()    
               } // end if
// If the number is negative:
if (!plusMinus) {
    diffAsString = (dotIndex-2).toString()
                } // end if
finalText = finalText.concat(diffAsString)
// So finalText is now, eg, 
// "1.7*10e13" or "-1.6*10e13"

            return finalText
                    } // end if
                                                    } // end fn

//-----


// The following fn looks for character char
// in array arr and returns [true, *index*] if
// it's in there or [false, false] if it's not:
function lookForCharInArray (arr, char) {

    for (let i = 0; i < arr.length; i++) {
    if (arr[i] == char) {
        return [true, i]
                        } // end if
                                         } // end for
    return [false, false]
                                         } // end fn

//----

// The following fn puts the string it rxes into the display.
// This fn rxes either
// 1) [*strngToShow*, "runOfChars"] for a run of characters
// 2) [*strngToShow*, "answer"] for an answer
// 3) [*strngToShow*, "error"] for an error.
// strng will contain up to 18 chars because 
// (certainly in the case of Chrome) javascript 
// produces 18 chars after a calculation.
function putStringIntoDisplay(strng, answRunOfCharsErr){

// There are two cases to think about:
// Case 1) the string is an answer
// There are 2 main cases to deal with
    // Case i)  there are more than 10 characters
        // There are two cases:
        // case a)
        // The answer is a decimal  
            // There are 2 cases:
                // case A) 
                // The index of the dot is >8
                // Use convertTo10expForm, which
                // truncates and rounds, hence 
                // on Rounded sign                    *DONE
                // case B) 
                // The index of the dot is <9
                // Truncate and round, hence 
                // turn on rounded sign               *DONE
        // case b)
        // The answer is not a decimal:  
        // Use convertTo10expForm, which
        // truncates and rounds, hence 
        // on Rounded sign                             *DONE
    // Case ii) there are 10 characters or less
    // Dim the overflow sign and enable all the keys.
    // Simply show the chars

// Case 2) the string is a run of chars
// There are two cases:
// Case i)  There are 10 characters or less
// Case ii) There are 10 characters or less
// Dim the overflow sign and enable all the keys.
// Simply show the chars

// overflowPara truncatePara are the references to the 
// <p>s for overflow text and truncate text  
// that live in the divs for the Overflow! and Truncated   
// signs


    let idPara1, idPara2, posNo, para1, para2
    let pointIndArr = [ ] 
    let myArray = stringToArray(strng)
    let posNeg = true
// If the number is negative:    
    if (myArray[0] == "-") {
    posNeg = false
                           } // end if
// pointIndArr below will look 
// like this, eg, if the answer 
// is a decimal: [true, 5]
pointIndArr = lookForCharInArray(myArray, ".")

// Case 1)
// If the rxed string is an answer
// convert it to x.x * 10ey form if
// it's longer than 10 characters
// and show the Overflow! sign::
    if (answRunOfCharsErr == "answer") { 
// If there are more than 10 chars in myArray 
// determine whether it contains a decimal.
// If so, tere are two scenarios:
// 1)  

// Case i)
// If there are more than 10 chars in the answer:
if (myArray.length>10) {
// Show "Rounded" sign:
// -Add the appropriate class to the 
// appropriate <p>
truncatePara.classList.remove("truncateOff");
truncatePara.classList.add("truncateOn");

  // 1) If the answer is a decimal:
if (pointIndArr[0]) {
    // If index of "." is > 8
    if (pointIndArr[1]>8) {
        // convert myArray accordingly:
        // args for convertTo10expForm are (arr, decOrNot, plusMinus)
        myArray=stringToArray(convertTo10expForm (myArray, true, posNeg))

    } else { // If index of "." is < 9 
// Convert myArray so that the display shows 
// a rounded version of the decimal: 
myArray=truncDec(myArray, pointIndArr[1])
           }
                } else { // 2) If the answer is NOT a decimal:
    // convert myArray accordingly
    // args for convertTo10expForm are (arr, decOrNot, plusMinus)
myArray=stringToArray(convertTo10expForm(myArray, false, posNeg))
                       }
// myArray now contains the text to be displayed
                       }  else { // if there are <10 chars
truncatePara.classList.remove("truncateOn")
truncatePara.classList.add("truncateOff")
                               } // end if-else more than 10 chars or not         
                            } // end if the message is an answer

// Case 2)
// If the rxed string is a run of 
// characters truncate it if it's
// longer than 10 characters
// and show the Truncated sign:
// Case i)
if (answRunOfCharsErr == "runOfChars") {
    if (myArray.length>10) {
// Get rid of the 11th char
// (note that there will only 
// be 11 chars max because the 
// eleventh is removed here):
myArray.pop()
/*
Light up the overflow sign and disable all the keys
except the AC and C keys (which involves disabling
all keys and then re-enabling the AC and C keys)
*/
overflowPara.classList.remove("overflowOff");
overflowPara.classList.add("overflowOn");

document.querySelectorAll('.keyClassOperand').forEach(item => {
    item.removeEventListener('click', respondToOperandKey)
                                                       })

document.querySelectorAll('.keyClassOperator').forEach(item => {
    item.removeEventListener('click', respondToOperatorKey)
                                                       })
// Re-enable AC and C keys:
ACkey.addEventListener('click', respondToOperandKey)
cancelKey.addEventListener('click', respondToOperandKey)
                           } else { // if less than 10 chars
// Case ii)
// There are less than 10 chars:
/*
Dim the overflow sign and enable all the keys
*/
// 
overflowPara.classList.add("overflowOff");
overflowPara.classList.remove("overflowOn");

// Enable all keys:
document.querySelectorAll('.keyClassOperand').forEach(item => {
    item.addEventListener('click', respondToOperandKey)
                                                       })

document.querySelectorAll('.keyClassOperator').forEach(item => {
    item.addEventListener('click', respondToOperatorKey)
                                                       })
// Now dim the "Rounded sign too" in case user 
// had got an answer that code rounded and then
// hit C or AC:
truncatePara.classList.remove("truncateOn")
truncatePara.classList.add("truncateOff")

                                  } // end if more than 10 chars or not

                                       } // end if message is a run of characters


// Now display what's in myArray,
// which is either, eg, 12345 or Not legal:
for (let i = 0; i < 10 ; i++) {
    posNo   =  (10-i)
    idPara1 = "pos" + posNo + "para1"
    idPara2 = "pos" + posNo + "para2"
    
        para1 = document.getElementById(idPara1)
        para2 = document.getElementById(idPara2)
// 
// First toast the old stuff in the two <p>s
// of each porthole div:
para1.innerHTML = ""
para2.innerHTML = ""

// The following if is to ensure short texts
// (with < 10 chars), such as 1.125, 
// get treated correctly
if (myArray[(myArray.length-1)-i]) {
    para1.innerHTML = myArray[(myArray.length-1)-i]
    para2.innerHTML = myArray[(myArray.length-1)-i]
                                    } // end if
                                           
                                   }// end for
            
                                            } // end fn putStringIntoDisplay

//-------------

// Code to do with clocking the welcome and error messages into the display:
// NOTE: for some reason arrayOfPara1Refs and arrayOfPara2Refs
// have to be global! WHY?????
// Code calls this fn when user tries to divide by 0 and 
// on startup.
// This fn calls delayedLoopTest2
function clockInMessage(mess) {
// First disable all keys so that the user     
// cannot type anything until the message ends.
// Remember keyClassOperand covers all numbers and dot;
// keyClassOperator means all the other keys:
document.querySelectorAll('.keyClassOperand').forEach(item => {
    item.removeEventListener('click', respondToOperandKey); 
                                                              })    
document.querySelectorAll('.keyClassOperator').forEach(item => {
    item.removeEventListener('click', respondToOperandKey); 
                                                              })    
    // Now call delayedLoopTest2,
    // which will do the actual
    // clocking of the message
    // letters into the display
    // portholes
    delayedLoopTest2(mess)
                              } // end fn
    
//---  
// This fn rxes an array that contains the message
// (either "Not legal" or "Divide by zero? …")  
// Remember:
// Each porthole div has two <p>s (of ids, eg, 
// pos3para1 and pos3para2 in the case of the 
// third porthole)
// arrayOfPara1Refs contains references to 
// all of the para1s like this:
// [*refForPos10para1*, *refForPos9para1*, *refForPos8para1*, ...]
// and 
// arrayOfPara2Refs for the para2s, like this:
// [*refForPos10para2*, *refForPos9para2*, *refForPos8para2*, ...]
// Each array is of length 10
    function delayedLoopTest2(message) {         
        setTimeout(function() {   //  call a setTimeout when the loop is called
    // loop through the message    
    for (let j = 0; j < message.length; j++) {
        if (
            message[myCounterTest.getCounter()-j] &&
            arrayOfPara1Refs[j]
           ) {
            arrayOfPara1Refs[j].innerHTML = message[myCounterTest.getCounter()-j]
            arrayOfPara2Refs[j].innerHTML = message[myCounterTest.getCounter()-j]
             } // end if
                                              } // end for  
    
 //  increment the counter:
             myCounterTest.incrementCounter()
        
    
        // if (myCounter.getCounter() < length of message) 
        if (myCounterTest.getCounter() < message.length) { // if so call loop function again
            delayedLoopTest2(message);      //            to trigger another setTimeout()
                                } else {   //  
                                // reset the counter
                                myCounterTest.setCounter(1) 
                                // Now re-enable all keys:
// Here keyClassOperand covers all numbers and dot;
// keyClassOperator means all the other keys:
document.querySelectorAll('.keyClassOperand').forEach(item => {
    item.addEventListener('click', respondToOperandKey)
                                                       })

document.querySelectorAll('.keyClassOperator').forEach(item => {
    item.addEventListener('click', respondToOperatorKey)
                                                       })

                                       } // end if-else
         }, 150) // end setTimeout -- use 150 in prod code
         // The figure here changes the frequency at which 
         // the letters of the message ge moved across
         // the display
                                        } // end delayedLoopTest2
//---
// The welcome message:
let welcomeArray1 = ["W", "e", "l", "c", "o", "m", "e", " ",
 "t", "o", " ", "D", "e", "c", "o", " ", "c", "a", "l", "c", 
 "u", "l", "a", "t", "o", "r", " ", " ", 
 " ", " ", " ", " ", " ", " ", " ", " " ]

 let snarkyMessage1 = ["D", "i", "v", "i", "d", "e", " ", "b",
 "y", " ", "z", "e", "r", "o", "?", " ", " ", " ", " ", " ", " ", " ", " ", "W", "h", "a", "t", 
 " ", "w", "e", "r", "e", " ", "y", "o", 
 "u", " ", "t", "h", "i", "n", "k", "i", "n", "g", "?", " ", " ", 
 " ", " ", " ", " ", " ", " ", " ", " " ]



//----

      // The private setter:
    function setDisplayTextPrivate(arr){
        let originalText

// If code calls this fn during startUp
if (arr[0] == "startUp") {
// Get the welcome message to 
// run through the display:
clockInMessage(welcomeArray1)    
                          } // end if        

// 
if (arr[0] == "show") {

if (arr[1] == "runOfChars") {
    putStringIntoDisplay(arr[2], arr[1])    
} // end if

if (arr[1] == "answer") {
    putStringIntoDisplay(arr[2], arr[1])    
} // end if

                      } // end if        



// If the user clicked "=" 
if (arr[0] == "do nothing") {
    // do nothing!
                            } // end if


// If user tried to divide by 0
if (arr[0] == "snarky message") {
    // Get text that is in the display.
    // The text is in the form of an array
    // (keyStoreArrayCompressed), which 
    // code must convert to a string:

    originalText = arrayToString(myCalculatingMachine.getkeyStoreArrayCompressedPublic())
    // Show rolling snarky message    
    clockInMessage(snarkyMessage1)
  
        setTimeout(function(){ 
            // Now put the original text back:
        putStringIntoDisplay(originalText, "runOfChars")
        
        // reset originalText:
        originalText = "" ;  
                         }, 9590); // change this figure o 190 or so in prod code

                                } // end if

if (arr[0] == "error") {
    // Show the error message for 1.5 seconds
    // then revert to original text.
    // First get the original text. If the original text is 
    // blank (because previous key clicked was AC, which results in 
    // keyStoreArray and keyStoreArrayCompressed being toasted)
    // set original text to "....":
  if (arrayToString(myCalculatingMachine.getkeyStoreArrayCompressedPublic()) == "") {
    originalText = "....."  
  } else {
      originalText = arrayToString(myCalculatingMachine.getkeyStoreArrayCompressedPublic())
         } // end if-else

// Remember that code creates 
// arrayOfPara1Refs and arrayOfPara2Refs
// globally (at the top of the code)

// Disable all keys:
document.querySelectorAll('.keyClassOperand').forEach(item => {
    item.disabled = true ; 
                                                              })    
document.querySelectorAll('.keyClassOperator').forEach(item => {
item.disabled = true ; 
                                                              })    

// Now change the innerHTML of each of the two <p>s in the porthole divs
// (ie display the message (which is "Not legal"))
putStringIntoDisplay(arr[2], "error")

// Now, wait for an interval and then reset the two <p>s' classes 
// so that they no longer fade text in and out,
// give them the original innerHTML and re-enable all keys :                                                      
    setTimeout(function(){ 
   
        // Now the original text back:
        putStringIntoDisplay(originalText, "runOfChars")
        // reset originalText:
        originalText = "" ;  
        // Re-enable all keys:
        document.querySelectorAll('.keyClassOperand').forEach(item => {
            item.disabled = false ; 
                                                                  })    
        document.querySelectorAll('.keyClassOperator').forEach(item => {
        item.disabled = false ; 
                                                              })    
                         }, 3500);

                      } // end if "keep"        

                                } ; // end setDisplayText
       
//----        
    // Now public privileged methods (which call private methods):
    // The getter:
    
        // Set displayText:
    this.publicSetDisplayText = function (arr) {
        setDisplayTextPrivate(arr) ;
                                               } ; // end publicSetDisplayText
//----
                                    } // end DisplayText class



//-------------------------------------------------                                    

// Now a class that contains a flag.                                    
// This is the flag that the event listener for the pressing of the 
// keyboard dot key reads (so as to be able to tell whether or  
// not to disable the calculator dot div (button) and prevent 
// code from sending data to myMain)

function DotFlagContainer(flagInitValue) {
let flag

// Public fn to set flag:
this.publicSetFlag = function (flagValue) {
    flag = flagValue
                                          } ; // end publicSetFlag

// Public fn to toggle flag:
    this.publicToggleFlag = function () {
        privateToggleFlag() ;
                                        } ; // end publicSetFlag

// Private fn to toggle flag:
      function privateToggleFlag(){
           flag = !flag
                                  }

// Public fn to get flag:
this.publicGetFlag = function () {
    return privateGetFlag()
                                 } ; // end publicSetFlag

// Private fn to get flag:
  function privateGetFlag(){
    return flag ;
                           }

// Instantiation code:
this.publicSetFlag(flagInitValue)
                                        } // end class def DotFlagContainer

//----------------------

// A counter class whose instance 
// myDisplayText uses 
// Instance created is myCounterTest
// with myCounter initialised to 0:

function CounterTest(counterInitValue){
    let myCounter 
    this.incrementCounter = function (){
        myCounter += 1
                                        } // end fn
    
    this.setCounter = function(value){
        myCounter = value
                                     } // end fn
    
    this.getCounter = function(){
        return myCounter.toString() 
                                } // end fn
    
    
    // init code:
    this.setCounter(counterInitValue)
                            } // end fn
    
    //------------------------

//----------------------------------------
// Helper functions 
// First a function to tell whether an array 
// contains a particular string. Returns true or false.
function inArrayOrNot(stringArg, arrayArg) {
    let veracity = false ;
    arrayArg.forEach(element => {
        if (element == stringArg) {
            veracity = true ;
                                  } // end if
                    }); // end forEach
                    return veracity ;
                                           } // end inArrayOrNot
//----------------------------------------

// Make any the rosewood element draggable:
dragElement(document.getElementById("outer1"));


// The code for dragElement above
// The code for this came from W3 but it's easy to understand:
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
      // move the element from anywhere inside it: 
      elmnt.onmousedown = dragMouseDown;
  
      function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
                            }
  
    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
                                }
                                }    

//-------------------------------------------------------------------







// TEST STUFF 
/*
// element.className = '';
// element.classList.add("mystyle");
// element.classList.remove("mystyle");
*/

// should return a pseudo array:
// document.getElementById(id).querySelectorAll('p');


//---------------------


                          











// DON'T CODE BENEATH THIS LINE
//-------------------------------------------------------




} // end init function

window.onload = init;

