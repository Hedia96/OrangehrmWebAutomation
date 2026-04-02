import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../utils/config';
import { AdminPage } from '../pages/AdminPage';


let browser: Browser;
let context: BrowserContext;
let sharedPage: Page;
let loginPage: LoginPage;

// browser fixteure is test scope


// page and context are used in each test scope
test.describe('OrangeHRM Login Tests and Admin Tab Suite', () => {

  test.describe.configure({ mode: 'serial' });


  test.beforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    sharedPage = await context.newPage();

    loginPage = new LoginPage(sharedPage);

    await loginPage.navigate(config.baseUrl);
  });

  test('Successful login with valid credentials', async () => {
    await loginPage.login(config.username, config.password);
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBeTruthy();
    await loginPage.getToTab("Admin");



  });

  test('Navigate to Admin Tab and count the Records', async () => {
    // wait to load admin page loaded

    let adminpage: AdminPage;
    adminpage = new AdminPage(sharedPage);
   let result= await adminpage.getNumberRecords();
console.log("The number of records before add is ", result)

    // 
  });



  // test.afterAll(async () => {
  //   // Clean up – close context and browser
  //   await context.close();
  //   await browser.close();
  // });


});