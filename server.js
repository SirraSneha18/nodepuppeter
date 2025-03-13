const express = require("express");
const puppeteer = require("puppeteer");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

if (!fs.existsSync("./screenshots")) {
  fs.mkdirSync("./screenshots", { recursive: true });
}

app.get("/screenshot", async (req, res) => {
  try {
    const url = req.query.url || "https://example.com";
    const filePath = `./screenshots/example.png`;

    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
      ],
    });

    const page = await browser.newPage();
    console.log("Navigating to:", url);
    await page.goto(url, { waitUntil: "networkidle0" });

    await page.screenshot({ path: filePath });

    await browser.close();

    console.log("Screenshot saved at:", filePath);

    res.sendFile(filePath, { root: "." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Screenshot failed", message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
