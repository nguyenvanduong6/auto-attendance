**Commands:**
1. Runs the end-to-end tests with example env.
`npm run test-run`

2. See the browser UI during test execution.
`npm run test-head`

3. Open last HTML report
`npm run report`

4. Check eslint for .ts,.tsx files
`npm run lint`

5. Rewrite the format of files with prettier
`npm run format`

6. Generate authentication states for user and admin roles
`npm run generate-auth`

**Features:**

Use as a boilerplate

**Authentication Fixtures:**

This project uses Playwright fixtures with role-based authentication. The fixture system supports three roles:

- **guest**: No authentication (default)
- **user**: Authenticated as regular user
- **admin**: Authenticated as admin

**Usage:**

```typescript
import { test, expect } from '../helper/fixtures';

// Default: guest role (no authentication)
test('Guest can view login page', async ({ loginPage }) => {
  await loginPage.goTo();
  await loginPage.isDisplayLoginPage();
});

// Use 'user' role
test('User can access home page', async ({ homePage }) => {
  test.use({ role: 'user' });
  await homePage.goTo();
  await homePage.isLoggedIn();
});

// Use 'admin' role
test('Admin can access admin panel', async ({ authenticatedPage }) => {
  test.use({ role: 'admin' });
  await authenticatedPage.goto('/admin');
});
```

**Available Fixtures:**

- `authenticatedContext`: BrowserContext with appropriate auth state
- `authenticatedPage`: Page from authenticated context
- `loginPage`: LoginPage instance using authenticated page
- `homePage`: HomePage instance using authenticated page
- `role`: Current user role ('guest' | 'user' | 'admin')

**Environment Variables:**

Make sure your `.env.{env}` file includes:
- `BASE_URL`: Base URL of the application
- `USER_EMAIL`: Email for user role
- `USER_PASSWORD`: Password for user role
- `ADMIN_EMAIL`: Email for admin role (optional, defaults to USER_EMAIL)
- `ADMIN_PASSWORD`: Password for admin role (optional, defaults to USER_PASSWORD)

**Allure report:**

1. Install.
`brew install allure`
2. Setting up.
`npm install --save-dev @playwright/test allure-playwright`
3. In the playwright.config.ts file, add Allure Playwright as a reporter.
`reporter: [["line"], ["allure-playwright"]],`
4. Run tests
5. Generate a report
`allure serve allure-results`
