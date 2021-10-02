let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

function getClickHandler() {
  console.log('hello');
};

chrome.contextMenus.create({
  "title": "TEST",
  "type": "normal",
  "contexts": ["selection"],
  "onclick": getClickHandler(),
  "id": "ID"
});