using System.Numerics;

namespace FlappyBirdAPI.Controllers
{
    public class Player
    {
        public string ConnectionID { get; set; }
        public string Username { get; set; }
        public int Score { get; set; }
        public List<Skin> Skins { get; } = new List<Skin>();
        public string? CurrentRoomID { get; set; }
        public Skin CurrentSkin { get; }

        public Dictionary<string, float>? Velocity { get; set; }
        public Dictionary<string, float>? Position { get; set; }
    }
}