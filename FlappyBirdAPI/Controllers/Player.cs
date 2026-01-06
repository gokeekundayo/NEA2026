using System.Numerics;

namespace FlappyBirdAPI.Controllers
{
    public class Player
    {
        public string ConnectionID { get; set; }
        public string Username { get; set; }
        public int Score { get; set; }
        public List<Skin> Skins {get;} = new List<Skin>();

        public Skin CurrentSkin{get;}
        
        public Dictionary<string, int>? Velocity { get; set; }
        public Dictionary<string, int>? Position { get; set; }
    }
}