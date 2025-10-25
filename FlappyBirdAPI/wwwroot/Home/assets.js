//
import { connection } from "../Engine/Tools/Connection.js";
import { ServerRequest } from "../Engine/Tools/ServerRequest.js";
import { getID } from "../Engine/Tools/Tools.js";
export async function GetAssetList(assetRequest) {
	let assetList;
	await new Promise((resolve, reject) => {
		assetRequest.addEventListener("GetAssetList", (assets) => {
			assetList = assets;

			resolve();
		}); //Request asset list from server cl
		assetRequest.send("GetAssetList", ["Hello from the client!"]);
		return assetList;
	});

	return assetList;
}

export async function LoadAssets(AssetList) {
	const loadedImages = [];
	let Assets = [];
	for (let source in AssetList) {
		await new Promise((resolve, reject) => {
			const Asset = new Image();
			Asset.src = AssetList[source];
			const percentage = (source / (AssetList.length - 1)) * 100;
			getID("currentAssetText").innerHTML = AssetList[source].replace(
				"../Assets/",
				""
			);

			Asset.addEventListener("load", () => {
				Assets[AssetList[source].replace("../Assets/", "")] = Asset;
				getID("progressFill").style.width = `${percentage}%`;

				resolve();
			});
			Asset.onerror = reject;
		});
	}
	return Assets;
}
