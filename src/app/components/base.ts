import { PitchComponentsLibrary } from "../scripts/components";

export const compBase : PitchComponentsLibrary = {
  "accordion" : {
    desc: "Turn walls of texts into list of collapsable contents.",
    type: "component",
    sampleHTML: [
`<div class="custom-accrd">

  <details>
    <summary>How do I get access to custom CSS in my game page?</summary>
    You can contact itch.io support to enable the custom CSS feature.
  </details>

  <details>
    <summary>Can I use this in a commercial project?</summary>
    Yes! The generated CSS codes is licensed under <em>Creative Commons Zero v1.0 Universal</em>.
  </details>

  <details>
    <summary>Why can't I use this on profile or jam pages?</summary>
    All components make use of the page's theme. Unlike project page, profile page and jam page didn't have some of the require color variables needed for the components to be displayed correctly (e.g. button color).
  </details>

</div>`
,
`
<div class="custom-accrd">

    <p>
      This asset pack is licensed under 
      <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank">
        CC BY 4.0
      </a>
      <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" width="20px">
      <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" width="20px">
    </p>

  <details>
    <summary>What you can and can't do</summary>
      <ul>
        <li>
          Use in commercial or non-commercial projects
        </li>
        <li>
          Modify, or adapt to your needs
        </li>
        <li>
          Redistribute and share
          <ul>
            <li>though, plz redistribute them as a part of a project, and not as an asset pack by itself</li>
          </ul>
        </li>
        <li>
          No AI or NFTs
        </li>
      </ul>
  </details>

  <details>
    <summary>How to give attribution</summary>
    <p>
      Use my itch.io username
      <code>nnda</code>
      <br>
      And if possible, provide link to my itch.io
      <a href="https://nnda.itch.io" target="_blank">profile page</a>.
    </p>
  </details>

</div>
`
,
`
<div class="custom-accrd custom-left">
  <details>
    <summary>Left-aligned accordion</summary>
    This accordion is aligned to the left.
  </details>
</div>
`
,
`
<div class="custom-accrd custom-right">
  <details>
    <summary>Right-aligned accordion</summary>
    This accordion is aligned to the right.
  </details>
</div>
`
,
`
<div class="custom-accrd custom-full-w">
  <details>
    <summary>Full width accordion</summary>
    This accordion takes full width of the page.
  </details>
</div>
`
    ],
  },
  "callout" : {
    desc: "Inform and highlight content warnings, additional informations, or technical issues.",
    type: "component",
    sampleHTML: [
`<blockquote class="custom-call">

  <h3>&#9888; Content Warning</h3>
  Strong language, mild violence, blood, and flashing lights.

</blockquote>`
,
`<blockquote class="custom-call">

  <h3>🐞 Note!</h3>
  This project is still in its alpha stage. And is subject to frequent changes, and bugs.

  <br>
  <br>

  <b class="custom-lb">Report bugs here</b>

  And feel free to share your feedback in the comments!

</blockquote>`
    ],
  },
  "info-list" : {
    desc: "Custom class that style description list element to two-column layout.",
    type: "component",
    sampleHTML: [
`<dl class="custom-info">

  <dt>Arts</dt>
  <dd>
    <a href="#">Amazing artist</a>
  </dd>

  <dt>Story</dt>
  <dd>
    <a href="#">Wonderful writer</a>
  </dd>

  <dt>Codes</dt>
  <dd>
    <a href="#">Creative coder</a>,
    <a href="#">Proficient programmer</a>
  </dd>

</dl>`
,
`<dl class="custom-info">
<!-- Combined with Input component -->

  <dt>Move</dt>
  <dd>
    <kbd>W</kbd>,
    <kbd>A</kbd>,
    <kbd>S</kbd>,
    <kbd>D</kbd>
  </dd>

  <dt>Jump</dt>
  <dd>
    <kbd>Space</kbd>
  </dd>

  <dt>Interract</dt>
  <dd>
    <kbd>F</kbd>,
    <kbd>E</kbd>
  </dd>

</dl>`
  ,
    ],
  },
  "input" : {
    desc: "Represent keyboard inputs, controls, or any buttons.",
    type: "component",
    sampleHTML: [
`Press <kbd>Ctrl</kbd> + <kbd>A</kbd> to select all text.

Then press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy them.

<br>
<br>

Depend on your browser, <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd> will open a new window.`
,
`<kbd>W</kbd>,
<kbd>A</kbd>,
<kbd>S</kbd>,
<kbd>D</kbd>

<br>

<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>N</kbd>`
    ],
  },
  "label" : {
    desc: "Highlight genres, tags, tools, or jam. Can be applied to hyperlinks or plain text.",
    type: "component",
    sampleHTML: [
`<i class="custom-lb">
  🎃 Halloween
</i>

<b class="custom-lb">
  #OpenSource
</b>

<span class="custom-lb">
  Made with ☕
</span>`
,
`<h1>
  Exciting Features
  <small class="custom-lb">New</small>
</h1>

<h2>
  Another Features
  <small class="custom-lb">Beta</small>
</h2>

<h3>
  New Features?
  <small class="custom-lb">Alpha</small>
</h3>`
,
,
`
<h1>
  Some Features
  <small class="custom-lb">V2.4</small>
</h1>

<p style="max-width: 400px">
  Hello hello, these are some of the features
  that everyone have been waiting for!
  We have added some
  <i class="custom-lb">brand new</i>
  and
  <i class="custom-lb">epic</i>
  features to the app!!!
  Don't mind anything after this sentence.
  I'm just typing whatever to pad this paragraph.
  You can safely ignore this.
</p>
`
    ],
  },
  "spoiler" : {
    desc: "Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element.",
    type: "component",
    sampleHTML: [
`<p>
  The one who stole Nina's muffins was
  <span class="custom-hd">Mr. Snuffles</span>.
</p>`
],
  },
  "table" : {
    desc: "Modified default table element, that takes the full width of the page.",
    type: "component",
    sampleHTML: [
`<table>
  <thead>
    <tr>
      <th></th>
      <th>Free version</th>
      <th>Paid version</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Animation</th>
      <td>❌ None</td>
      <td>✅ Animated</td>
    </tr>
    <tr>
      <th>File format</th>
      <td>
        .png
      </td>
      <td>
        .png<br>
        .psd<br>
        .aseprite
      </td>
    </tr>
    <tr>
      <th>Commercial use</th>
      <td>❌ Not allowed</td>
      <td>✅ Allowed</td>
    </tr>
    <tr>
      <th>Attribution</th>
      <td>❌ Required</td>
      <td>✅ Not required</td>
    </tr>
  </tbody>
</table>`
,
`<table>
  <thead>
    <tr>
      <th>Spell</th>
      <th>Type</th>
      <th>Min. Level</th>
      <th>Damage</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Fire ball</td>
      <td>🔥</td>
      <td>2</td>
      <td>20-25</td>
    </tr>
    <tr>
      <td>Ice spear</td>
      <td>❄️</td>
      <td>3</td>
      <td>10-25</td>
    </tr>
    <tr>
      <td>Lightning bolt</td>
      <td>⚡</td>
      <td>5</td>
      <td>15-20</td>
    </tr>
  </tbody>
</table>`
    ],
  },
  "variables" : {
    desc: "",
    type: "",
  },
};