class EventsTab {
  constructor(page) {
    this.page = page;
    this.upcomingeventsTitle = page.getByRole('heading', { name: 'Upcoming Events' });
    this.keywordSearch = page.getByPlaceholder('Search events, venues…');
    this.categorySearch = page.locator('select').first();
    this.citiesSearch = page.locator('select').last();
    this.eventsCard = page.getByTestId('event-card');
  }
}

export { EventsTab };
export default EventsTab;