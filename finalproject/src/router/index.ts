// Importing functions from the vue-router package. `createRouter` is used to instantiate the router,
// `createWebHistory` for using HTML5 History mode.
import { createRouter, createWebHistory } from "vue-router";

// Importing Vue components that will be used as page components for different routes.
import CharactersPage from "@/views/CharactersPage.vue"; // Importing the CharactersPage component from the views directory.
import CharacterDetailPage from "@/views/CharacterDetailPage.vue"; // Ensure this component exists in your project.
import HomePage from "@/views/HomePage.vue"; // Importing the HomePage component.

// Defining the routes for the application. Each route is an object in the array.
const routes = [
  {
    path: "/", // The URL path for the HomePage. This is the root path.
    name: "Home", // A unique name for the route, used for referencing this route in other parts of the app.
    component: HomePage // The Vue component that should be rendered when this route is matched.
  },
  {
    path: "/Characters", // The URL path for the CharactersPage.
    name: "Characters", // A unique name for the Characters route.
    component: CharactersPage // The Vue component to render for this route.
  },
  {
    // A route with a dynamic segment `:id` which allows this route to match any path like `/character/1`, `/character/2`, etc.
    path: "/character/:id",
    name: "CharacterDetail", // A unique name for the CharacterDetail route.
    component: CharacterDetailPage // The Vue component to render for this route.
  }
];

// Creating the router instance by calling `createRouter` with a configuration object.
// This configuration includes the history mode to use and the routes definition.
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // Using HTML5 History mode with the base URL taken from the project's environment variables.
  routes // The routes definition.
});

// Exporting the router instance so it can be imported and used in the main app file.
export default router;
