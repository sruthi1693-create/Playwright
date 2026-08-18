import { test , expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import EventsDashBoard from '../pages/EventsDashBoard';
import EventsTab from '../pages/EventsTab';
import MyBookingTab from '../pages/MyBookingTab';


test('Tech summit booking', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const eventsDashBoard = new EventsDashBoard(page);
  const eventsTab = new EventsTab(page);
  const myBookingTab = new MyBookingTab(page);
  await loginPage.login("sruthi1693@gmail.com", "Babbi@1993");
  
  await expect(page).toHaveURL("https://eventhub.rahulshettyacademy.com/");
  await expect(eventsDashBoard.title).toBeVisible();
  await eventsDashBoard.browserEvents.click();

  await expect(eventsTab.upcomingeventsTitle).toBeVisible();
  await expect(eventsTab.page.url()).toContain('/events');
  await filterEvents(eventsTab, "world", "🎙 Conference", "Hyderabad");
  const eventName =  "World Tech Summit";
  const worldTechSummitCard = eventsTab.eventsCard.filter({ hasText: eventName });
  await worldTechSummitCard.locator('#book-now-btn').click();
  await expect(eventsTab.worldTechSummitDetailPageTitle).toBeVisible();
  await expect(eventsTab.page.url()).toContain('/events/');
  const bookingDetails = await eventsTab.bookEvent(1,"Sruthi Cheekoti","Sruthi1693@gmail.com","8506333323");
  await expect(bookingDetails).toContain(eventName);
  await expect(bookingDetails[1].length).toBeGreaterThan(1);
  await expect(bookingDetails).toContain("1");
  await eventsTab.page.goBack();
  await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
  await eventsTab.clearfilter.click();
  await filterEvents(eventsTab, "Dilli", "🎉 Festival", "Delhi");
  const DilliDiwaliMelaCard = eventsTab.eventsCard.nth(0);
  await DilliDiwaliMelaCard.locator('#book-now-btn').click();
  await expect(eventsTab.dilliDiwaliMelaDetailPageTitle).toBeVisible();
  await expect(eventsTab.page.url()).toContain('/events/');
  const bookingDetailsDiili = await eventsTab.bookEvent(2,"Sathwik","Sathwik1993@gmail.com","9035839643");
  await expect(bookingDetailsDiili).not.toContain(eventName);
  await expect(bookingDetailsDiili).toContain("2");
  await eventsTab.viewMyBookings.click();
  const bookingRefs = await myBookingTab.bookingcard.locator('//span[contains(@class,"booking-ref")]').allTextContents();
  await expect(bookingRefs).toContain(bookingDetailsDiili[1]);
  await expect(bookingRefs).toContain(bookingDetails[1]);
  await expect(myBookingTab.bookingcard.nth(0).filter({ hasText: 'Confirmed' })).toBeVisible();
  await expect(myBookingTab.bookingcard.nth(1).filter({ hasText: 'Confirmed' })).toBeVisible();
  await verifyBooking(myBookingTab, page, bookingDetails, eventName, "sruthi1693@gmail.com");
  await myBookingTab.page.goBack();
  const detailref = await verifyBooking(myBookingTab, page, bookingDetailsDiili, "Dilli Diwali Mela", "sathwik1993@gmail.com");
  await expect(detailref).not.toContain(bookingDetails[1]);

});

async function filterEvents(eventsTab, keyword, category, city) {
  await eventsTab.keywordSearch.fill(keyword);
  await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
  await eventsTab.categorySearch.selectOption(category);
  await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
  await eventsTab.citiesSearch.selectOption(city);
  await expect(eventsTab.eventsCard.nth(0)).toBeVisible();
}

async function verifyBooking(myBookingTab, page, bookingDetails, eventName, Email) {
  const card = await myBookingTab.bookingcard.locator('div').filter({ has: page.getByRole('heading', { name: eventName }) });
  await expect(await card.locator('//h3/following-sibling::div/span[2]')).toContainText(bookingDetails[3]);
  await expect(await card.locator('p:above(p:has-text("total"))')).toContainText(bookingDetails[4]);
  const bookingID = await card.locator('//span[@id = "booking-id"]').textContent();
  await card.locator('xpath=./following-sibling::div//button[contains(text(),"View Details")]').click();
  await expect(myBookingTab.bookingRef).toHaveText(bookingDetails[1]);
  await expect(myBookingTab.eventName).toHaveText(eventName);
  await expect(myBookingTab.customerEmail).toHaveText(Email);
  await expect(myBookingTab.tickets).toHaveText(bookingDetails[3]);
  await expect(myBookingTab.total).toHaveText(bookingDetails[4]);
  await expect(myBookingTab.bookingID).toHaveText(bookingID);
  return myBookingTab.bookingRef.textContent();
}