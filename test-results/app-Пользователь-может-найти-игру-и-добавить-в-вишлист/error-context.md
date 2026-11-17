# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Пользователь может найти игру и добавить в вишлист
- Location: e2e/app.spec.ts:3:1

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('.game-card').first()
Expected: visible
Error: element(s) not found

Call log:
  - Expect "toBeVisible" locator('.game-card').first() with timeout 15000ms
  - waiting for locator('.game-card').first()
  - Target crashed

```

```yaml
- banner:
  - heading "gmlist" [level=1]
  - textbox "Поиск игр..."
  - button "☰"
- main:
  - paragraph: Загрузка...
- heading "МЕНЮ" [level=2]
- button "X"
- navigation:
  - link "📁 Все игры":
    - /url: /
  - link "★ Вишлист (0)":
    - /url: /wishlist
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Пользователь может найти игру и добавить в вишлист', async ({ page }) => {
  4  |     // 1. ПЕРЕХВАТЫВАЕМ ЗАПРОС К API И ВОЗВРАЩАЕМ ФЕЙКОВЫЕ ДАННЫЕ
  5  |     // Это делает тест независимым от интернета и скорости RAWG API
  6  |     await page.route('**/api.rawg.io/api/games*', async (route) => {
  7  |         await route.fulfill({
  8  |             status: 200,
  9  |             contentType: 'application/json',
  10 |             body: JSON.stringify({
  11 |                 results: [
  12 |                     {
  13 |                         id: 999,
  14 |                         name: 'Fake Test Game',
  15 |                         background_image: 'https://via.placeholder.com/600x400',
  16 |                         rating: 5,
  17 |                         released: '2024-01-01',
  18 |                     },
  19 |                 ],
  20 |             }),
  21 |         });
  22 |     });
  23 | 
  24 |     // 2. Открываем сайт
  25 |     await page.goto('/', { waitUntil: 'domcontentloaded' });
  26 | 
  27 |     // 3. Ждем появления карточки (она появится сразу, так как ответ локальный)
  28 |     const firstCard = page.locator('.game-card').first();
> 29 |     await expect(firstCard).toBeVisible({ timeout: 15000 });
     |                             ^ Error: expect(locator).toBeVisible() failed
  30 | 
  31 |     // 4. Запоминаем название игры
  32 |     const gameName = await firstCard.locator('.game-title').innerText();
  33 |     expect(gameName).toBe('Fake Test Game'); // Убеждаемся, что загрузилась именно наша игра
  34 | 
  35 |     // 5. Кликаем "В избранное" (принудительно, чтобы не ждать, пока кнопка разблокируется)
  36 |     await firstCard.locator('.pixel-btn').click({ force: true });
  37 | 
  38 |     // 6. Открываем меню
  39 |     await page.locator('.burger-btn').click({ force: true });
  40 | 
  41 |     // 7. Ждем анимацию шторки
  42 |     await page.waitForTimeout(600);
  43 | 
  44 |     // 8. Переходим в Вишлист
  45 |     await page.getByRole('link', { name: /Вишлист/ }).click({ force: true });
  46 | 
  47 |     // 9. Проверяем URL
  48 |     await expect(page).toHaveURL(/.*wishlist/, { timeout: 10000 });
  49 | 
  50 |     // 10. Проверяем, что наша фейковая игра есть на странице
  51 |     const wishlistItem = page.locator('.game-card').filter({ hasText: gameName });
  52 |     await expect(wishlistItem).toBeVisible({ timeout: 10000 });
  53 | });
```