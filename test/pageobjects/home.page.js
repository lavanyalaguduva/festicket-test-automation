import Page from "./page";
import config from "../config/wdio.shared.conf";
import urlConfig from "../data/appUrls.data";

class HomePage extends Page {
  get searchBar() {
    return $("[data-cy='navbar-search-input']");
  }
  get searchResultsList() {
    return $$('[data-cy="header-search"] + * a');
  }

  open() {
    super.open("/");
  }
  searchForAFestivalUsingTag(festivalNameTag) {
    this.searchBar.click();
    this.searchBar.keys(festivalNameTag);
  }
  
  checkSearchBarListsOnlyRelatedFestivals(festivalNameTag) {
    browser.waitUntil(() => this.searchResultsList[0].isExisting());
    var results = this.searchResultsList;
    results.forEach((result) => {
      expect(result).toHaveTextContaining(festivalNameTag, {
        ignoreCase: true,
      });
    });
  }

  selectTheFestivalToBook(festivalName) {
    browser.waitUntil(() => this.searchResultsList[0].isExisting());
    var results = this.searchResultsList;
    for (let index = 0; index < results.length; index++) {
      if (results[index].getText().includes(festivalName)) {
        results[index].click();
        break;
      }
    }
  }

  checkTheSelectedFestivalPageIsdisplayed() {
    browser.waitUntil(() => browser.getUrl() != config.baseUrl);
    expect(browser).toHaveUrlContaining(urlConfig.ESTEREO_FESTIVAL_URL);
  }
}
export default new HomePage();
