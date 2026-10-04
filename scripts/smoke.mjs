import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import puppeteer from "puppeteer-core";

const executablePath =
  process.env.CHROME_PATH ||
  [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
  ].find(existsSync);

assert.ok(
  executablePath,
  "Không tìm thấy Chrome hoặc Edge. Đặt biến CHROME_PATH để chạy kiểm tra.",
);

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-gpu"],
});

try {
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle0" });

  const initial = await page.evaluate(() => ({
    total: document.querySelector(".panel-header h2 span")?.textContent,
    rowCount: document.querySelectorAll(".product-row").length,
    firstSku: document.querySelector(".sku")?.textContent,
    scrollHeight: document.querySelector(".table-body")?.scrollHeight,
  }));
  assert.equal(initial.total, "10.000");
  assert.equal(initial.firstSku, "SP-00001");
  assert.ok(
    initial.rowCount < 40,
    `Chỉ nên render các dòng gần viewport, thấy ${initial.rowCount}`,
  );
  assert.equal(initial.scrollHeight, 570_000);
  await page.screenshot({ path: "reports/after/preview.png", fullPage: true });

  await page.$eval(".table-body", (element) => {
    element.scrollTop = element.scrollHeight;
  });
  await page.waitForFunction(
    () => document.querySelector(".sku")?.textContent !== "SP-00001",
  );
  const lastVisibleSku = await page.$eval(
    ".sku",
    (element) => element.textContent,
  );
  assert.ok(
    Number(lastVisibleSku.slice(3)) > 9_900,
    "Cuộn tới cuối phải hiện sản phẩm gần cuối danh sách",
  );

  await page.select('select[aria-label="Lọc danh mục"]', "Sách");
  assert.equal(
    await page.$eval(".panel-header h2 span", (element) => element.textContent),
    "2.000",
  );
  await page.type('input[aria-label="Tìm sản phẩm"]', "React");
  const filteredCount = Number(
    (
      await page.$eval(
        ".panel-header h2 span",
        (element) => element.textContent,
      )
    ).replace(".", ""),
  );
  assert.ok(filteredCount > 0 && filteredCount < 2_000);
  assert.match(
    await page.$eval(".product-name", (element) => element.textContent),
    /React/,
  );

  await page.select('select[aria-label="Sắp xếp"]', "price-desc");
  const prices = await page.$$eval(".price-cell", (elements) =>
    elements
      .slice(0, 2)
      .map((element) => Number(element.textContent.replace(/\D/g, ""))),
  );
  assert.ok(prices[0] >= prices[1], "Giá bán phải được sắp xếp giảm dần");

  await page.click(".product-name");
  assert.ok(
    await page.$(".details-drawer"),
    "Nhấn tên sản phẩm phải mở chi tiết",
  );
  await page.click(".drawer-head button");
  assert.equal(
    await page.$(".details-drawer"),
    null,
    "Đóng chi tiết phải trở lại danh sách",
  );
  assert.deepEqual(pageErrors, []);

  await page.screenshot({
    path: "reports/after/preview-filtered.png",
    fullPage: true,
  });
  console.log(
    `Smoke test OK: 10.000 sản phẩm, ${initial.rowCount} dòng DOM ban đầu; tìm kiếm, lọc, sắp xếp, cuộn và chi tiết hoạt động.`,
  );
} finally {
  await browser.close();
}
