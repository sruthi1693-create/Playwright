class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = page.getByPlaceholder('you@email.com');
    this.signButton = page.getByRole('button', { name: 'Sign In' });
    this.passwordLabel = page.getByLabel('Password');
    this.signInTitle = page.locator('//h1[text()="Sign in to EventHub"]');
  }

  async openLoginPage() {
    await this.page.goto('/login');
  }
}

export { LoginPage };
export default LoginPage;