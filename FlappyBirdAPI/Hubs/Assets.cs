using Microsoft.AspNetCore.SignalR;

namespace FlappyBirdAPI.Hubs
{
    public class AssetsHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine($"Received message from {user}: {message}");
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
    }
}
