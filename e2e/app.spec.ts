import { test, expect } from '@playwright/test';

test('Пользователь может найти игру и добавить в вишлист', async ({ page }) => {

    await page.goto('/', { waitUntil: 'domcontentloaded' });


    const firstCard = page.locator('.game-card').first();
    await expect(firstCard).toBeVisible({ timeout: 30000 });


    const gameName = await firstCard.locator('.game-title').innerText();


    await firstCard.locator('.pixel-btn').click({ force: true });


    await page.locator('.burger-btn').click();


    await page.waitForTimeout(600);


    await page.getByRole('link', { name: /Вишлист/ }).click({ force: true });


    await expect(page).toHaveURL(/.*wishlist/, { timeout: 10000 });


    const wishlistItem = page.locator('.game-card').filter({ hasText: gameName });
    await expect(wishlistItem).toBeVisible({ timeout: 10000 });
});