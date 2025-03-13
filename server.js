const express = require("express");
const puppeteer = require("puppeteer-core");
const fs = require("fs");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

// Ensure screenshots directory exists
if (!fs.existsSync("./screenshots")) {
  fs.mkdirSync("./screenshots", { recursive: true });
}

app.get("/screenshot", async (req, res) => {
  try {
    const url = req.query.url || "https://example.com";
    const filePath = `./screenshots/example.png`;

    console.log("Using Puppeteer executable path:", process.env.PUPPETEER_EXECUTABLE_PATH);
    console.log("Launching Puppeteer...");

    const browser = await puppeteer.launch({
      headless: "new",
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium-browser",
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

    // Save screenshot
    await page.screenshot({ path: filePath });

    await browser.close();

    console.log("Screenshot saved at:", filePath);

    // Send the saved image file
    res.sendFile(filePath, { root: "." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Screenshot failed", message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
