import { test, expect } from '@playwright/test';

test('Пользователь может найти игру и добавить в вишлист', async ({ page }) => {

    await page.goto('/');


    const firstCard = page.locator('.game-card').first();
    await expect(firstCard).toBeVisible({ timeout: 15000 });


    const gameName = await firstCard.locator('.game-title').innerText();


    await firstCard.locator('.pixel-btn').click();


    await page.locator('.burger-btn').click();


    await page.getByRole('link', { name: /Вишлист/ }).click();


    await expect(page).toHaveURL(/.*wishlist/);


    const wishlistItem = page.locator('.game-card').filter({ hasText: gameName });
    await expect(wishlistItem).toBeVisible();
});