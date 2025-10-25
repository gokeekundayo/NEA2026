using Microsoft.AspNetCore.SignalR;
using FlappyBirdAPI.Controllers;
using System;
using System.IO;
using System.Collections.Generic;
namespace FlappyBirdAPI.Hubs
{
    public class AssetsHub : Hub
    {
        public async Task GetAssetList(string message)
        {
            Console.WriteLine("GetAssetList called with message: ");
            Dictionary<string, List<string>> assetList = GetAssets();
            await Clients.Caller.SendAsync("GetAssetList", assetList);
        }

        private static Dictionary<string, List<string>> GetAssets()
        {

            string root = @"./wwwroot/Assets";
            Dictionary<string, List<string>> assets = new Dictionary<string, List<string>>
            {
                {"images", new List<string>() },
                {"audio", new List<string>() },
                {"models", new List<string>() },
                {"fonts", new List<string>()
                }
            };
            foreach (string file in Directory.EnumerateFiles(root, "*.*", SearchOption.AllDirectories))
            {
                string relative = Path.GetRelativePath(root, file);
                string extension = Path.GetExtension(file).ToLower();
                if (extension == ".png" || extension == ".jpg" || extension == ".jpeg" || extension == ".gif")
                {
                    assets["images"].Add(relative);
                }
                else if (extension == ".mp3" || extension == ".wav" || extension == ".ogg")
                {
                    assets["audio"].Add(relative);
                }
                else if (extension == ".obj" || extension == ".fbx" || extension == ".glb" || extension == ".gltf")
                {
                    assets["models"].Add(relative);
                }
                else if (extension == ".otf" || extension == ".ttf")
                {
                    //Ignore Fonts for now
                    assets["fonts"].Add(relative);
                }
                else
                {
                    Console.WriteLine($"Unrecognized asset type: {relative}");
                }

            }
            return assets;
        }
    }

}
