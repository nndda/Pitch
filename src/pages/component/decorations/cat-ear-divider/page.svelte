<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor } from "../../../elements";
</script>

<ComponentPage data={data}>

  <p>
    Customizable, animatable divider with cat ears.
  </p>

  <CodeEditor html={`
    <div class="custom-cat-ear-div custom-anim-wiggle"></div>

    <div style="font-size: 3em;" class="text-center">
      ≈ •ω• ≈
    </div>
  `}/>

  <h2>
    Animations
  </h2>

  <p>
    There are two animations available. Add one of the following class to enable them:
  </p>

  <ul>
    <li>
      Twitch: <code>custom-anim-twitch</code>
    </li>
    <li>
      Wiggle: <code>custom-anim-wiggle</code>
    </li>
  </ul>

  <CodeEditor html={`
    <div class="custom-cat-ear-div"></div>

    <div class="text-center">
      No animation
    </div>

    <div class="custom-cat-ear-div custom-anim-twitch"></div>

    <div class="text-center">
      Twitch
    </div>

    <div class="custom-cat-ear-div custom-anim-wiggle"></div>

    <div class="text-center">
      Wiggle
    </div>
  `}/>

</ComponentPage>
