import { atom } from "recoil";
//It is like useState type 
export const modalState = atom({
  key: "modalState",
  default: false,
});

export const modalTypeState = atom({
  key: "modalTypeState",
  default: "dropIn",
});