<script lang="ts">
  import { CodeViewerCSS, Link, Tabs } from "@elements";

  import FAIMGPaintRoller from "./font-awesome-paint-roller.png";
  import FAIMGGlyph from "./font-awesome-1.png";
</script>

<article class="spellbook">
  <p>
    Need more icons for your page??
  </p>
  <p>
    There are several advantages of using webfont icons over raster icons (PNG images, etc.) or emojis.
  </p>
  <p>
    With raster icons, every time you want to modify your icon/image, you'd have to edit the image and re-upload it again. And emojis aren't very consistent across devices and browsers.
  </p>
  <p>
    That's where webfont icons wins: it is easy to add, and modify with just a few lines of CSS.
  </p>
  <p>BUT, there's also a few drawbacks:</p>

  <blockquote class="custom-callout" style="--col: #eca20e;">
    <h2 style="font-size: 1.2em;">Warning</h2>
    <p>
      Webfont icons are usually large in size.
    </p>
    <p>
      Since most they contain hundreds and even thousands of icons, many of which you probably won't need.
    </p>
  </blockquote>

  <blockquote class="custom-callout">
    <h2 style="font-size: 1.2em;">Note</h2>
    <p>
      It is also can be harder to work with.
    </p>
    <p>
      As you are working with the font glyph itself. And you may need to configure your editor/system to display them properly.
    </p>
  </blockquote>

  <p>
    If you're okay with those drawbacks, and still want to use webfont icons in your page, follow the tutorials below.
  </p>

  <p>
    There are tons of icons libraries that are utilizing webfont,<br>but for now, this article only covers the <Link h="https://fontawesome.com/"><b>Font Awesome</b></Link> icon library.
    <br>
    More icon libraries will be covered in the future.
  </p>

  <Tabs
    name="icon-provider"
    data={[
      { name: "Font Awesome", },
    ]}
  />

  <section data-tab="Font Awesome">
    <p>
      More specifically <b>Font Awesome 7</b> Free.
    </p>

    <ol class="custom-steps">
      <li>
        <h2>Setting up the icons</h2>
        <p>
          Copy and paste these <b>Font Awesome</b>'s font face definitions.
        </p>
        <CodeViewerCSS
          css={`

            /* Regular */
            @font-face {
              font-family: "Font Awesome 7 Free";
              font-style: normal;
              font-weight: 900;
              font-display: block;
              src: url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/webfonts/fa-solid-900.woff2");
            }

            /* Solid */
            @font-face {
              font-family: "Font Awesome 7 Free";
              font-style: normal;
              font-weight: 400;
              font-display: block;
              src: url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/webfonts/fa-regular-400.woff2");
            }

            /* Brands */
            @font-face {
              font-family: "Font Awesome 7 Free";
              font-style: normal;
              font-weight: 400;
              font-display: block;
              src: url("https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/webfonts/fa-brands-400.woff2");
            }
          `}
        />
        <p>
          You can delete other variants that you don't use.
        </p>
      </li>
      <li>
        <h3>Modify your page's font</h3>
        <p>
          This is the part that I considered a little hacky. And that I still currently looking for other approach.
        </p>
        <p>
          Target <code>.inner_column</code>, and add the <code>font-family</code> property.
        </p>
        <p>
          Add your theme's font family name first. For example, if your page uses the font <b><q>Roboto</q></b>, then add <code>Roboto</code>.
        </p>
        <p>
          Followed by <code>Lato, LatoExtended, Font Awesome 7 Free, sans-serif</code>.
        </p>
        <CodeViewerCSS
          css={`
            .inner_column {
              font-family: Roboto, Lato, LatoExtended, Font Awesome 7 Free, sans-serif;
            }
          `}
        />
      </li>
      <li>
        <h2>Adding the icons</h2>
        <p>
          Go to the <Link h="https://fontawesome.com/search?ic=free-collection">Font Awesome icon search page</Link>, and select the icon that you want.
        </p>
        <p>
          For this tutorial, we'll pick this <code>paint-roller</code> icon.
        </p>
        <p>
          <img src={FAIMGPaintRoller} alt="">
        </p>
      </li>
      <li>
        <h3>Copy the icon's glyph.</h3>
        <p>
          Copy the icon's glpyh from the top-right corner of the icon's window.
        </p>
        <p>
          <img src={FAIMGGlyph} alt="">
        </p>
      </li>
      <li>
        <h4>Paste the icon</h4>
        <p>
          Paste it to your page's HTML markup directly.
        </p>
        <p>
          Depending on your editor, you might see a <Link h="https://fonts.google.com/knowledge/glossary/tofu">tofu character</Link> instead.
        </p>
        <p>
          But, the actual icon should be rendered just fine on the page.
        </p>
      </li>
    </ol>
  </section>
</article>
