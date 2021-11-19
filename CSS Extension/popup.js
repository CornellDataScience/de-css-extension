let undoBtn = document.getElementById("undo");
let printHtmlBtn = document.getElementById("printHtml");
let redoBtn = document.getElementById("redo");

undoBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: undo,
  });
});

printHtmlBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: printHtml,
  });
});

redoBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: redo,
  });
});


function undo() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.execCommand("undo", false, null);
  document.designMode = "off";
}

function printHtml() {
  var fullCode = "<html>" + $("html").html() + "</html>";
  console.log(fullCode);
}

function redo() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.execCommand("redo", false, null);
  document.designMode = "off";
}



