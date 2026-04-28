<script>
  const props = $props();
</script>

<div class="comp-cont {props.class ?? ""}">
  <button class="preview">
    Label
  </button>

  <div style="margin: 1.75em 0;">
    <a target="_blank" class="custom-lb" href="https://itch.io/games/tag-cats">Cats</a>
    <a target="_blank" href="https://itch.io/games/tag-pixel-art" class="custom-lb">Pixel Art</a>

    <br>

    <span class="custom-lb">🎃 Spooky</span>
    <span class="custom-lb">👾 Space</span>

    <br>

    <span class="custom-lb" style="background: #faaa30; color: #060e24;">
      <img src="https://cdn.jsdelivr.net/gh/nndda/nndda@main/hand_circle.svg">
      Human Made
    </span>

    <br>

    <span class="custom-lb" style="background: white; color: black;">
      <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg">
      <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg">
      CC BY 4.0
    </span>

    <hr>

    <p class="custom-grouped-lb">
      <a href="#" class="custom-lb custom-tip" style="background: #ff6973;">
        <img height="32" src="https://cdn.simpleicons.org/youtube/222" loading="lazy"/>


        <span class="custom-tip-content">
          YouTube
        </span>
      </a>


      <a href="#" class="custom-lb custom-tip" style="background: #46425e;">
        <img height="32" src="https://cdn.simpleicons.org/mastodon/eee" loading="lazy"/>


        <span class="custom-tip-content">
          Mastodon
        </span>
      </a>


      <a href="#" class="custom-lb custom-tip" style="background: #15788c;">
        <img height="32" src="https://cdn.simpleicons.org/bluesky/eee" loading="lazy"/>


        <span class="custom-tip-content">
          Bluesky
        </span>
      </a>
    </p>

  </div>
</div>
