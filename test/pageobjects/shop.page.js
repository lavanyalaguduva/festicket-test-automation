import Page from "./page";
import urlConfig from "../data/appUrls.data"

class ShopPage extends Page {
  get addItemButton() {
    return $("[data-cy='quantity-add-button']");
  }

  get basketButton() {
    return $("[data-cy='show-slideout-basket']");
  }

  get ticketCost() {
    return $("#ticket_ticket p");
  }

  get ticketQuantityInBasket() {
    return $('[data-cy="basket-item-quantity"]');
  }

  get ticketTotalCostInBasket() {
    return $$('[data-cy="basket-footer"] h3');
  }

  get checkOutButton() {
    return $('[data-cy="basket-checkout"]');
  }

  open() {
    super.open(urlConfig.ESTEREO_PICNIC_SHOP_URL);
  }

  addTickets(numberOfTickets) {
    browser.waitUntil(() => this.addItemButton.isDisplayed());
    for (let i = 0; i < numberOfTickets; i++) {
      this.addItemButton.waitForClickable();
      this.addItemButton.click();
    }
    const oneTicketCost = this.ticketCost.getText();
    const totalTicketCost = "£" + (parseFloat(oneTicketCost.substr(1)) * numberOfTickets);
    expect(this.basketButton).toHaveTextContaining(totalTicketCost);
  }

  checkTicketsAreAddedToTheBasket(numberOfTickets) {
    const oneTicketCost = this.ticketCost.getText();
    const totalTicketCost = "£" + (parseFloat(oneTicketCost.substr(1)) * numberOfTickets);
    expect(this.basketButton).toHaveTextContaining(totalTicketCost);

    this.basketButton.click();
    browser.waitUntil(() => this.checkOutButton.isClickable());
    expect(this.ticketQuantityInBasket).toHaveTextContaining(numberOfTickets.toString());
    expect(this.ticketTotalCostInBasket[1]).toHaveTextContaining(totalTicketCost);
  }
}
export default new ShopPage();
