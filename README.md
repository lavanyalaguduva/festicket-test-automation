# Festicket-test-automation

## Scenario
1. Search for a festival via search field and confirm that it appears in the results
2. Search for a festival that is on sale, click on it and proceed to the festivals shop page and confirm that you’re on the correct festival shop page
3. Add an item to the basket and confirm that correct item is added to the basket

## Framework Details

The above scenario has been automated using webdriverio v6 with mocha.

### Code Structure

#### Dependencies
The major dependencies required for this test framework are wdio packages and babel packages. Babel is a JavaScript compiler and  is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in current and older browsers or environments.

All the required dependencies are under package.json. They can be installed using npm.

#### Test code
The code related to test automation are present under *test* folder in the root.

This main folder includes the following sub-folders

*config* - to add wdio config files. This folder now includes a config file to run the tests locally. There is a shared config file which contains the wdio properties common to all the other configs.  This folder can be extended to include config files if the tests need to be run in other platforms like remote grid, browserstack, saucelabs etc.,

*data* - contains all the required test data in one place. This helps data to be shared between multiple specs and also can be maintained easily.

*pageObjects* - contains element locators and methods related to pages that are required for automation. The assertions are done using expect-webdriverio which is available by default with webdriverio v6.

*specs* - contains tests written using mocha framework. 

### Commands
Following command can be used to install all the dependencies

`npm run install`

Please visit test/config/wdio.local.conf.js to add/modify your browser preferences. Following command needs to be used to run the spec files against the specified browsers locally.

`npm run test-local`

To view the unit results in the browser, run

`npm run junit-report`

### Debug
If you wish to debug the test execution using breakpoints, use launch.json to run the tests in VSCode 

### Reports
Following reports are available in this framework
*Spec* - can be viewed in the console when the tests are run
*json* - can be viewed under /test/reports/json-results
*junit* - can be viewed under /test/reports/junit-results

## Improvements

1).keys webdriverio call is not working safari. Need to investigate and use a workaround if it is a known bug in safari driver.

2)Add better reports like video reporter, html reporter introduced in the latest versions of wdio.

3)Use logger for debugging

4)Integrate with cross-browser platform like Browserstack/Saucelabs

5)Integrate with grafana/influxDB to view the live results

## Issues observed

1)Following console warning is displayed when the site is loaded.

```Indicate whether to send a cookie in a cross-site request by specifying its SameSite attribute. Because a cookie's SameSite attribute was not set or is invalid, it defaults to SameSite=Lax, which prevents the cookie from being sent in a cross-site request. This behavior protects user data from accidentally leaking to third parties and cross-site request forgery.
Resolve this issue by updating the attributes of the cookie:


Specify SameSite=None and Secure if the cookie should be sent in cross-site requests. This enables third-party use.
Specify SameSite=Strict or SameSite=Lax if the cookie should not be sent in cross-site requests


AFFECTED RESOURCES
14 cookies
3 requests
Learn more: SameSite cookies explained
```
This seems to be some kind os security related issue. Needs investigation.

2)Once the tickets are booked, the total cost doesn't seem to match the ticket cost. This doesn't happen to all the festivals. Observed only with "paradigm Festival - Melbourne 2020'.

Steps to reproduce:
- Search for 'Paradigm Festival - Melbourne 2020' in the search bar in homepage.
- Select the 'Paradigm Festival - Melbourne 2020' from the search list
- Once the festival page is displayed, click the 'Book Now' button in the page.
- Once you are navigated to the page to buy tickets, increse the ticket quantity to 1.

Expected Results:
The total cost of the ticket dispalyed in the basket button is expected to be same as the ticket cost when 1 ticket is bought.

Actual Results:
The total cost of the ticket dispalyed in the basket button is not same as the ticket cost when 1 ticket is bought.

Screenshot:
The screenshot related to the above issue is present under "issues/Screenshot 2020-09-25 at 00.12.59.png"

3)Book Now button from the 'Paradigm Festival - Melbourne 2020' festival page is not taking to the shop page

Steps to reproduce:
- Go to https://www.festicket.com/festivals/paradigm-festival-melbourne/2020/
- Select the 'Book Now' button

Expected Results:
On clicking 'Book Now' button, you should be navigated to https://www.festicket.com/festivals/paradigm-festival-melbourne/2020/shop/ url

Actual Results:
No action happens on clicking 'Book Now' from the above festival page. No error in the console or in the network tab.

4)Observed the site to be very slow while loading yesterday night. Couldn't collect any logs from network/console tab. But looks like it gets slower when it tries to fetch data from cache. Needs investigation.
