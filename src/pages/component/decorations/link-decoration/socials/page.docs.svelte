<script lang="ts">
  import Examples from "./examples";
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

<p>
  <strong><em>Automatically</em></strong> decorate links pointing to various social platforms.
</p>

<p>
  Add <code>custom-social-links</code> class to the container element with the social links.
</p>

<Examples.basic/>

<Examples.paragraph/>

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

<Examples.paragraph_exclude/>

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
