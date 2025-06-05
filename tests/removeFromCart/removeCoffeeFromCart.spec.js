import { test } from '../_fixtures/fixtures';
import { COFFEE_NAMES, COFFEE_PRICES } from '../../src/constants';
import {
  //unitPriceFormatStr,
  priceFormatStr,
} from '../../src/common/priceFormatters';

let testParameters = [];

for (const [key, value] of Object.entries(COFFEE_NAMES)) {
  testParameters.push({ coffee: value, price: COFFEE_PRICES[key] });
}

testParameters.forEach(({ coffee, price }) => {
  test(`Check ${coffee} removed from Cart`, async ({ menuPage, cartPage }) => {
    await menuPage.open();
    await menuPage.clickCoffeeCup(coffee);

    await menuPage.clickCartLink();
    await cartPage.waitForLoading();

    await cartPage.clickOnremoveCoffeeButton(coffee);

    const formattedCost = priceFormatStr(price);
    await cartPage.assrtCoffeeItemIsHidden(formattedCost);
  });
});
