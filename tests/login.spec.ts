import { test, expect, Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { config } from '../utils/config';
import { AdminPage } from '../pages/AdminPage';
import { logger } from '../utils/logger';


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
  
    // generate usernameDynamically

    const randomSuffix = Math.floor(Math.random() * 10000);
    const username = `testuser_${randomSuffix}`;

  test('Navigate to Admin Tab and count the Records', async () => {
    // wait to load admin page loaded

    let adminpage: AdminPage;
    adminpage = new AdminPage(sharedPage);
    let noRecordBefore = await adminpage.getNumberRecords();
    console.log("The number of records before add is ", noRecordBefore);


    logger.info(`Generated username: ${username}`);

    await adminpage.addUser(username, "Admin123");


    let noRecordAfter = await adminpage.getNumberRecords();
    console.log("The number of records after add is ", noRecordAfter);


    // asssert 
    logger.info('Assert the number of records increased by 1')
    expect(noRecordAfter,'Expected the number of records after creation is larger than before').toEqual(noRecordBefore + 1);

  });



  
  test('Delete Created user and count the Records After that', async () => {
    // wait to load admin page loaded

    let adminpage: AdminPage;
    adminpage = new AdminPage(sharedPage);
    let noRecordBefore = await adminpage.getNumberRecords();
    console.log("The number of records before Delete  is ", noRecordBefore);


    logger.info(`Generated username: ${username}`);

    await adminpage.deleteUser(username);


    let noRecordAfter = await adminpage.getNumberRecords();
    console.log("The number of records after Delete is ", noRecordAfter);


    // asssert 
    logger.info('Assert the number of records decreased by 1')
    expect(noRecordAfter,'Expected the number of records after deletation is less than before').toEqual(noRecordBefore - 1);

  });

  



  // test.afterAll(async () => {
  //   // Clean up – close context and browser
  //   await context.close();
  //   await browser.close();
  // });


});