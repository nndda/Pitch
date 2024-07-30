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
    ],
  },
  "callout" : {
    desc: "Inform content warnings, additional informations, or a technical issues.",
    type: "component",
    sampleHTML: [
`<blockquote class="custom-call">

  <h3>&#9888; Content Warning</h3>
  Strong language, mild violence, blood, and flashing lights.

</blockquote>`
,
    ],
  },
  "info-list" : {
    desc: "Custom class for description list element that use 2 column table layout.",
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
    desc: "Represent the keyboard inputs, controls, or any buttons.",
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
    ],
  },
  "spoiler" : {
    desc: "Hide any lines of text. Hover over it, to show the content. Can be applied to any inline element.",
    type: "component",
    sampleHTML: [
`<p>
The one who stole Nina's muffins was
<span class="custom-hd">Mr. Snuffles</span>.
I don't find that very surprising, to be honest.
<span class="custom-hd">It's not the first time he committed such crime</span>.
Let the court of law decide
<span class="custom-hd">his inocence</span>.
But from now on, we can sleep in peace, knowing the truth.
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
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>John Doe</td>
          <td>900</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Godette</td>
          <td>850</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Charles</td>
          <td>700</td>
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