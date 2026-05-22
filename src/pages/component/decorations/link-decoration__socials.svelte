<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor, ComponentRef } from "../_template/components";
</script>

<style lang="scss">
  .links-platforms {
    column-count: 3;
    column-gap: 2em;

    & li {
      list-style: none;
    }
  }
</style>

<ComponentPage data={data}>

  <p>
    <strong><em>Automatically</em></strong> decorate links pointing to various social platforms.
  </p>

  <p>
    Add <code>custom-social-links</code> class to the container element with the social links.
  </p>

  <CodeEditor html={`

    <p class="custom-social-links text-justify">
      If you're on Bluesky, follow me at
      <a href="https://bsky.app/profile/did:plc:iwluqzosr2cjuzldtanzewke" target="_blank">@nnda.dev</a>.
      Don't forget to absolutely annihilate that subscribe button on our epic YouTube channel
      <a href="https://www.youtube.com/@nnda_dev" target="_blank">@nnda_dev</a>.
      Hang out, chill, and chat on our epic
      <a href="https://discord.gg/" target="_blank">Discord server</a>!!
    </p>

  `}

  css={`
    p {
      max-width: 25em;
      margin-inline: auto;
    }
  `}
  />

  <p>
    Currently, the following platforms are supported:
  </p>

  <ul class="custom-ul links-platforms">
    <li>
      <i class="fa-brands fa-itch-io"></i> itch.io
    </li>
    <li>
      <i class="fa-brands fa-bluesky"></i> Bluesky
    </li>
    <li>
      <i class="fa-brands fa-discord"></i> Discord
    </li>
    <li>
      <i class="fa-brands fa-github"></i> GitHub
    </li>
    <li>
      <i class="fa-brands fa-instagram"></i> Instagram
    </li>
    <li>
      <i class="fa-brands fa-ko-fi"></i> Ko-fi
    </li>
    <li>
      <i class="fa-brands fa-patreon"></i> Patreon
    </li>
    <li>
      <i class="fa-brands fa-soundcloud"></i> Soundcloud
    </li>
    <li>
      <i class="fa-brands fa-steam"></i> Steam
    </li>
    <li>
      <i class="fa-brands fa-tumblr"></i> Tumblr
    </li>
    <li>
      <i class="fa-brands fa-tiktok"></i> TikTok
    </li>
    <li>
      <i class="fa-brands fa-twitch"></i> Twitch
    </li>
    <li>
      <i class="fa-brands fa-twitter"></i> Twitter
    </li>
    <li>
      <i class="fa-brands fa-youtube"></i> YouTube
    </li>
  </ul>

  <h2>Excluding Links</h2>

  <p>
    If you have a link that you don't want to decorate, simply add <code>custom-not-social-link</code> class to the <code>&lt;a&gt;</code> tag.
  </p>

  <CodeEditor html={`

    <p class="custom-social-links text-justify">
      If you're on Bluesky, follow me at <a href="https://bsky.app/profile/did:plc:iwluqzosr2cjuzldtanzewke" target="_blank">@nnda.dev</a>. Don't forget to absolutely annihilate that subscribe button on our epic YouTube channel <a href="https://www.youtube.com/@nnda_dev" target="_blank">@nnda_dev</a>. Hang out, chill, and chat on our epic <a class="custom-not-social-link" href="https://discord.gg/" target="_blank">Discord server</a>!!
    </p>

  `}

  css={`
    p {
      max-width: 25em;
      margin-inline: auto;
    }
  `}
  />

  <h2>Examples</h2>

  <p>With <ComponentRef comp="Info List"/> component.</p>

  <CodeEditor html={`

    <dl class="custom-info custom-social-links">

      <dt>Director</dt>
      <dd>
        <a href="https://github.com/" target="_blank">Dedicated developer</a>
      </dd>

      <dt>Story</dt>
      <dd>
        <a href="https://www.tumblr.com/" target="_blank">Witty writer</a>
      </dd>

      <dt>Arts</dt>
      <dd>
        <a href="https://bsky.app/profile/" target="_blank">Illustrious illustrator</a>
          <br>
        <a href="https://www.instagram.com/" target="_blank">Devoted designer</a>
          <br>
        <a href="https://www.youtube.com/" target="_blank">Amazing animator</a>
      </dd>

      <dt>Programming</dt>
      <dd>
        <a href="https://github.com/" target="_blank">Creative coder</a>
          <br>
        <a href="https://github.com/" target="_blank">Proficient programmer</a>
      </dd>

      <dt>Sounds</dt>
      <dd>
        <a href="https://soundcloud.com/" target="_blank">Classic composer</a>
          <br>
        <a href="https://itch.io/profile/" target="_blank">Stunning sound designer</a>
      </dd>

    </dl>

  `}/>

  <p>With <ComponentRef comp="Label — Grouped"/> component.</p>

  <CodeEditor html={`

    <p class="custom-grouped-lb custom-social-links text-center" style="font-size: 2em;">
      <a href="https://www.youtube.com/" class="custom-lb" target="_blank" style="background: #ff6973; color: #222;">
        YouTube
      </a>

      <a href="https://www.tumblr.com/" class="custom-lb" target="_blank" style="background: #36465D; color: #eee;">
        Tumblr
      </a>

      <a href="https://bsky.app/profile/" class="custom-lb" target="_blank" style="background: #15788c; color: #eee;">
        Bluesky
      </a>
    </p>

  `}/>

  <h2>Troubleshooting</h2>

  <p>
    If the icon doesn't appear on the links, make sure that the URL of the platforms are correct:
  </p>

  <ul>
    <li>
      <p>
        Make sure the URL starts with <code>https://</code>.
      </p>
    </li>
    <li>
      <p>
        See if there's <code>www.</code> on the URL or not.
        <br>
        Platforms like YouTube, Tumblr, etc. uses it, while platforms like itch.io, Ko-fi, and Bluesky doesn't.
      </p>
    </li>
    <li>
      <p>
        <strong>itch.io &amp; Tumblr only:</strong> If the link is pointing to itch.io's creator page: <code>&lt;user&gt;.itch.io</code>, or to a Tumblr blog page: <code>&lt;user&gt;.tumblr.com</code>. Make sure to include the trailing slash <code>/</code> at the end.
      </p>
      Like this: <code>https://&lt;username&gt;.itch.io/</code>
    </li>
  </ul>

</ComponentPage>
