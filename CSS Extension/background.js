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
  sel = document.activeElement;
  Object.assign(sel, Element).style.color = "red";
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