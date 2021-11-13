chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Edit Text",
    "type": "normal",
    "contexts": ["selection"],
    "id": "editID"

  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Change Text Color",
    "type": "normal",
    "contexts": ["selection"],
    "id": "colorID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Change Font Name",
    "type": "normal",
    "contexts": ["selection"],
    "id": "fontNameID",
    "parentId": "editID"
  });
});


chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Change Text Size",
    "type": "normal",
    "contexts": ["selection"],
    "id": "fontSizeID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Toggle Bold",
    "type": "normal",
    "contexts": ["selection"],
    "id": "boldID",
    "parentId": "editID"
  });
});


chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Pad Element",
    "type": "normal",
    "contexts": ["selection"],
    "id": "padID"
  });

});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Print HTML",
    "type": "normal",
    "contexts": ["selection"],
    "id": "htmlID"

  });
});

function printHTML() {
  var fullCode = "<html>" + $("html").html() + "</html>";
  console.log(fullCode);
}

function selection() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function changeTextColor() {
  let color = prompt("Choose font color (string or hex are accepted)");
  // selection();
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.execCommand("ForeColor", false, color);
  document.designMode = "off";
}

function changeFontName() {
  let fontName = prompt("Choose font");
  // selection();
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.execCommand("fontName", false, fontName);
  document.designMode = "off";
}

function changeFontSize() {
  let fontSize = prompt("Choose font size (1-7)");
  // selection();
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.execCommand("fontSize", false, fontSize);
  document.designMode = "off";
}

function bold() {
  // selection();
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  document.execCommand("bold", false, null);
  document.designMode = "off";
}

function getHTMLHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: printHTML }, () => { });
  });
}

function getColorHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: changeTextColor }, () => { });
  });
}

function getFontNameHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: changeFontName }, () => { });
  });
}

function getFontSizeHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: changeFontSize }, () => { });
  });
}

function getBoldHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: bold }, () => { });
  });
}

function changePadding(x, paddingtype) {
  var text = "", containerElement = null;
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var node = sel.getRangeAt(0).commonAncestorContainer;
      containerElement = node.nodeType == 1 ? node : node.parentNode;
      text = sel.toString();
    }
  } else if (typeof document.selection != "undefined" &&
    document.selection.type != "Control") {
    var textRange = document.selection.createRange();
    containerElement = textRange.parentElement();
    text = textRange.text;
  }
  if (paddingtype == "B") {
    containerElement.style.paddingBottom = x.toString() + "px";
  }
  else if (paddingtype == "L") {
    containerElement.style.paddingLeft = x.toString() + "px";
  }
  else if (paddingtype == "R") {
    containerElement.style.paddingRight = x.toString() + "px";
  }
  else if (paddingtype == "T") {
    containerElement.style.paddingTop = x.toString() + "px";
  }
  else if (paddingtype == "A") {
    containerElement.style.padding = x.toString() + "px";
  }

}

function getPaddingHandler(y, paddingtype) {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: changePadding, args: [y, paddingtype] }, () => { });
  });
}


function createPaddingSizeOption(val) {
  for (let i = 0; i < paddingTypes.length; i++) {
    chrome.runtime.onInstalled.addListener(function () {
      chrome.contextMenus.create({
        "title": val.toString() + "px",
        "type": "normal",
        "contexts": ["selection"],
        "id": val.toString() + "px" + paddingTypes[i].substring(0, 1) + "ID",
        "parentId": paddingTypes[i] + "ID"
      });
    })
  }
}

paddingTypes = ["Left", "Right", "Top", "Bottom", "All"]

for (let i = 0; i < paddingTypes.length; i++) {
  chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
      "title": paddingTypes[i],
      "type": "normal",
      "contexts": ["selection"],
      "id": paddingTypes[i] + "ID",
      "parentId": "padID"
    });
  })
}

for (let i = 0; i <= 100; i += 5) {
  createPaddingSizeOption(i)
}




function moveDivOut() {
  containerElement = null;
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var node = sel.getRangeAt(0).commonAncestorContainer;
      containerElement = node.nodeType == 1 ? node : node.parentNode;
      text = sel.toString();
    }
  } else if (typeof document.selection != "undefined" &&
    document.selection.type != "Control") {
    var textRange = document.selection.createRange();
    containerElement = textRange.parentElement();
    text = textRange.text;
  }
  // console.log(containerElement.nodeName);
  if (containerElement.nodeName == "FONT") {
    containerElement = containerElement.parentElement;
  }
  grandParentElement = containerElement.parentElement.parentElement;
  parentElement = containerElement.parentElement
  if (grandParentElement) {
    console.log(grandParentElement)
    console.log(parentElement)
    grandParentElement.insertBefore(containerElement, grandParentElement.children[Array.prototype.indexOf.call(grandParentElement.children, parentElement)]);

  }
}

function moveDivDown() {
  containerElement = null;
  if (typeof window.getSelection != "undefined") {
    var sel = window.getSelection();
    if (sel.rangeCount) {
      var node = sel.getRangeAt(0).commonAncestorContainer;
      containerElement = node.nodeType == 1 ? node : node.parentNode;
      text = sel.toString();
    }
  } else if (typeof document.selection != "undefined" &&
    document.selection.type != "Control") {
    var textRange = document.selection.createRange();
    containerElement = textRange.parentElement();
    text = textRange.text;
  }
  parentElement = containerElement.parentElement
  if (parentElement) {
    console.log(parentElement)
    console.log(containerElement)
    parentElement.insertBefore(containerElement, parentElement.children[Array.prototype.indexOf.call(parentElement.children, containerElement) + 2]);
    // grandParentElement.insertBefore(containerElement, grandParentElement.children[Array.prototype.indexOf.call(grandParentElement.children, parentElement)]);
    // grandParentElement.appendChild(containerElement)
  }
}

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "move out",
    "type": "normal",
    "contexts": ["selection"],
    "id": "movedivUpID"
  });
})

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "move down",
    "type": "normal",
    "contexts": ["selection"],
    "id": "movedivDownID"
  });
})

function getMoveDivUpHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: moveDivOut }, () => { });
  });
}
function getMoveDivDownHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: moveDivDown }, () => { });
  });
}

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  if (info.menuItemId == "htmlID") {
    getHTMLHandler()
  }
  if (info.menuItemId == "colorID") {
    getColorHandler()
  }
  else if (info.menuItemId == "fontNameID") {
    getFontNameHandler()
  }
  else if (info.menuItemId == "fontSizeID") {
    getFontSizeHandler()
  }
  else if (info.menuItemId == "boldID") {
    getBoldHandler()
  }
  else if (info.menuItemId == "movedivUpID") {
    getMoveDivUpHandler()
  }
  else if (info.menuItemId == "movedivDownID") {
    getMoveDivDownHandler()
  }
  else {
    strVal = info.menuItemId.substring(0, info.menuItemId.length - 5)
    strType = info.menuItemId.substring(info.menuItemId.length - 2, info.menuItemId.length - 3)
    console.log(strVal)
    console.log(strType)
    getPaddingHandler(parseInt(strVal), strType)
  }
});
