/**Write the code for implementing infinite precision Arithmatic operation
 * return the answer in string format
 */

class InfiniteNumber {
  /** An internal member Array to contain the digits of the Infinite Integer.
   * @private
   * @type {Array<Number>}
   */
  _internalArray = [];

  constructor(inputObject) {
    if (typeof inputObject === "number") {

          // initialize the member array
          // Getting the string as a parameterand typecasting it into an integer
          let myFunc = num => Number(num);
          this._internalArray = Array.from(String(inputObject), myFunc);

          //validate the array of integer 
          this.checkInput();
    }
    else if(typeof inputObject === "string") {

        //check if string contains only numbers or not
        if(isNaN(inputObject)){
            throw new Error("given string contains non integer value")
        }

        // convert the string of number into array of integer
        this._internalArray = inputObject.split('').map(function(item) {
            return parseInt(item, 10);
        });
        
        //validate the array of string wheather it contains valid input or not
        this.checkInput()

    }
    else if(typeof inputObject==='array'){
    this.checkInput()
    }
    else if (typeof inputObject === "object") {  // IS THIS HOW ITS DONE?
    if(!(inputObject instanceof InfiniteNumber)){
      throw new error("given object type is not valid")
    }

    //asign the number of object into internal array
    this._internalArray=inputObject.getInternalArray();

    // check again if the input is valid or not
    this.checkInput();

    }
    else {        
    // BHAI KYA KAR RAHA HAI?
    console.log("You sent some bullshit!")

    throw new Error(`Constuctor of IniniteNumber does not support this data`
      +` type ${typeof inputObject}`)
    } 
  }

/**Helper Function to remove all leading zeros from input
 * @private
 * @param {Array<Number>} numArray take the input array
 * @return {Array<Number>} after removing all the leading zeros
 */
  removeLeadingZeros(numArray) {
  let arrIndex = 0;

  //To remove Initial zero's from array Ex; [0,0,1,2] -> [1,2]
  while (arrIndex<numArray.length && numArray[arrIndex] === 0) {
    numArray.shift();
    arrIndex+=1;
  }
  return numArray;
  }

  /**Helper Function to check if the input Array is valid or not
   * @private
   * @param {Array} Number input array should be number
   * @return {boolean} whether the input is valid or not
   */
  checkInput() {
      //To check if the input is array or not
      if (!Array.isArray(this._internalArray)) {
          throw new Error("Given input is not an Array");
      }

      //To check if the array is empty or not
      if (this._internalArray.length === 0) {
          throw new Error("Given Input is Empty");
      }

      //To check if the array consists only integer and value b/w 0 and 9 or not
      for (let i = 0; i < this._internalArray.length; i++) {
          if (!Number.isInteger(this._internalArray[i]) || this._internalArray[i] < 0 || this._internalArray[i] > 9)
              throw new Error("Please input valid Integer between 0 - 9");
      }
      return true;
  }

  /**Function to return addition of two arrays
   * @param {Array<Number>} numToAdd input array should be number
   * @throws {Error} if input is not integer or it is <0 or >9
   * @return {Array} result array of addition
   */
  additionOfTwoArray(numToAdd) {

    
 //check if the input is valid
  if(!(numToAdd instanceof InfiniteNumber)){
  throw new Error("given input is not an object")
  }

  let num1= this._internalArray
  let num2= numToAdd.getInternalArray();

  //remove preceeding zeros
  num1 = this.removeLeadingZeros(num1);
  num2 = this.removeLeadingZeros(num2);
    
    let ans = []; //ans to be returned
    let num1Index = num1.length - 1;
    let num2Index = num2.length - 1;
    let carry = 0;
  
    //Addition till smallest length array to be done 
    while (num1Index >= 0 && num2Index >= 0) {
      let addedValue = num1[num1Index] + num2[num2Index]+carry;
      let temp = addedValue % 10;
      carry = Math.floor(addedValue / 10);
      ans.unshift(temp);
      num1Index -= 1;
      num2Index -= 1;
    }
  
    //Addition of longest size array with carry
    while (num1Index >= 0) {
      let addedValue = num1[num1Index] + carry;
      let temp = addedValue % 10;
      carry = Math.floor(addedValue / 10);
      ans.unshift(temp);
      num1Index -= 1;
    }
    while (num2Index >= 0) {
      let addedValue = num2[num2Index] + carry;
      let temp = addedValue % 10;
      carry = Math.floor(addedValue / 10);
      ans.unshift(temp);
      num2Index -= 1;
    }
    if(carry!==0){
      ans.unshift(carry)
    }
  
    //return the answer
    return ans.length===0?[0]:ans;
  
  }

