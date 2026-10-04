<script lang="ts">
  const {
    size
  }: {
    size?: string
  } = $props();
</script>

<style lang="scss">
  @use "../styles/variables" as *;

  .wrapper {
    display: flex;
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    place-content: center;
  }

  // CSS spinner by Temani Afif https://css-loaders.com/flipping/
  /* HTML: <div class="loader"></div> */
  .loader {
    width: var(--loader-size);
    height: var(--loader-size);
    border-radius: 9px;
    aspect-ratio: 1;
    animation:
      l3-1 2s infinite linear,
      l3-2 3s infinite steps(1) -.5s;
    place-self: center;
  }
  @keyframes l3-1 {
    0%   {transform: perspective(150px) rotateX(  0deg) rotateY(0deg)}
    50%  {transform: perspective(150px) rotateX(180deg) rotateY(0deg)}
    100% {transform: perspective(150px) rotateX(180deg) rotateY(180deg)}
  }
  @keyframes l3-2 {
    0%  {background: $accent}
    33% {background: $primary}
    66% {background: $tertiary}
  }
</style>

<div class="wrapper">
  <div class="loader" style="--loader-size: {size || "40px"};">
  </div>
</div>
