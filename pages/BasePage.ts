import { Page } from '@playwright/test';
import { logger } from '../utils/logger';
export class BasePage {
  protected page:Page
  constructor( page: Page) {this.page=page;}

  async navigate(url: string) {
    logger.info("Navigate to URL" ,url);

    await this.page.goto(url);
  }

  async waitForElement(selector: string, timeout = 80000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async getText(selector: string): Promise<string> {
    return (await this.page.textContent(selector)) || '';
  }
  //
}