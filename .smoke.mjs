import puppeteer from "puppeteer-core";

const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const URL = "http://localhost:3000/";

const errors = [];
const warnings = [];

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--enable-unsafe-swiftshader",
    "--use-gl=swiftshader",
    "--no-sandbox",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-renderer-backgrounding",
  ],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900 });
await page.bringToFront();

page.on("console", (msg) => {
  const t = msg.type();
  const txt = msg.text();
  if (txt.startsWith("CA_INSPECT")) console.log("LOG>", txt);
  if (t === "error") errors.push(txt);
  if (t === "warning") warnings.push(txt);
});
let firstStack = null;
page.on("pageerror", (e) => {
  errors.push("PAGEERROR: " + e.message);
  if (!firstStack) firstStack = e.stack || "(no stack)";
});

await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 90000 });

// Capture the grand door mid-intro.
await new Promise((r) => setTimeout(r, 1800));
await page.screenshot({ path: ".smoke-intro.png" });

// Let the intro choreography finish + scene reveal.
await new Promise((r) => setTimeout(r, 9000));

const report = await page.evaluate(() => {
  const canvas = document.querySelector("canvas.bg-canvas");
  const scene = document.querySelector("main.scene");
  const doors = document.querySelectorAll(".door").length;
  const orbs = document.querySelectorAll(".orb").length;
  const tnodes = document.querySelectorAll(".tnode").length;
  const introGone = !document.querySelector(".intro");
  const realCanvas = document.querySelector("canvas");
  return {
    hasCanvas: !!canvas,
    anyCanvas: !!realCanvas,
    canvasW: realCanvas?.width || 0,
    canvasH: realCanvas?.height || 0,
    sceneVisible: scene ? getComputedStyle(scene).visibility : "none",
    sceneOpacity: scene ? getComputedStyle(scene).opacity : "n/a",
    doors,
    orbs,
    tnodes,
    introGone,
  };
});

// Hero / portfolio screenshot.
await page.evaluate(() => window.scrollTo(0, 0));
await new Promise((r) => setTimeout(r, 600));
await page.screenshot({ path: ".smoke-hero.png" });

// Click the first project door and confirm the case-study modal opens.
let modalOpened = false;
try {
  await page.click(".door");
  await new Promise((r) => setTimeout(r, 1000));
  modalOpened = await page.evaluate(() => !!document.querySelector(".modal .room"));
  await page.screenshot({ path: ".smoke-modal.png" });
} catch (e) {
  errors.push("DOOR CLICK FAILED: " + e.message);
}

await browser.close();

if (firstStack) {
  console.log("=== FIRST ERROR STACK ===");
  console.log(firstStack);
}

console.log("=== SMOKE REPORT ===");
console.log(JSON.stringify({ ...report, modalOpened }, null, 2));
console.log("console errors:", errors.length);
errors.slice(0, 20).forEach((e) => console.log("  ✗", e));
console.log("console warnings:", warnings.length);
warnings.slice(0, 8).forEach((w) => console.log("  ⚠", w));
