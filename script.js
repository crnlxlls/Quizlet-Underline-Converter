window.addEventListener('load', function() {
    enterInput();
    autoCompleteOff();
    autoType();
  });
  
function transformText() {
    const inputElement = document.getElementById('inputText');
    const outputElement = document.getElementById('outputText');

    const inputText = inputElement.value.trim();
    if (inputText !== "") {
        const dashedText = convertToLine(inputText);
        outputElement.value = dashedText;

        setHistory(inputElement.value, outputElement.value);
        inputElement.value = "";
    }

}

function convertToLine(text) {
    let linedText = "";
    for (const c of text) {
        if (/[a-zA-Z]/.test(c)) {
            if ("m".includes(c)) {
                linedText += "___";
            } else if ("mabcedghnopqwyxz".includes(c)) {
                linedText += "__";
            } else {
                linedText += "_";
            }
        } else {
            linedText += c;
        }
    }
    return linedText;
}

function copyText() {
    const outputElement = document.getElementById('outputText');
    const checkElement = document.getElementById('check');
    outputElement.select();
    document.execCommand('copy');

    outputElement.style.border = '1px solid lightgreen';
    checkElement.style.visibility = 'visible';

    outputElement.addEventListener('blur', function() {
        outputElement.style.border = '1px solid #37abf9';
        checkElement.style.visibility = 'hidden';
    });
}

function setHistory(inputText, outputText) {
    const historyElement = document.getElementById("history");
    const newEntry = document.createElement("p");
    const entryContent = inputText + " = " + outputText;

    newEntry.textContent = entryContent;
    historyElement.appendChild(newEntry);
  }



function enterInput() {
    document.getElementById('inputText').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            transformText();
        }
    });
}

function autoCompleteOff() {
    document.getElementById("inputText").setAttribute("autocomplete", "off");
    
}


function autoType() {
    document.addEventListener('click', function(event) {
        
        let shouldFocusOnInput = (
            event.target !== document.getElementById('inputText') &&
            !event.target.closest('.history') &&
            !event.target.closest('#outputText')
          );
    
        if (shouldFocusOnInput) {
            document.getElementById('inputText').focus();
          }
    });
}