import Page from "./page";
import urlConfig from "../data/appUrls.data"

class FestivalPage extends Page {
  get bookNowLink() {
    return $("//span[text()='Book Now']");
  }

  open() {
    super.open(urlConfig.PARADIGM_FESTIVAL_URL);
  }

  checkFestivalCanBeBooked() {
    expect(this.bookNowLink).toBeDisplayed();
    this.bookNowLink.click();
    browser.waitUntil(
      () => browser.getUrl().includes("shop")
    );
    expect(browser).toHaveUrlContaining("shop/");
  }
}
export default new FestivalPage();
