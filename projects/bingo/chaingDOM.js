var bingoCardTable = document.getElementById("bingoTable");
console.log(bingoCardTable);
var newLine = document.createTextNode("Hello");
var newLine2 = document.createTextNode("Hello Again");
var newTr = document.createElement("tr");
var newTd = document.createElement("td");
newTd.appendChild(newLine);
newTr.appendChild(newTd);
bingoCardTable.appendChild(newTr);




/* 
 * 
 * var bingoTdArray = document.getElementsByTagName('td');
console.log(bingoTdArray[3]);
bingoTdArray[3] = "P";

create new elements
var myElement = document.getElementById("trivia");
var newHeading = document.createElement("h1");
var newParagraph = document.createElement("p");

// to add content, either use innerHTML

//OR crate child nodes manually
var h1Text = document.createTextNode("Did You Know?");
var paraText = document.createTextNode("California produces over 17 million gallons!")

newHeading.appendChild(h1Text);
newParagraph.appendChild(paraText);

//add them to the document!
document.getElementById("trivia").appendChild(newHeading);
document.getElementById("trivia").appendChild(newParagraph);

var myNewElement = document.createElement("li");
var newSecondText = document.createTextNode("This is a New Second Item");
var newSecondItem = myElement.getElementsByTagName("li")[1];
myElement.insertBefore(myNewElement, newSecondText); */
