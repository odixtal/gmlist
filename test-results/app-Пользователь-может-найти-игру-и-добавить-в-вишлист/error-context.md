# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: app.spec.ts >> Пользователь может найти игру и добавить в вишлист
- Location: e2e/app.spec.ts:3:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: Test timeout of 30000ms exceeded.
Call log:
  - navigating to "http://localhost:5173/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test('Пользователь может найти игру и добавить в вишлист', async ({ page }) => {
> 4  |   await page.goto('/');
     |              ^ Error: page.goto: Test timeout of 30000ms exceeded.
  5  | 
  6  |   // 1. Ждем загрузки карточек
  7  |   const firstCard = page.locator('.game-card').first();
  8  |   await expect(firstCard).toBeVisible({ timeout: 30000 });
  9  | 
  10 |   // 2. Запоминаем название
  11 |   const gameName = await firstCard.locator('.game-title').innerText();
  12 | 
  13 |   // 3. Кликаем "В избранное" принудительно (force: true)
  14 |   // Это скажет Playwright: "Кликни, даже если кнопка заблокирована или меняется"
  15 |   await firstCard.locator('.pixel-btn').click({ force: true });
  16 | 
  17 |   // 4. Открываем меню
  18 |   await page.locator('.burger-btn').click();
  19 |   
  20 |   // 5. Ждем анимацию шторки
  21 |   await page.waitForTimeout(500);
  22 | 
  23 |   // 6. Кликаем на Вишлист (тоже принудительно, на всякий случай)
  24 |   await page.getByRole('link', { name: /Вишлист/ }).click({ force: true });
  25 | 
  26 |   // 7. Проверяем, что перешли на /wishlist
  27 |   await expect(page).toHaveURL(/.*wishlist/, { timeout: 5000 });
  28 |   
  29 |   // 8. Проверяем, что игра отображается в вишлисте
  30 |   const wishlistItem = page.locator('.game-card').filter({ hasText: gameName });
  31 |   await expect(wishlistItem).toBeVisible({ timeout: 5000 });
  32 | });
```