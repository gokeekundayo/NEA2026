namespace FlappyBirdAPI.Controllers
{
    public class GameRoom
    {
        public string RoomID { get; set; }
        public string RoomName { get; set; }
        public int MaxPlayers { get; set; }

        public Dictionary<string, Player> Players { get; set; } = new Dictionary<string, Player>();
    }
}