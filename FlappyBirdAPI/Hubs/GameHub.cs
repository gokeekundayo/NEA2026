using Microsoft.AspNetCore.SignalR;
using FlappyBirdAPI.Controllers;
using System.Numerics;
namespace FlappyBirdAPI.Hubs
{
    public class GameHub : Hub
    {
        private readonly static Dictionary<string, Player> PlayerList = new Dictionary<string, Player>();
        // GameHub methods will go here
        public async Task JoinGame(string username
        )
        {
            PlayerList[Context.ConnectionId] = new Player
            {
                ConnectionID = Context.ConnectionId,
                Username = username,
                Score = 0,
                Velocity = new Dictionary<string, int>
                {
                    { "X", 0 },
                    { "Y", 0 }
                },
                Position = new Dictionary<string, int>
                {
                    { "X", 0 },
                    { "Y", 0 }
                },


            };
            Console.WriteLine($"Player {username} joined the game with ConnectionID: {Context.ConnectionId}");
            await Clients.Caller.SendAsync("GameJoined", new Dictionary<string, string>
            {
                { "ConnectionID", Context.ConnectionId },
                { "Username", username }
            });
        }
        public async Task GetPlayers(string username)
        {
            await Clients.Caller.SendAsync("PlayerList", PlayerList);
            Console.WriteLine($"Sent player list to {username}");
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (PlayerList.ContainsKey(Context.ConnectionId))
            {
                PlayerList.Remove(Context.ConnectionId);
                Console.WriteLine($"Player {Context.ConnectionId} disconnected and removed from PlayerList.");
            }
            await base.OnDisconnectedAsync(exception);
        }



    }
}