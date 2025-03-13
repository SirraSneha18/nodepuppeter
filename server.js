const express = require("express");
<<<<<<< HEAD
const puppeteer = require("puppeteer");
const fs = require("fs");
=======
const puppeteer = require("puppeteer-core");
>>>>>>> b7428d7 (Added startup script and updated Puppeteer config)
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

if (!fs.existsSync("./screenshots")) {
  fs.mkdirSync("./screenshots", { recursive: true });
}

app.get("/screenshot", async (req, res) => {
  try {
    const url = req.query.url || "https://example.com";
<<<<<<< HEAD
    const filePath = `./screenshots/example.png`;

    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
      headless: "new",
=======
    
    const browser = await puppeteer.launch({
      executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || "/usr/bin/chromium-browser",
      headless: true,
>>>>>>> b7428d7 (Added startup script and updated Puppeteer config)
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
<<<<<<< HEAD
      ],
=======
        "--single-process"
      ]
>>>>>>> b7428d7 (Added startup script and updated Puppeteer config)
    });

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

<<<<<<< HEAD
    await page.screenshot({ path: filePath });

    await browser.close();

    console.log("Screenshot saved at:", filePath);

    res.sendFile(filePath, { root: "." });
=======
    const screenshot = await page.screenshot();
    await browser.close();

    res.set("Content-Type", "image/png");
    res.send(screenshot);
>>>>>>> b7428d7 (Added startup script and updated Puppeteer config)
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Screenshot failed", message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
