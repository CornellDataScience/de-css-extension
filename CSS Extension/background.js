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
    "title": "Copy CSS",
    "type": "normal",
    "contexts": ["selection"],
    "id": "getCSSID"

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

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Copy HTML",
    "type": "normal",
    "contexts": ["selection"],
    "id": "copyhtmlID"
  });
});

function copyHTML() {
  var fullCode = document.documentElement.innerHTML;
  console.log(fullCode);
  navigator.clipboard.writeText(fullCode).then(function () {
    alert('Copied to clipboard!');
  }, function (err) {
    alert("Could not copy text: " + err);
  });
}
// Pretty redundant, as inspecting page makes it very easy to see the html. I think 
//copy is still useful, as it is much easier than inspecting, highlighting it all, and copying.

// function showHTML() {
//   var fullCode = document.documentElement.innerHTML;
//   var tab = window.open('about:blank', '_blank');
//   tab.document.body.innerHTML = fullCode.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
//   // tab.document.write(fullCode); // where 'html' is a variable containing your HTML
//   tab.document.close();
// }
// var originalcss = '';
// function getOriginalCSS() {


//   var elems = document.body.getElementsByTagName("*");
//   for (var l = 0; l < elems.length; l++) {
//     containerElement = elems.item(l);
//     var o = getComputedStyle(containerElement);
//     for (var k = 0; k < o.length; k++) {
//       originalcss += o[k] + ':' + o.getPropertyValue(o[k]) + ';';
//     }
//   }
//   console.log(originalcss)


// }
// chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete') {
//     chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
//       chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: getOriginalCSS }, () => { });
//     });
//   }

// })

function getCSS() {
  containerElement = null;
  if (typeof window.getSelection != "undefined") {
    var sel = window.getsel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);
    }

    document.designMode = "on";
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
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

  var s = '';


  var o = getComputedStyle(containerElement);
  for (var k = 0; k < o.length; k++) {
    s += o[k] + ':' + o.getPropertyValue(o[k]) + ';';
  }



  // var i = 0;
  // var j = 0;
  // var result = "";

  // while (j < s.length) {
  //   if (originalcss[i] != s[j] || i == originalcss.length)
  //     result += s[j];
  //   else
  //     i++;
  //   j++;
  // }
  console.log(s);
  navigator.clipboard.writeText(s).then(function () {
    alert('Copied to clipboard!');
  }, function (err) {
    alert("Could not copy text: " + err);
  });
}
// function selection() {
//   sel = window.getsel = window.getSelection();
//   if (sel.rangeCount && sel.getRangeAt) {
//     range = sel.getRangeAt(0);
//   }

//   document.designMode = "on";
//   if (range) {
//     sel.removeAllRanges();
//     sel.addRange(range);
//   }
// }

function changeTextColor() {
  let color = prompt("Choose font color (string or hex are accepted)");
  sel = window.getsel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
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
  sel = window.getsel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
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
  sel = window.getsel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
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
  sel = window.getsel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
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

function highlight() {
  sel = window.getsel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("hiliteColor", true, "yellow");
  document.designMode = "off";
}

function underline() {
  sel = window.getsel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("underline", false, null);
  document.designMode = "off";
}

function justifyLeft() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("justifyLeft", false, null);
  document.designMode = "off";
}

function justifyRight() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("justifyRight", false, null);
  document.designMode = "off";
}

function justifyCenter() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("justifyCenter", false, null);
  document.designMode = "off";
}

function deleteText() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("delete", false, null);
  document.designMode = "off";
}

function italicize() {
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("italic", false, null);
  document.designMode = "off";
}

function replaceText() {
  let text = prompt("Text to replace selection:");
  sel = window.getSelection();
  if (sel.rangeCount && sel.getRangeAt) {
    range = sel.getRangeAt(0);
  }

  document.designMode = "on";
  if (range) {
    sel.removeAllRanges();
    sel.addRange(range);
  }

  document.execCommand("insertText", false, text);
  document.designMode = "off";
}

function getCopyHTMLHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: copyHTML }, () => { });
  });
}


function getCSSHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: getCSS }, () => { });
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
    var sel = window.getsel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);
    }

    document.designMode = "on";
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
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
    var sel = window.getsel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);
    }

    document.designMode = "on";
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
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
    var sel = window.getsel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);
    }

    document.designMode = "on";
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
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
    "title": "Move out",
    "type": "normal",
    "contexts": ["selection"],
    "id": "movedivUpID"
  });
})

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Move down",
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
  if (info.menuItemId == "copyhtmlID") {
    getCopyHTMLHandler()
  }
  else if (info.menuItemId == "getCSSID") {
    getCSSHandler()
  }
  else if (info.menuItemId == "colorID") {
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
