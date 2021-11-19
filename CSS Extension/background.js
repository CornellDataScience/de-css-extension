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
    "title": "Highlight",
    "type": "normal",
    "contexts": ["selection"],
    "id": "highlightID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Underline",
    "type": "normal",
    "contexts": ["selection"],
    "id": "underlineID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Justify Left",
    "type": "normal",
    "contexts": ["selection"],
    "id": "justifyLeftID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Justify Right",
    "type": "normal",
    "contexts": ["selection"],
    "id": "justifyRightID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Justify Center",
    "type": "normal",
    "contexts": ["selection"],
    "id": "justifyCenterID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Delete",
    "type": "normal",
    "contexts": ["selection"],
    "id": "deleteID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Italicize",
    "type": "normal",
    "contexts": ["selection"],
    "id": "italicizeID",
    "parentId": "editID"
  });
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Replace Text",
    "type": "normal",
    "contexts": ["selection"],
    "id": "replaceID",
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
  selection();

  document.execCommand("ForeColor", false, color);
  document.designMode = "off";
}

function changeFontName() {
  let fontName = prompt("Choose font");
  selection();

  document.execCommand("fontName", false, fontName);
  document.designMode = "off";
}

function changeFontSize() {
  let fontSize = prompt("Choose font size (1-7)");
  selection();

  document.execCommand("fontSize", false, fontSize);
  document.designMode = "off";
}

function bold() {
  selection();

  document.execCommand("bold", false, null);
  document.designMode = "off";
}

function highlight() {
  selection();

  document.execCommand("hiliteColor", true, "yellow");
  document.designMode = "off";
}

function underline() {
  selection();

  document.execCommand("underline", false, null);
  document.designMode = "off";
}

function justifyLeft() {
  selection();

  document.execCommand("justifyLeft", false, null);
  document.designMode = "off";
}

function justifyRight() {
  selection();

  document.execCommand("justifyRight", false, null);
  document.designMode = "off";
}

function justifyCenter() {
  selection();

  document.execCommand("justifyCenter", false, null);
  document.designMode = "off";
}

function deleteText() {
  selection();

  document.execCommand("delete", false, null);
  document.designMode = "off";
}

function italicize() {
  selection();

  document.execCommand("italic", false, null);
  document.designMode = "off";
}

function replaceText() {
  let text = prompt("Text to replace selection:");
  selection();

  document.execCommand("insertText", false, text);
  document.designMode = "off";
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

function getHighlightHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: highlight }, () => { });
  });
}

function getUnderlineHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: underline }, () => { });
  });
}

function getJustifyLeftHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: justifyLeft }, () => { });
  });
}

function getJustifyRightHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: justifyRight }, () => { });
  });
}

function getJustifyCenterHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: justifyCenter }, () => { });
  });
}

function getDeleteHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: deleteText }, () => { });
  });
}

function getItalicizeHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: italicize }, () => { });
  });
}

function getReplaceHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: replaceText }, () => { });
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
  else if (info.menuItemId == "highlightID") {
    getHighlightHandler()
  }
  else if (info.menuItemId == "underlineID") {
    getUnderlineHandler()
  }
  else if (info.menuItemId == "justifyLeftID") {
    getJustifyLeftHandler()
  }
  else if (info.menuItemId == "justifyRightID") {
    getJustifyRightHandler()
  }
  else if (info.menuItemId == "justifyCenterID") {
    getJustifyCenterHandler()
  }
  else if (info.menuItemId == "deleteID") {
    getDeleteHandler()
  }
  else if (info.menuItemId == "italicizeID") {
    getItalicizeHandler()
  }
  else if (info.menuItemId == "replaceID") {
    getReplaceHandler()
  }
  else {
    strVal = info.menuItemId.substring(0, info.menuItemId.length - 5)
    strType = info.menuItemId.substring(info.menuItemId.length - 2, info.menuItemId.length - 3)
    console.log(strVal)
    console.log(strType)
    getPaddingHandler(parseInt(strVal), strType)
  }
});
