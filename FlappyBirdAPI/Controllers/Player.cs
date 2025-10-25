namespace FlappyBirdAPI.Controllers
{
    public class Player
    {
        public string ConnectionID { get; set; }
        public string Username { get; set; }
        public int Score { get; set; }
        public int X { get; set; }
        public int Y { get; set; }
    }
}