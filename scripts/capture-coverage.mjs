import assert from "node:assert/strict";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const reportPath = resolve("coverage/lcov-report/index.html");
assert.ok(
  existsSync(reportPath),
  "Chưa có báo cáo coverage. Hãy chạy npm run test:coverage trước.",
);

const executablePath =
  process.env.CHROME_PATH ||
  [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
  ].find(existsSync);

assert.ok(
  executablePath,
  "Không tìm thấy Chrome/Edge. Có thể đặt biến CHROME_PATH tới trình duyệt.",
);

mkdirSync(resolve("reports"), { recursive: true });
const screenshotPath = resolve("reports/coverage-report.png");
const result = spawnSync(
  executablePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--hide-scrollbars",
    "--allow-file-access-from-files",
    "--run-all-compositor-stages-before-draw",
    "--virtual-time-budget=1500",
    "--timeout=1500",
    "--window-size=1440,900",
    `--screenshot=${screenshotPath}`,
    pathToFileURL(reportPath).href,
  ],
  { stdio: "inherit" },
);

assert.equal(result.status, 0, "Chrome không thể chụp báo cáo coverage.");
assert.ok(existsSync(screenshotPath), "Không tìm thấy ảnh coverage sau khi chụp.");
console.log("Đã lưu ảnh reports/coverage-report.png");
