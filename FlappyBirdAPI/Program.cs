using FlappyBirdAPI.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddOpenApi();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSignalR();
//CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyMethod()
              .AllowAnyHeader()
              .WithOrigins("http://localhost:3000") // your frontend URL
              .AllowCredentials();
    });
});

//
var app = builder.Build();

// OpenAPI in development
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}
app.UseCors();
// Serve static files BEFORE controllers and hubs
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

// Map controllers
app.MapControllers();
app.UseRouting();
// Map SignalR hub
app.MapHub<AssetsHub>("/assetsHub");
app.MapHub<GameHub>("/gameHub");

// Sample weather endpoint

app.Run();
