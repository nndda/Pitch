import { mount } from "svelte"
import "./app.scss"
import App from "./app.svelte"

export default mount(App, {
  target: document.body,
});
