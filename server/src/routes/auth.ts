import express from "express";

export default (router: express.Router) => {
  router.post("/register");
  router.post("/login");
  router.post("/logout");
};
