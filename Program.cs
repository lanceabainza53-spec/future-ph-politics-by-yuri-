using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

// Optional C# static-file server for local testing with .NET.
// GitHub Pages will only use index.html, styles.css, app.js, and data.json.
app.UseDefaultFiles();
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(Directory.GetCurrentDirectory())
});

app.MapGet("/api/status", () => new
{
    site = "The Black Ledger 2100",
    status = "running",
    note = "Static GitHub Pages build uses the front-end files. This endpoint is for .NET hosting only."
});

app.Run();
