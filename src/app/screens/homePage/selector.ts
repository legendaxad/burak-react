import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";
const selectHomepage = (state: AppRootState) => state.homePage;
export const retrievePopularDishes = createSelector(
  selectHomepage,
  (HomePage) => HomePage.popularDishes,
);
export const retrieveNewDishes = createSelector(
  selectHomepage,
  (HomePage) => HomePage.newDishes,
);
export const retrieveTopUsers = createSelector(
  selectHomepage,
  (HomePage) => HomePage.topUsers,
);
