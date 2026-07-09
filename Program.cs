using System.Text.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory()),
    RequestPath = ""
});

app.MapGet("/api/ledger", async () =>
{
    var json = await File.ReadAllTextAsync("data.json");
    return Results.Json(JsonSerializer.Deserialize<object>(json));
});

app.MapGet("/api/health", () => new
{
    status = "online",
    message = "The Black Ledger C# backend is running. Humanity remains questionable."
});

app.Run();
