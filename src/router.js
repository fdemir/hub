import { Router } from "@vaadin/router";

export const routes = [
  { path: "/", component: "hub-home-view" },
  { path: "/add", component: "hub-add-view" },
  { path: "/edit/:id", component: "hub-edit-view" },
];

export const router = new Router(document.getElementById("outlet"));
