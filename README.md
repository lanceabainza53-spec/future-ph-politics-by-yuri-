# The Black Ledger

A black, futuristic, scrollable website about documented Philippine political corruption records.

## Files
- `index.html` - main webpage
- `styles.css` - black futuristic design
- `app.js` - renders content from JSON
- `data.json` - structured source-backed content
- `Program.cs` - optional C# ASP.NET Core backend serving the static site and `/api/ledger`

## Run as static site
Open `index.html` through a local server, not by double-clicking, because browser fetch rules may block `data.json`.

Example:
```bash
python -m http.server 8000
```
Then open `http://localhost:8000`.

## Run with C# backend
Create a minimal ASP.NET Core web project, replace its `Program.cs`, and place the other files in the project root.

```bash
dotnet new web -n BlackLedger
cd BlackLedger
# copy index.html, styles.css, app.js, data.json, Program.cs here
dotnet run
```
