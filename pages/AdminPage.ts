import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AdminPage extends BasePage {
  private records = "//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']/span";

  constructor(page: Page) {
    super(page);
  }

  async getNumberRecords(): Promise<string> {
    await this.waitForElement(this.records);
    let actualRecord = await this.page.locator(this.records).textContent(); 
    // console.log(actualRecord);
    const match= actualRecord?.match(/\d+/);
    return match ? match[0]: 0 || '';
  }
}