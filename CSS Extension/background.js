let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "Change Text Color",
    "type": "normal",
    "contexts": ["selection"],
    "id": "testID"
  });
});

chrome.contextMenus.onClicked.addListener(getClickHandler);

chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "PAD_ELEMENT",
    "type": "normal",
    "contexts": ["selection"],
    "id": "padID"
  });

});

//Potential function to return the current container element. Produces errors in some case.
// function getContainerElement() {
//   var text = "", containerElement = null;
//   if (typeof window.getSelection != "undefined") {
//     var sel = window.getSelection();
//     if (sel.rangeCount) {
//       var node = sel.getRangeAt(0).commonAncestorContainer;
//       containerElement = node.nodeType == 1 ? node : node.parentNode;
//       text = sel.toString();
//     }
//   } else if (typeof document.selection != "undefined" &&
//     document.selection.type != "Control") {
//     var textRange = document.selection.createRange();
//     containerElement = textRange.parentElement();
//     text = textRange.text;
//   }
//   return containerElement
// }

function getSiblings (elem) {
	var siblings = [];
	var sibling = elem.parentNode.firstChild;

	while (sibling) {
		if (sibling.nodeType === 1 && sibling !== elem) {
			siblings.push(sibling);
		}
		sibling = sibling.nextSibling
	}

	return siblings;
}

function isColor (strColor) {
  const s = new Option().style;
  s.color = strColor;
  return s.color !== '';
}

function changeTextColor() {
  let color = prompt("Choose font color (string or hex are accepted)");
  if (!isColor(color)) {
    alert("Invalid text color!");
  } else {
    sel = window.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
      range = sel.getRangeAt(0);
    }
    // Set design mode to on
    document.designMode = "on";
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }

    // Colorize text
    document.execCommand("ForeColor", false, color);
    // Set design mode to off
    document.designMode = "off";
  }
}

function getClickHandler() {
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
function colorElement(id) {
  var el = document.getElementById(id);
  el.style.color = "red";
}