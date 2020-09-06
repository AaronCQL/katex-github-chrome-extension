import { Messages } from "./utils/constants";

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  console.log(details);
  chrome.tabs.sendMessage(details.tabId, { type: Messages.ROUTE_CHANGED });
});
