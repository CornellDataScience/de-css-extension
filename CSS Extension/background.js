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

function getClickHandler(info) {
  // var searchstring = info.selectionText;
  // chrome.tabs.create({ url: "http://google.com/maps?q=" + searchstring })
  //chanve text color of selected
  chrome.tabs.create({ url: "http://google.com/" })
}