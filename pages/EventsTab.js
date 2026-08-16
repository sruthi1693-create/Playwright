class EventsTab {
  constructor(page) {
    this.page = page;
    this.upcomingeventsTitle = page.getByRole('heading', { name: 'Upcoming Events' });
    this.keywordSearch = page.getByPlaceholder('Search events, venues…');
    this.categorySearch = page.locator('select').first();
    this.citiesSearch = page.locator('select').last();
    this.eventsCard = page.getByTestId('event-card');
    this.worldTechSummitDetailPageTitle = page.getByRole('heading', { name: 'World Tech Summit' });
    this.PageTitle = page.locator('div h1');
    this.price = page.locator('xpath=//p[text()="Price per ticket"]/following-sibling::p');
    this.eventsTab = page.getByTestId('nav-events');
    this.clearfilter = page.getByRole('button', { name: 'Clear filters' });
  }
}

export { EventsTab };
export default EventsTab;