  /**Helper method to do subtraction of Smaller num from Larger
   * @private
   * @param {Array<Number>} greaterNum input array should be number
   * @param {Array<Number>} smallerNum input array should be number
   * @return {Array} result of subtraction
   */
  subtractSmallerFromLower(greaterNum, smallerNum) {
    
    let smallerNumIndex = smallerNum.length - 1;
    let greaterNumIndex = greaterNum.length - 1;
    let carry = 0;
  
    //ans to return
    let ans = [];   
  
    //to do subtraction till smallest length array 
    while (smallerNumIndex >= 0) {
      //if carry is remaining then subtract from current integer
      if (carry === 1) greaterNum[greaterNumIndex] -= 1;
      let temp = 0;
  
      //if number is smaller then take carry from other number
      if (greaterNum[greaterNumIndex] < smallerNum[smallerNumIndex]) {
        temp = greaterNum[greaterNumIndex] + 10 - smallerNum[smallerNumIndex];
        carry = 1;
      }
      //if greaterNum is bingger than other number 
      else {
        temp = greaterNum[greaterNumIndex] - smallerNum[smallerNumIndex];
        carry = 0;
      }
      ans.unshift(temp);
      smallerNumIndex -= 1;
      greaterNumIndex -= 1;
    }
  
    //subtraction of rest of array elements from longest size array
    while (greaterNumIndex >= 0) {
      if (carry === 1) greaterNum[greaterNumIndex] -= 1;
      if (greaterNum[greaterNumIndex] < 0) {
        ans.unshift(9);
        carry = 1;
      } else {
        ans.unshift(greaterNum[greaterNumIndex]);
        carry = 0;
      }
      greaterNumIndex -= 1;
    }
    return ans.length===0?0:ans;
  }

  /**Function to return Subtraction of two Arrays
   * @param {Array<Number>} numToSubtract input array should be number
   * @throws {Error} if input is not integer or it is <0 or >9 or in Decimal
   * @return {Array} result array of Substraction
   */
  SubtractionOfArray(numToSubtract) {
    //check if the input is valid
    if(!(numToSubtract instanceof InfiniteNumber)){
      throw new Error("given input is not an object")
    }

    let num1= this._internalArray
    let num2= numToSubtract.getInternalArray();
    let ans = [];
  
    //check for cases
    // if 1st number length is greater than 2nd
    if (num1.length > num2.length) {
      ans = this.subtractSmallerFromLower(num1, num2);
      this.removeLeadingZeros(ans);
    } 
    //if 2nd number length is greater than 1st
    else if (num2.length > num1.length) {
      ans = this.subtractSmallerFromLower(num2, num1);
      this.removeLeadingZeros(ans);
      ans.unshift("-");
    }
    //if both number have same length then check for individual index  
    else {
      let num1Index = num1.length - 1;
      let num2Index = num2.length - 1;
  
      while (
        num1Index > 0 &&
        num2Index > 0 &&
        num1[num1Index] === num2[num2Index]
      ) {
        num1Index -= 1;
        num2Index -= 1;
      }
      //if both the number are same
      if (num1[num1Index] === num2[num2Index]) return [0];
      // if 1st number is greater than 2nd
      else if (num1[num1Index] > num2[num2Index]) {
        ans = this.subtractSmallerFromLower(num1, num2);
        this.removeLeadingZeros(ans);
      }
      //if 2nd number is greater than 1st 
      else {
        ans = this.subtractSmallerFromLower(num2, num1);
        this.removeLeadingZeros(ans);
        ans.unshift("-");
      }
    }
  
    return ans;
  }

  /**subFuntion to multiply one number with entire array
   * @private 
   * @param {Number} num to be multiplied
   * @param {Array<Number>} numArray to be multiplied
   * @return {Array} Array after multiplication
   */
  multiplyWithNumber(numArray, num, initialZero) {
    let ans = [];
    let carry = 0;
  
    //to append initial zero for final calculation
    for (let zeroCount = 0; zeroCount < initialZero; zeroCount++) {
      ans.unshift(0);
    }
    for (let numIndex = numArray.length - 1; numIndex >= 0; numIndex--) {
      let temp = (numArray[numIndex] * num) + carry;
      ans.unshift(temp%10);
      carry = Math.floor(temp/10);
    }
    if(carry!==0) ans.unshift(carry)
    return ans;
  }
  
  /**Function to return the multiplication of two Arrays
   * @param {Array<Number>} numToMultiply input array should be number
   * @throws {Error} if numToMultiply is not valid object
   * @return {Array} result array of Multiplication
   */
  multiplicationofTwoArray(numToMultiply) {

    //check if the input is valid
    if(!(numToMultiply instanceof InfiniteNumber)){
      throw new Error("given input is not an object")
    }

    let num1=this._internalArray
    let num2=numToMultiply._internalArray;

    //initialize the ans as object
    let ans = new InfiniteNumber(0);
  
    //multiply entire num1 array with elemetents of num2 array one by one 
    // then add it to the ans 
    let num2Index = (num2.length - 1)
    for (; num2Index >= 0; num2Index--) {
      // initial zeros to be added
      let initialZero = (num2.length - 1) - num2Index;

      // multiply num1 with single digit of num2 and store into sample
      let sample= this.multiplyWithNumber(num1,num2[num2Index],initialZero);

      //convert sample into infiniteNumber object
      sample= new InfiniteNumber(sample.join(""))

      // add the ans object with sample object and convert ans again into object
      ans=ans.additionOfTwoArray(sample)
      ans = new InfiniteNumber(ans.join(""));
    }
    
    return ans;
  }
  
  /**getter method for internal array
   * @returns {Array<Integer>} array of the given input 
   */
  getInternalArray(){
    //returning the deep copy of Internal array
    return JSON.parse(JSON.stringify(this._internalArray))
  }

  /**Method to return input as String
   * @returns {String} input array as string
   */
  getNumberAsString() {
    return this._internalArray.join("")
  }
 
}

let num1 = new InfiniteNumber(12);
let num2 = new InfiniteNumber(24445654552);
console.log(num1.additionOfTwoArray(num2))
console.log(num1.multiplicationofTwoArray(num2))

