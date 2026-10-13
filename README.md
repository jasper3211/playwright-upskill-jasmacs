# Playwright Upskill — SauceDemo E2E Suite

End-to-end UI tests for [SauceDemo](https://www.saucedemo.com), a public demo store, written with
[Playwright](https://playwright.dev/). Built to practise the patterns I use in production QA work:
page objects, a shared login state, cross-browser runs and CI.

## What's covered

| Area | Scenarios |
| --- | --- |
| **Login** | Login page UI elements are visible · empty fields show the required error · invalid credentials are rejected · valid credentials log in |
| **Cart** | Add one item · go back to shopping from the cart · add a second item · add two items · remove items from the cart |
| **Checkout** | Fill in the checkout information form |
| **Date picker** | Fill today's date into a date input |

## How it's built

- **Page Object Model** — `pages/InventoryPage.js` and `pages/CartPage.js` hold the selectors and
  actions, so specs read as user steps and a UI change is fixed in one place.
- **Log in once, reuse everywhere** — `setup/login.setup.js` runs as Playwright's `globalSetup`,
  logs in a single time and saves the session to `storageState`, so cart and checkout tests start
  already signed in instead of repeating the login flow.
- **Cross-browser** — every test runs in Chromium, Firefox and WebKit (3 parallel workers).
- **CI** — `.github/workflows/playwright.yml` runs the suite on every push and pull request to
  `master` and uploads the HTML report as a build artifact.

```
pages/                 page objects (InventoryPage, CartPage)
playwright_upskill/    specs, grouped by feature: login/ inventory/ calendar/
setup/                 global login setup + saved login state
playwright.config.js   base URL, storage state, browser projects
```

## Run it

Requires Node.js 18+.

```bash
git clone https://github.com/jasper3211/playwright-upskill-jasmacs.git
cd playwright-upskill-jasmacs
npm install
npx playwright install        # downloads the browsers
npx playwright test           # all browsers
npx playwright test --project=chromium   # one browser
npx playwright show-report    # open the HTML report
```

The login tests read `PLAY_USERNAME` and `PLAY_PASSWORD` from the environment. Locally, put them
in a `.env` file (git-ignored):

```bash
PLAY_USERNAME=standard_user
PLAY_PASSWORD=secret_sauce
```

In CI they come from GitHub Actions secrets. The values are SauceDemo's public demo account,
published on the site's login page, so no private credentials are involved.

## Author

**Ryan Jasper Macapobre**, Software QA Engineer.
[LinkedIn](https://www.linkedin.com/in/ryanjaspermacs/)
