import { test, expect } from '@playwright/test'

// Real Java compilation/execution via CheerpJ (ADR 0003) - a WASM JVM loaded
// from a third-party CDN into a Web Worker, which jsdom cannot fake. The first
// run pays CheerpJ's cold-start cost (runtime download + init), so this test
// is intentionally slower than the rest of the suite - see docs/testing/OVERVIEW.md.
test('compiles and runs real Java code, reporting real pass/fail results', async ({
  page,
}) => {
  test.setTimeout(150_000)

  await page.goto('/learn/java-fundamentals/your-first-java-program')

  const runButton = page.getByRole('button', { name: 'Run' })
  const editor = page.getByRole('textbox', { name: 'Exercise code editor' })

  // Starter code prints "Hello, world!" but the exercise expects "Hello, ILoveJava!" -
  // a real compile + run against the unmodified starter should genuinely fail.
  await runButton.click()
  await expect(page.getByText('Some test cases failed')).toBeVisible({
    timeout: 90_000,
  })

  // Fix the one word the exercise asks for and re-run - the worker stays warm,
  // so this run only needs to cover compile + execute, not CheerpJ init again.
  await editor.getByText('world', { exact: true }).dblclick()
  await page.keyboard.type('ILoveJava')
  await runButton.click()
  await expect(page.getByText('All test cases passed')).toBeVisible({ timeout: 30_000 })
})
