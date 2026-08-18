class MyBookingTab {
  constructor(page) {
    this.page = page;
    this.bookingcard = page.getByTestId('booking-card');
    this.bookingRef= page.locator('//span[text()="confirmed"]/preceding-sibling::span');
    this.eventName = page.locator('//h1');
    this.customerEmail = page.locator('//span[contains(text(),"Email")]/following-sibling::span');
    this.tickets = page.locator('//span[contains(text(),"Tickets")]/following-sibling::span');
    this.total = page.locator('//span[contains(text(),"Total Paid")]/following-sibling::span'); 
    this.bookingID =  page.locator('//span[contains(text(),"Booking ID")]/following-sibling::span'); 
  }

  
}

export { MyBookingTab };
export default MyBookingTab;