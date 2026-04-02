<script lang="ts" module>
  export const data: ComponentData = {

    name: "Label",

    scopes: {
      compatible: "project",
      partial: [
        "profile",
        "jam",
      ],
    },

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Highlight genres, tags, tools, or jam. Can be applied to hyperlinks, plain text, or any inline elements, such as <code>&lt;a&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;strong&gt;</code>, or <code>&lt;span&gt;</code>.
  </p>

  <CodeHTML html={`

    <em class="custom-lb">
      🎃 Halloween
    </em>

    <strong class="custom-lb">
      #OpenSource
    </strong>

    <span class="custom-lb">
      Made with ☕
    </span>

  `}/>

  <h2>Images and Icons</h2>

  <p>
    Just add <code>&lt;img&gt;</code> of the images or icons. The image's height will be set to the text height.
  </p>

  <CodeHTML html={`

    <span class="custom-lb">
      <img alt="" src="https://cdn.jsdelivr.net/gh/nndda/nndda@main/hand_circle.svg">
      Human Made
    </span>

    <span class="custom-lb">
      <img alt="" src="https://mirrors.creativecommons.org/presskit/icons/cc.svg">
      <img alt="" src="https://mirrors.creativecommons.org/presskit/icons/by.svg">
      CC BY 4.0
    </span>

  `}/>

  <small>
    The "Human Made" icon is created by <a target="_blank" href="https://hinokodo.itch.io/human-made">HINOKODO</a>.
  </small>

  <h2>Custom Colors</h2>

  <p>
    Add and set <code>background</code> and <code>color</code> properties manually.
  </p>

  <CodeHTML html={`

    <span class="custom-lb" style="background: #46425e; color: #eee;">
      #spooky
    </span>

    <span class="custom-lb" style="background: #15788c; color: #eee;">
      #ocean
    </span>

    <span class="custom-lb" style="background: #00b9be; color: #333;">
      <img alt="" src="https://cdn.simpleicons.org/godotengine/333" loading="lazy"/>
      Godot Engine
    </span>

    <span class="custom-lb" style="background: #ffeecc; color: #222;">
      #cute
    </span>

    <span class="custom-lb" style="background: #ffb0a3; color: #222;">
      #cat
    </span>

    <span class="custom-lb" style="background: #ff6973; color: #222;">
      <img src="https://cdn.simpleicons.org/itchdotio/222" loading="lazy"/>
      itch.io
    </span>

  `}/>

  <h2>Examples</h2>

  <p>
    As a heading badge/label, using <code>&lt;small&gt;</code> element:
  </p>

  <CodeHTML html={`

    <h1>
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
    </h3>

  `}/>

  <p>
    Inline use in a <code>&lt;p&gt;</code> element:
  </p>

  <CodeHTML html={`

    <p style="max-width: 400px">
      Hello hello, these are some of the features
      that everyone have been waiting for!
      We have added some
      <em class="custom-lb">brand new</em>
      and
      <em class="custom-lb">epic</em>
      features to the app!!!
      Don't mind anything after this sentence.
      I'm just typing whatever to pad this paragraph.
      You can safely ignore this.
    </p>

  `}/>

</ComponentPage>
