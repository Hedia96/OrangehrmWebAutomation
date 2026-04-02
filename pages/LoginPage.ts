import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  // Locators
  private usernameInput = '//*[@name=\'username\']';
  private passwordInput = '//*[@name=\'password\']';
  private loginButton = '//*[@type=\'submit\']';
  private dashboardHeader = '//span[text()="Dashboard"]/parent::a';
  private genericTab = "//a[@class='oxd-main-menu-item']//span[text()='Admin']/..";
  constructor(page: Page) {
    super(page);
  }

  async login(username: string, password: string) {
    await this.fill(this.usernameInput, username);
    await this.fill(this.passwordInput, password);
    await this.click(this.loginButton);
  }

  async isDashboardVisible(): Promise<boolean> {
    await this.waitForElement(this.dashboardHeader);
    return this.page.isVisible(this.dashboardHeader);
  }

  async getToTab(nametab: string) {
    // var adminTab = this.genericTab.replace('/@replace/gi', 'Admin');
    // console.log(adminTab);

    await this.click(this.genericTab);
    await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

    

  }

  async getErrorMessage(): Promise<string> {
    const errorSelector = '.alert.alert-error';
    await this.waitForElement(errorSelector);
    return this.getText(errorSelector);
  }
}