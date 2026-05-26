<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor, ComponentRef } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Flavour of <button class="button-general">Label</button> component. Designed to looks like the 'price tag' item.
  </p>
  <p>
    Add class <code>custom-tag</code> to the <button class="button-general">Label</button> component.
  </p>

  <CodeEditor html={`

    <p>

      <em class="custom-lb custom-tag">
        🎃 Halloween
      </em>

      <strong class="custom-lb custom-tag">
        #OpenSource
      </strong>

      <span class="custom-lb custom-tag">
        Made with ☕
      </span>

    </p>

    <p>

      <span class="custom-lb custom-tag" style="background: #46425e; color: #eee;">
        #spooky
      </span>

      <span class="custom-lb custom-tag" style="background: #15788c; color: #eee;">
        #ocean
      </span>

      <span class="custom-lb custom-tag" style="background: #00b9be; color: #333;">
        Godot Engine
        <img height="16" width="16" src="https://cdn.simpleicons.org/godotengine/333" loading="lazy"/>
      </span>

      <span class="custom-lb custom-tag custom-right" style="background: #ffeecc; color: #222;">
        #cute
      </span>

      <span class="custom-lb custom-tag custom-right" style="background: #ffb0a3; color: #222;">
        #cat
      </span>

      <span class="custom-lb custom-tag custom-right" style="background: #ff6973; color: #222;">
        <img height="16" width="16" src="https://cdn.simpleicons.org/itchdotio/222" loading="lazy"/>
        itch.io
      </span>

    </p>

  `}/>

  <CodeEditor html={`

    <h3>

      <em class="custom-lb custom-tag">
        Free
      </em>

      <strong class="custom-lb custom-tag">
        50% OFF
      </strong>

    </h3>

  `}/>

  <h2>Aligning</h2>

  <p>
    Add <code>custom-right</code> class to align it to the right.
  </p>

  <CodeEditor html={`

    <h3>

      <em class="custom-lb custom-tag custom-right">
        Free
      </em>

      <strong class="custom-lb custom-tag custom-right">
        50% OFF
      </strong>

    </h3>

  `}/>

  <h2>Container Element</h2>

  <p>
    Add class <code>custom-tag</code> to the container element.
  </p>

  <CodeEditor html={`

    <p class="custom-lb-container custom-tag">

      <span style="background: #46425e; color: #eee;">
        #spooky
      </span>

      <span style="background: #15788c; color: #eee;">
        #ocean
      </span>

      <span style="background: #00b9be; color: #333;">
        Godot Engine
        <img height="16" width="16" src="https://cdn.simpleicons.org/godotengine/333" loading="lazy"/>
      </span>

      <span class="custom-right" style="background: #ffeecc; color: #222;">
        #cute
      </span>

      <span class="custom-right" style="background: #ffb0a3; color: #222;">
        #cat
      </span>

      <span class="custom-right" style="background: #ff6973; color: #222;">
        <img height="16" width="16" src="https://cdn.simpleicons.org/itchdotio/222" loading="lazy"/>
        itch.io
      </span>

    </p>

  `}/>

</ComponentPage>
