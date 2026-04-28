<script lang="ts">
  import { onMount } from "svelte";

  import Sidebar from "./sidebar/sidebar.svelte";
  import Viewer from "./viewer/viewer.svelte";

  function fadeIn(el: HTMLElement): void {
    el.animate([
      { opacity: 1 },
    ], {
      duration: 500,
      fill: "forwards",
      easing: "ease-out",
    });
  }

  onMount(() => {
    setTimeout(() => {
      fadeIn(document.getElementById("viewer")!);
      fadeIn(document.getElementById("sidebar")!);
    }, 100);
  });
</script>

<Sidebar></Sidebar>
<Viewer></Viewer>
