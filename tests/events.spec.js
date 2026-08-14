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
  await expect(eventsDashBoard.page.url()).toContain('/events');
  

  await eventsTab.keywordSearch.fill("world");
  await eventsTab.categorySearch.selectOption("🎙 Conference");
  await eventsTab.citiesSearch.selectOption("Hyderabad");
  await expect(eventsTab.eventsCard).toBeVisible();
  const count = await eventsTab.eventsCard.count();
  console.log("Number of events available: %s", count);
  await expect(count).toBeGreaterThanOrEqual(1);
  const worldTechSummitCard = eventsTab.eventsCard.filter({ hasText: "World Tech Summit" });
  await expect(worldTechSummitCard.locator('h3')).toHaveText("World Tech Summit");
  await expect(worldTechSummitCard.locator('p')).toContainText("$");
  const numofseats = await worldTechSummitCard.locator('p:below(div)').textContent();
  console.log("Number of seats available: %s", numofseats);
});