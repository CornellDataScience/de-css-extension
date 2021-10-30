let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});



chrome.runtime.onInstalled.addListener(function () {
  chrome.contextMenus.create({
    "title": "TEST",
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

function changeTextColor() {
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

  // var str = $("#discussion_container").html();
  // console.log(str)

  /*
  var txt = this.innerText;
  var selection = window.getSelection();
  var start = selection.anchorOffset;
  var end = selection.focusOffset;

  var startInd = [start];
  var lastInd = [end];
  var count = startInd.length;

  
  let pre = str.substring(0, startInd[i]);
  let post = str.substring(lastInd[i], str.length);
  let phrase = str.substring(startInd[i], lastInd[i]);

  let nextPhrase;

  if (i < count - 1) {
    nextPhrase = str.substring(startInd[i + 1], lastInd[i + 1]);
  }

str = pre + `<div style='display:inline; color:#ed3833; cursor:pointer;'>${phrase}</div>` + post;

if (i < count - 1) {
  startInd[i + 1] = str.indexOf(nextPhrase, startInd[i + 1]) - 1;
  lastInd[i + 1] = startInd[i + 1] + nextPhrase.length;
}

$(containerElement.id).html(str);
*/

  //Object.assign(containerElement, Element).style.color = "red";

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