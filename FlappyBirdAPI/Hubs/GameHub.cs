using Microsoft.AspNetCore.SignalR;
using FlappyBirdAPI.Controllers;
using System.Numerics;
namespace FlappyBirdAPI.Hubs
{

    public class GameHub : Hub
    {
        //
        private readonly static GameRoom Room1 = new GameRoom
        {
            RoomID = "room1",
            RoomName = "First Room",
            MaxPlayers = 4,
            Players = new Dictionary<string, Player>()
        };
        private readonly static List<GameRoom> GameRooms = new List<GameRoom>
        {
            Room1
        };
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
                Velocity = new Dictionary<string, float>
                {
                    { "X", 0 },
                    { "Y", 0 }
                },
                Position = new Dictionary<string, float>
                {
                    { "X", 0 },
                    { "Y", 0 }
                },


            };
            Console.WriteLine($"Player {username} joined the game with ConnectionID: {Context.ConnectionId}");
            await Clients.All.SendAsync("GameJoined", new Dictionary<string, string>
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
<<<<<<< HEAD
         public async Task PlayerUpdate(Dictionary<string, Dictionary<string, int>> props)
        {
            Console.WriteLine("d");
=======

        public async Task GetRoomList()
        {
            await Clients.Caller.SendAsync("ReceiveRoomList", GameRooms);
        }
        public async Task JoinRoom(string roomId, string username)
        {

            var room = GameRooms.Find(r => r.RoomID == roomId);
            if (room != null && room.Players.Count < room.MaxPlayers)
            {
                var player = PlayerList[Context.ConnectionId];
                room.Players[Context.ConnectionId] = player;
                player.CurrentRoomID = room.RoomID;
                Console.WriteLine($"Player {username} joined room {room.RoomName}");
                await Groups.AddToGroupAsync(Context.ConnectionId, roomId);

                await Clients.Group(roomId).SendAsync("JoinRoom", new Dictionary<string, object>()
                {
                    { "valid", true },
                    {"room", room },
                    {"size", room.Players.Count},
                    {"source", player}

                });

            }
            else
            {
                await Clients.Caller.SendAsync("RoomFull", new Dictionary<string, object>()
                {
                    { "valid", false },
                    {"room", "room" }

                });
                //Crashes for some reason
            }
        }
        public async Task UpdatePosition(string connectionId, Dictionary<string, float> position)//Ensure this stays as <string, float>
        {
            //     Console.WriteLine("testing");
            if (PlayerList.ContainsKey(connectionId))
            {
                PlayerList[connectionId].Position["X"] = position["X"];
                PlayerList[connectionId].Position["Y"] = position["Y"];
                // Notify all clients about the position update
                await Clients.Others.SendAsync("PlayerUpdated", connectionId, position);
                //Console.WriteLine($"Updated position for player {connectionId} to X: {position["X"]}, Y: {position["Y"]}");
            }

>>>>>>> 3c2be098ff81eac5e0f92e64a3cf5f91567f795d
        }
        public override async Task OnDisconnectedAsync(Exception exception)
        {
            if (PlayerList.ContainsKey(Context.ConnectionId))
            {

                Console.WriteLine("Current Players:" + Room1.Players.Count);
                Console.WriteLine("Current Players:" + Room1.Players.Count);
                var player = PlayerList[Context.ConnectionId];
                // Remove player from any room they are in
                if (player.CurrentRoomID != null)
                {
                    var room = GameRooms.Find(r => r.RoomID == player.CurrentRoomID);
                    if (room != null && room.Players.ContainsKey(Context.ConnectionId))
                    {
                        room.Players.Remove(Context.ConnectionId);
                        await Groups.RemoveFromGroupAsync(Context.ConnectionId, room.RoomID);
                        await Clients.OthersInGroup(room.RoomID).SendAsync("PlayerLeft", Context.ConnectionId);
                        Console.WriteLine($"Player {player.Username} left room {room.RoomName}");
                    }
                }
            }

            await base.OnDisconnectedAsync(exception);
        }
       

        public async Task UpdateScore(string connectionId, int score)
        {
            if (PlayerList.ContainsKey(connectionId))
            {
                //Console.WriteLine($"Updating score for player {connectionId} to {score}");
                PlayerList[connectionId].Score = score;
                await Clients.Others.SendAsync("PlayerScoreUpdated", connectionId, score);
            }
        }

    }
}