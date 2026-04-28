<script>
  const props = $props();
</script>

<div class="comp-cont {props.class ?? ""}">
  <button class="preview">
    Speed Dial
  </button>

  <div class="custom-speed-dial custom-tip custom-speed-dial-home">
    <ul class="custom-speed-dial-content">
      <li>
        <a href="https://www.patreon.com/nnda" class="custom-speed-dial-btn custom-tip">
          <img loading="lazy" src="https://cdn.simpleicons.org/patreon/fff">
          <span class="custom-tip-content custom-left">
            Patreon
          </span>
        </a>
      </li>


      <li>
        <a href="https://ko-fi.com/nnda" class="custom-speed-dial-btn custom-tip">
          <img loading="lazy" src="https://cdn.simpleicons.org/kofi/fff">
          <span class="custom-tip-content custom-left">
            Ko-fi
          </span>
        </a>
      </li>
    </ul>


    <details open>
      <summary>
        <img loading="lazy" alt="Open" src="https://s2.svgbox.net/octicons.svg?ic=heart-fill&color=white">
        <img loading="lazy" alt="Close" src="https://s2.svgbox.net/octicons.svg?ic=x&color=white">
      </summary>
    </details>


    <span class="custom-tip-content custom-left">
      Support me!
    </span>
  </div>
</div>
