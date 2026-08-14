class EventsDashBoard {
  constructor(page) {
    this.page = page;
    this.title = page.getByRole('link', { name: 'EventHub' })
    this.browserEvents = page.locator('//span[contains(text(),"Browse Events")]');
    
  }

  
}

export { EventsDashBoard };
export default EventsDashBoard;