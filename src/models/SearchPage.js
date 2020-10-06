class SearchPage {

    constructor(page) {
        this.page = page;
    }

    async goto() {

        // go to the home page
        await this.page.goto('https://www.google.ch/', { waitUntil: 'networkidle' });
    }

    async search(text) {

        // Fill the form
        await this.page.fill('input[name=q]', text);

        // Submit the form
        await this.page.keyboard.press('Enter');

        // Wait the browser load the new page
        await this.page.waitForNavigation({ waitUntil: 'networkidle' });
    }
}

module.exports = { SearchPage };