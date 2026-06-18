import http.server
import socketserver
import webbrowser
import sys
import os
import json

# Change working directory to the directory of this script
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)
sys.path.append(script_dir)

PORT = 8000

class QuietSimpleHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    # Quiet server logs a bit so it doesn't spam the console too much
    def log_message(self, format, *args):
        # Only log errors and major changes, bypass standard GET logs for clean output
        if "404" in args[1] or "500" in args[1]:
            super().log_message(format, *args)

    def do_POST(self):
        if self.path == '/api/refresh':
            try:
                print("🔄 API Request: Refreshing movie database from IMDb...")
                import update_movies
                # Force reload update_movies in case it changed
                import importlib
                importlib.reload(update_movies)
                
                # Execute the scraper
                update_movies.main()
                
                # Read the newly generated movies.json
                with open("movies.json", "r", encoding="utf-8") as f:
                    movies_data = json.load(f)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                
                response = {
                    "status": "success",
                    "last_updated": movies_data.get("last_updated", "")
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
                print("✅ API Request: Database refresh completed successfully!")
            except Exception as e:
                print(f"❌ API Request: Error refreshing database: {e}")
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {
                    "status": "error",
                    "message": str(e)
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

# Allow port reuse to avoid 'Address already in use' errors
socketserver.TCPServer.allow_reuse_address = True

print("=" * 60)
print(" 🎬  CinePick Local Dev Server Starting...")
print(f" 👉  Serving: {script_dir}")
print(f" 👉  Opening: http://localhost:{PORT}")
print(" 🛑  Press Ctrl+C to stop the server")
print("=" * 60)

try:
    with socketserver.TCPServer(("", PORT), QuietSimpleHTTPRequestHandler) as httpd:
        # Open web browser automatically
        try:
            webbrowser.open(f"http://localhost:{PORT}")
        except Exception as e:
            print(f" Could not auto-open browser: {e}")
            print(f" Please manually visit http://localhost:{PORT} in your browser.")
        
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\n 👋 CinePick server stopped. Have a great movie night!")
    sys.exit(0)
except Exception as e:
    print(f" ❌ Error starting server: {e}")
    sys.exit(1)
