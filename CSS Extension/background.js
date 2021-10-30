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

    var str = $("#discussion_container").html();
    console.log(str)

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

function colorElement(id) {
  var el = document.getElementById(id);
  el.style.color = "red";
}