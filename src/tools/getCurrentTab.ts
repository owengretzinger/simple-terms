export async function getCurrentTab() {
  let [currentTab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  return currentTab.url || "default";
}
