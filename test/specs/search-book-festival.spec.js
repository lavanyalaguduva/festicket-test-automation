import homePage from "../pageobjects/home.page";
import festivalPage from "../pageobjects/festival.page";
import shopPage from "../pageobjects/shop.page"

import searchData from "../data/search.data"
import bookTicketsData from "../data/bookTickets.data"

describe("Performing a search operation on Festicket home page using the search bar", function () {

  let festivalNameTag = searchData.PARADIGM_FESTIVAL_NAME_TAG_TO_SEARCH;
  let festivalName = searchData.PARADIGM_FESTIVAL_NAME;
  let numberOfTickets = bookTicketsData.NUMBER_OF_TICKETS;
  
  it("Search for a festival", function () {
    homePage.open();
    homePage.searchForAFestivalUsingTag(festivalNameTag);
    homePage.checkSearchBarListsOnlyRelatedFestivals(festivalNameTag);
  });

  it("View festival details", function () {
    homePage.open();
    homePage.searchForAFestivalUsingTag(festivalNameTag);
    homePage.selectTheFestivalToBook(festivalName);
    homePage.checkTheSelectedFestivalPageIsdisplayed();
  });

  it("See whether a festival is bookable", function () {
    festivalPage.open();
    festivalPage.checkFestivalCanBeBooked();
  });

  it("Book tickets for a festival", function () {
    shopPage.open();
    shopPage.addTickets(numberOfTickets);
    shopPage.checkTicketsAreAddedToTheBasket(numberOfTickets);
  });
});
