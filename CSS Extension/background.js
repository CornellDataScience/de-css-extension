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

function getSiblings(e) {
  let siblings = []; 

  if(!e.parentNode) {
      return siblings;
  }
  let sibling  = e.parentNode.firstChild;
  
  while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
          siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
  }
  return siblings;
}

function changeTextColor() {
  // get container element of selected text 
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

    // calculating offset for first parent with id
    let offset = 0;
    while (containerElement.id == "") {
      let containerHtmlString = containerElement.outerHTML;

      offset += containerHtmlString.indexOf(">") - containerHtmlString.indexOf("<") + 1

      // find out position of current child in list
      siblings_exclusive = getSiblings(containerElement);
      siblings_inclusive = containerElement.parentElement.children;

      if (siblings_exclusive.length != 0) {
        index = siblings_exclusive.length-1;
        for (let i=0;i<siblings_exclusive.length;i++) {
          if (siblings_exclusive[i].innerHTML != siblings_inclusive[i].innerHTML) {
            index = i - 1;
            break;
          }
        }

        var test = 0
        for (let i=0;i<=index;i++) {
          console.log(siblings_exclusive[i].outerHTML);
          console.log(siblings_exclusive[i].outerHTML.length);
          test += siblings_exclusive[i].outerHTML.length;
          offset += siblings_exclusive[i].outerHTML.length;
        }
      } 

      containerElement = containerElement.parentElement;
    }

    id = containerElement.id;

    var selection = window.getSelection();
    var start = selection.anchorOffset;
    var end = selection.focusOffset;

    var str = $('#'+id).html();
    str = str.replaceAll('\n','');

    uncomment = "";
    for(let i=0;i<str.length-4;i++) {
      if (str.substring(i,i+4) == "<!--") {
        for (let j=i+4; j<str.length-3; j++) {
          if (str.substring(j,j+3) == "-->") {
            uncomment = str.substring(0,i) + str.substring(j+3);
            break;
          }
        }
      }
    }

    str = uncomment;

    // adding offset to start and end indices of selection
    var startInd = [start + offset];
    var lastInd = [end + offset];

    let pre = str.substring(0, startInd[0]);
    let post = str.substring(lastInd[0], str.length);
    let phrase = str.substring(startInd[0], lastInd[0]);

  str = pre + `<span style="color:red">${phrase}</span>` + post;

  $('#'+id).html(str);

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