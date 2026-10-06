<script lang="ts">
  import { Link, CodeViewerCSS } from "@elements";

  import FontsourceIMGGetFont from "./fontsource-1-get-font.png";
  import FontsourceIMGDevSetup from "./fontsource-2-developer-setup.png";
  import FontsourceIMGDeliveryOutput from "./fontsource-3-delivery-css-output.png";
  import FontsourceIMGSetup from "./fontsource-4-setup.png";
  import FontsourceIMGFontFace from "./fontsource-5-font-face.png";
</script>

<article class="spellbook">
  <p>
    Want more fonts for your page?
  </p>

  <p>
    Project page on itch.io only allows at maximum two fonts: one base font, and one for the headings.
  </p>

  <p>
    You can get more fonts from <Link h="https://fonts.google.com/">Google Fonts</Link>. Though, I would not recommend it, because the CDN CSS version it offers uses CSS' <code>@import</code>. Which slows down stuff, and causes <Link h="https://en.wikipedia.org/wiki/Flash_of_unstyled_content">FOUC</Link>.
  </p>

  <p>
    I recommend <Link h="https://fontsource.org/">Fontsource</Link> instead. Its open source, and the CDN offers the direct <code>@font-face</code> snippets.
  </p>

  <p>
    Below is the step by step on how to bring (another) custom font to your page.
  </p>

  <ol class="custom-steps">
    <li>
      <h2>Browse and pick the font</h2>
      <p>
        Visit <Link h="https://fontsource.org/">Fontsource</Link>, and pick the font that you want.
      </p>
      <p>
        For this tutorial, we'll use <q>Pixelify Sans</q>.
      </p>
    </li>

    <li>
      <h3>Click <q>Get font</q></h3>
      <p>
        <img src={FontsourceIMGGetFont} alt="">
      </p>
    </li>

    <li>
      <h3>Choose <q>Developer setup</q></h3>
      <p>
        <img src={FontsourceIMGDevSetup} alt="">
      </p>
    </li>

    <li>
      <h3>Output</h3>
      <p>
        Choose <b><q>CDN</q></b> under <b><q>DELIVERY</q></b>.
        <br>
        And <b><q>Custom CSS</q></b> under <b><q>CSS OUTPUT</q></b>.
      </p>
      <p>
        <img src={FontsourceIMGDeliveryOutput} alt="">
      </p>
    </li>

    <li>
      <h3>Configuring the font (optional)</h3>
      <details>
        <summary>
          Show content
        </summary>

        <p>
          You can choose between <b><q>Variable</q></b> (default) or <b><q>Static</q></b> under <b><q>Font type</q></b>.
        </p>
        <p>
          Use <b><q>Static</q></b> if you only want specific weight, and/or want smaller font size.
        </p>
        <p>
          Otherwise you can leave it as is.
        </p>
        <p>
          <img src={FontsourceIMGSetup} alt="">
        </p>
      </details>

      <p>
        This step is optional, and you can skip it.
      </p>
    </li>

    <li>
      <h3>Getting the CSS</h3>
      <p>
        Scroll down, and copy the CSS font-face snippets.
      </p>
      <p>
        <img src={FontsourceIMGFontFace} alt="">
      </p>
    </li>

    <li>
      <h2>Apply the font to your page</h2>
      <p>
        Paste the CSS to your page's custom CSS field.
      </p>
      <p>
        From here, you can use and apply the font to your page.
      </p>
      <CodeViewerCSS
        css={`
          /* In custom class wrapper */
          .custom-pixel-font {
            font-family: 'Pixelify Sans Variable', serif;
          }

          /* Or overriding certain elements' font */
          .button {
            &.buy_btn {
              font-family: 'Pixelify Sans Variable', serif;
            }
          }
        `}
      />
    </li>
  </ol>
</article>
