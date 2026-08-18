class EventsTab {
  constructor(page) {
    this.page = page;
    this.upcomingeventsTitle = page.getByRole('heading', { name: 'Upcoming Events' });
    this.keywordSearch = page.getByPlaceholder('Search events, venues…');
    this.categorySearch = page.locator('select').first();
    this.citiesSearch = page.locator('select').last();
    this.eventsCard = page.getByTestId('event-card');
    this.worldTechSummitDetailPageTitle = page.getByRole('heading', { name: 'World Tech Summit' });
    this.dilliDiwaliMelaDetailPageTitle = page.getByRole('heading', { name: 'Dilli Diwali Mela' });
    this.PageTitle = page.locator('div h1');
    this.price = page.locator('xpath=//p[text()="Price per ticket"]/following-sibling::p');
    this.eventsTab = page.getByTestId('nav-events');
    this.clearfilter = page.getByRole('button', { name: 'Clear filters' });
    this.ticketcount = page.locator('#ticket-count');
    this.minusTicketcount = page.getByRole('button',{name: '-'});
    this.plusTicketcount = page.getByRole('button',{name: '+'});
    this.fullName = page.getByPlaceholder('Your full name');
    this.emailName = page.getByLabel('Email');
    this.PhoneNUmber = page.locator('#phone');
    this.confirmbooking = page.getByRole('button',{name: 'Confirm Booking'})
    this.bookingref = page.locator('//span[contains(text(), "Booking Ref")]/following-sibling::span');
    this.customerName = page.locator('span:has-text("Customer")+span');
    this.numOfTickets = page.locator('span:has-text("Tickets")+span');
    this.total = page.locator('span:has-text("Total")+span');
    this.viewMyBookings = page.getByRole('button', { name: 'View My Bookings' });
  }

  async ticketCount(count){
    const defaultcount =  parseInt(await this.ticketcount.textContent());
    if(defaultcount !=count){
      if(defaultcount>count){
        let diff = defaultcount-count;
        while(diff){
          await this.minusTicketcount.click();
          diff--;
        }
      }
      else{
        let diff = count-defaultcount;
        while(diff){
          await this.plusTicketcount.click();
          diff--;
        }
      }
    }

  }
async bookEvent(count,name,Email,PhoneNum){
    await this.ticketCount(count);
    await this.fullName.fill(name);
    await this.emailName.fill(Email);
    await this.PhoneNUmber.fill(PhoneNum);
    await this.confirmbooking.click();
    await this.bookingref.waitFor({ state: 'visible', timeout: 10000 }); 
    let bookingHistory = [await this.PageTitle.textContent()];
    bookingHistory.push(await this.bookingref.textContent());
    bookingHistory.push(await this.customerName.textContent());
    bookingHistory.push(await this.numOfTickets.textContent());
    bookingHistory.push(await this.total.textContent());
    return bookingHistory;
}

}

export { EventsTab };
export default EventsTab;