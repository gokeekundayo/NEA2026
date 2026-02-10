import { getID } from "../../Engine/Tools/Tools.js";
let settingsButtons = document.querySelectorAll("[settingName]");
let settingPageElements = document.querySelectorAll(".settingPage");
const settingsPages = {};
const elementStyles = {
	".settingPage": {
		display: "flex",
	},
};
for (let page of settingPageElements) {
	settingsPages[page.getAttribute("settingPageName")] = page;
}
for (let settingButton of settingsButtons) {
	settingButton.addEventListener("click", () => {
		settingPageElements.forEach((page) => {
			page.style.display = "none";
		});
		settingsPages[settingButton.getAttribute("settingName")].style.display =
			elementStyles[".settingPage"].display;
	});
}
getID("backgroundVid").addEventListener("contextmenu",(e)=>{
	e.preventDefault()
})