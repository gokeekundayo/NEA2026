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

// Sample weather endpoint
var summaries = new[]
{
    "Freezing","Bracing","Chilly","Cool","Mild","Warm","Balmy","Hot","Sweltering","Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        )).ToArray();
    return forecast;
}).WithName("GetWeatherForecast");

app.Run();
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
