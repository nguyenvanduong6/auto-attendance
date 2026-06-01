import { test, expect, BrowserContext, Page } from '@playwright/test';

const user_name = process.env.USER_NAME;
const user_password = process.env.USER_PASSWORD;

function evaluateExpression(input: string): number | null {
  const match = input.match(/(-?\d+)\s*([+\-*/])\s*(-?\d+)/);
  if (!match) return null;

  const [, left, operator, right] = match;
  const a = Number(left);
  const b = Number(right);

  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      return b !== 0 ? a / b : NaN;
    default:
      return null;
  }
}

test('TC001 - Verify login successfully', async ({ page }) => {
  await page.goto('/dang-nhap');
  if (!user_name || !user_password) {
    throw new Error('USER_NAME and USER_PASSWORD environment variables must be set');
  }
  await page.getByPlaceholder('Nhập tên đăng nhập').fill(user_name);
  await page.getByPlaceholder('Nhập mật khẩu (6 số)').fill(user_password);
  const text = await page.locator('#captchaQuestion').textContent();
  const result = String(evaluateExpression(text || ''));
  if (result === '') {
    throw new Error(`evaluateExpression returned empty string. Input: "${text}"`);
  }
  await page.getByPlaceholder('?').fill(result);
  await page.getByRole('button', { name: 'Đăng nhập' }).click();
  await page.waitForURL('**/trang-chu');

  await page.goto('/diem-danh');
  const attendButton = page.getByRole('button', { name: ' ĐIỂM DANH NGAY' });
  if (await attendButton.isVisible()) {
    await attendButton.click();
    await expect(page.getByText('điểm danh thành công')).toBeVisible();
  } else {
    throw new Error('Attend button not found');
  }
});
