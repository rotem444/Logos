import React, { useContext } from "react";
import { Context } from "../App";
import { logOut } from "../store/action";

export default function LogOut() {
  const { httpDispatch } = useContext(Context);
  localStorage.removeItem("token");
  httpDispatch(logOut());
  return <div>LogOut</div>;
}
