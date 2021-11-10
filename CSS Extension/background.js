chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Change Text Color",
    "type": "normal",
    "contexts": ["selection"],
    "id": "colorID"
  });
});

chrome.contextMenus.onClicked.addListener(getColorHandler);

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
  let fontSize = prompt("Choose font size");
  selection();

  document.execCommand("fontSize", false, fontSize);
  document.designMode = "off";
}

function bold() {
  selection();

  document.execCommand("bold", false, null);
  document.designMode = "off";
}

function getColorHandler() {
  chrome.tabs.query({ currentWindow: true, active: true }, (tabs) => {
    chrome.scripting.executeScript({ target: { tabId: tabs[0].id }, func: changeTextColor }, () => { });
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

chrome.contextMenus.onClicked.addListener(function (info, tab) {
  strVal = info.menuItemId.substring(0, info.menuItemId.length - 5)
  strType = info.menuItemId.substring(info.menuItemId.length - 2, info.menuItemId.length - 3)
  console.log(strVal)
  console.log(strType)
  getPaddingHandler(parseInt(strVal), strType)

});
