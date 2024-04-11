// Importing the createApp function from the Vue library. This function is used to create a new Vue application instance.
import { createApp } from "vue";
// Importing the root component of the Vue application. This component wraps all other components in the application.
import App from "./App.vue";
// Importing the router instance configured in another file. This router manages navigation between different views in the application.
import router from "./router";

// Creating a new Vue application instance by calling createApp and passing the root component (App.vue) as an argument.
const app = createApp(App);

// Telling the Vue application to use the Vue Router for handling routes. This integrates the router with the Vue application.
app.use(router);

// Mounting the Vue application to the DOM. The application will attach itself to the element with the ID of "app".
// This is where the Vue app becomes active and takes control of the part of the page.
app.mount("#app");
