import { test , expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import EventsDashBoard from '../pages/EventsDashBoard';
import EventsTab from '../pages/EventsTab';



test.only('Tech summit booking', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const eventsDashBoard = new EventsDashBoard(page);
  const eventsTab = new EventsTab(page);
  await loginPage.openLoginPage();
  await loginPage.emailInput.fill("sruthi1693@gmail.com");
  await loginPage.passwordLabel.fill("Babbi@1993");
  await loginPage.signButton.click();
  
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/");
  await expect(eventsDashBoard.title).toBeVisible();
  await eventsDashBoard.browserEvents.click();

  await expect(eventsTab.upcomingeventsTitle).toBeVisible();
  await expect(eventsTab.page.url()).toContain('/events');
  await eventsTab.keywordSearch.fill("world");
   await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
  await eventsTab.categorySearch.selectOption("🎙 Conference");
   await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
  await eventsTab.citiesSearch.selectOption("Hyderabad");
  await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
  const count = await eventsTab.eventsCard.count();
  await expect(count).toBeGreaterThanOrEqual(1);
  const eventName =  "World Tech Summit";
  const worldTechSummitCard = eventsTab.eventsCard.filter({ hasText: eventName });
  await expect(worldTechSummitCard.locator('h3')).toHaveText(eventName);
  const price = await worldTechSummitCard.locator('p').textContent();
  await expect(worldTechSummitCard.locator('p')).toContainText("$");
  const numofseats = await worldTechSummitCard.locator('span:below(p)').textContent();
  const seats = numofseats?.split(" ")[0];
  await expect(parseInt(seats)).toBeGreaterThan(0);
  await worldTechSummitCard.locator('#book-now-btn').click();
  await expect(eventsTab.worldTechSummitDetailPageTitle).toBeVisible();
  await expect(eventsTab.page.url()).toContain('/events/');
  await expect(eventsTab.PageTitle).toHaveText(eventName);
  await expect(eventsTab.price).toHaveText(price);
  await eventsTab.page.goBack();
  await expect(eventsTab.upcomingeventsTitle).toBeVisible();
  await eventsTab.clearfilter.click();
 
  const count1 = await eventsTab.eventsCard.count();
  await expect(count1).toBeGreaterThanOrEqual(3);
  for (let i = 0; i < count1; i++) {
    await expect(eventsTab.eventsCard.nth(i).locator('h3')).not.toBeEmpty();
  }
  const titlefirst = await eventsTab.eventsCard.nth(0).locator('h3').textContent();
  const titlelast = await eventsTab.eventsCard.nth(count1-1).locator('h3').textContent();
  await expect(titlefirst).not.toEqual(titlelast);  

});