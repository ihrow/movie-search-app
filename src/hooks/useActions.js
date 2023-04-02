import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import actionCreators from "../store/action-creators";

export const useActions = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};