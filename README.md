# 🍿 CinePick — Movie Night Randomizer

CinePick is a premium, dark-themed, interactive single-page web application designed to eliminate the struggle of choosing what to watch. Featuring a smart "Lock & Randomize" mechanism, a clean glassmorphic design, and automated movie database updates, CinePick guarantees a curated list of lighthearted, non-horror movie recommendations.

---

## ✨ Features

- **3-Slot Movie Roll:** Roll three popular movie suggestions at once.
- **Smart Card Locking:** Lock specific movie slots that catch your eye, and click **Refresh Unlocked** to randomize the remaining cards.
- **Curated Favorites List:** Heart your favorite movies to save them to a list stored in your browser's `localStorage`.
- **Celebration Animations:** Selecting a movie triggers a custom, physics-based 2D canvas fireworks display and a victory overlay modal.
- **IMDb Integrations:** Click the IMDb badge on any card to view detailed metadata, ratings, runtimes, and movie overviews.
- **Live IMDb Scraper & Wikipedia Resolver:** Includes a Python background sync engine that scrapes popular films, filters out horror movies, and queries Wikipedia APIs to find high-res posters and IMDb IDs.
- **Local Fallback Mode:** Works perfectly offline or when rate-limited, falling back to a pre-seeded, high-quality collection of recent movies.

---

## 📂 Project Structure

- 🐍 **[server.py](file:///Users/katieyao/kayao-movie-pick-app/server.py)**: A lightweight Python dev server that handles static files and handles API request routes.
- 🕷️ **[update_movies.py](file:///Users/katieyao/kayao-movie-pick-app/update_movies.py)**: The IMDb scraper and Wikipedia poster crawler.
- 📦 **[movies.json](file:///Users/katieyao/kayao-movie-pick-app/movies.json)**: The local JSON database storing the scraped movie catalog and timestamp.
- 🎨 **[index.html](file:///Users/katieyao/kayao-movie-pick-app/index.html)**, **[app.js](file:///Users/katieyao/kayao-movie-pick-app/app.js)**, **[styles.css](file:///Users/katieyao/kayao-movie-pick-app/styles.css)**: Glassmorphic user interface and animations logic.

---

## 🚀 Getting Started

### Prerequisites
- Python 3.x installed.
- No external Python dependencies required! (The scraper runs entirely on Python's built-in `urllib` libraries).

### Running the App

1. Navigate to the project root:
   ```bash
   cd kayao-movie-pick-app
   ```

2. Start the local server:
   ```bash
   python3 server.py
   ```

3. The server will run on port **8000** and should automatically open `http://localhost:8000` in your web browser. If it doesn't open automatically, navigate to the link manually.

---

## 🔄 Updating the Movie Database

To pull the latest trending movies from IMDb and crawl corresponding high-res posters from Wikipedia:

- Click the **🔄 Update List** button located in the application header.
- Alternatively, you can run the scraper manually in your terminal:
  ```bash
  python3 update_movies.py
  ```
- This updates `movies.json` in real time with the latest results.
