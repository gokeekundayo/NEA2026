import { getID } from "../Engine/Tools/Tools.js";
let settingsButtons = document.querySelectorAll("[settingName]");
let settingPageElements = document.querySelectorAll(".settingPage");
const settingsPages = {};

for (let page of settingPageElements) {
	settingsPages[page.getAttribute("settingPageName")] = page;
}
for (let settingButton of settingsButtons) {
	settingButton.addEventListener("click", () => {
		settingPageElements.forEach((page) => {
			page.style.display = "none";
		});
		settingsPages[settingButton.getAttribute("settingName")].style.display =
			"grid";
	});
}
