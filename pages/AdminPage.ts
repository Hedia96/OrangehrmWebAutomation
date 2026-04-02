import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { assert } from 'node:console';
import { logger } from '../utils/logger';

export class AdminPage extends BasePage {
    private records = "//div[@class='orangehrm-horizontal-padding orangehrm-vertical-padding']/span";
    private adddBtn = "//div[@class='orangehrm-header-container']/button";

    private employFld = "input[placeholder='Type for hints...']"
    private employeeNameDDL = ".oxd-autocomplete-dropdown .oxd-autocomplete-option";
    //oxd-select-text oxd-select-text--active
    private userRoleDDL = "//label[text()='User Role']/../..//div[@class='oxd-select-text-input']";
    private userRoleValue = ".oxd-select-option:nth-child(2)";
    private statusDDL = "//label[text()='Status']/../..//div[@class='oxd-select-text-input']";

    private statusValue = ".oxd-select-option:nth-child(2)";
    private usernameFld = "(//label[text()='Username']/../../div)[2]/input";


    private PswdFld = "(//label[text()='Password']/../../div)[2]/input";
    private confirmPswdFld = "(//label[text()='Confirm Password']/../../div)[2]/input";


    private saveBtn = "//button[normalize-space(.)='Save']";
    /*
    </div>
    <div data-v-3ebc98ba data-v-390abb6d
    role="listbox" class="oxd-autocomple
    te-dropdown -- positon-bottom"> ...
    </div>*/

    constructor(page: Page) {
        super(page);
    }

    async getNumberRecords(): Promise<number> {
        await this.waitForElement(this.records);
        let actualRecord = await this.page.locator(this.records).textContent();
        // console.log(actualRecord);
        const match = actualRecord?.match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    }

    // Adding user

    async addUser(username: string, pswd: string) {

        await this.waitForElement(this.adddBtn);

        await this.click(this.adddBtn);
        await this.waitForElement(this.employFld);
        await this.click(this.employFld);
        await this.page.fill(this.employFld, 'a');
        await this.waitForElement(this.employeeNameDDL);
        //get the list of all elelemtns
        const suggestednames: Locator[] = await this.page.locator(this.employeeNameDDL).all();
        //  await this.page.pause(); //Playwright Inspector opens, page freezes



        // choose suggested name
        const suggestednames_size = suggestednames.length;
        console.log(`Number of suggested Names : ${suggestednames_size}`);
        // suggestednames.forEach(name => console.log(name));
        const textsuggestedname = await suggestednames[0].locator('span').textContent();
        console.log("Employee name is ", textsuggestedname);
        await suggestednames[0].click();

        // choose userrole 

        await this.click(this.userRoleDDL);
        await this.click(this.userRoleValue);

        // choose status

        await this.click(this.statusDDL);
        await this.click(this.statusValue);

        // enter name
        await this.fill(this.usernameFld, username);
        // enter pasword

        await this.fill(this.PswdFld, pswd);
        await this.fill(this.confirmPswdFld, pswd);

        await this.click(this.saveBtn);
        await this.page.waitForURL('https://opensource-demo.orangehrmlive.com/web/index.php/admin/viewSystemUsers');

        // // get number after adding  
        // let noRecordAfter = await this.getNumberRecords();
        // logger.info(`The number of records After is  ${noRecordAfter}`);



    }
    /*
      async getErrorMessage(): Promise<string> {
      const errorSelector = '.alert.alert-error';
      await this.waitForElement(errorSelector);
      return this.getText(errorSelector);
    }
      */



}