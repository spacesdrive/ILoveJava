import { test, expect } from '@playwright/test'

test('home page renders and is navigable', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'ILoveJava' })).toBeVisible()
})

test('unknown route shows 404 with a way back home', async ({ page }) => {
  await page.goto('/this-route-does-not-exist')
  await expect(page.getByRole('heading', { name: '404' })).toBeVisible()
  await page.getByRole('link', { name: 'Back home' }).click()
  await expect(page).toHaveURL('/')
})
