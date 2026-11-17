import React, { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import Statistics from "./Statistics";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
// @ts-ignore
import "../../../css/home.css";
import { Product } from "../../../lib/types/products";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import ProductService from "../../service/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../service/MeberService";
import { Member } from "../../../lib/types/member";
// REDUX SLICE $ SLECTOR
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  //Selector:Store=>Data
  useEffect(() => {
    const product = new ProductService();
    const member = new MemberService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => {
        console.error(err);
      });
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
      })
      .then((data) => setNewDishes(data))
      .catch((err) => console.error(err));
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="homepage">
      <Statistics />
      <PopularDishes />
      <NewDishes />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
