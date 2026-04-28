<script lang="ts" module>
  import css from "./drop-cap?css-component";

  export const data: ComponentData = {
    css: css,

    name: "Drop Cap",

    scopes: {
      compatible: [
        "project",
        "profile",
        "jam",
      ],
    },

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Drop cap letter for paragraph <code>&lt;p&gt;</code> elements.
  </p>

  <CodeHTML html={`

    <p style="font-size: 2em;" class="custom-drop-cap text-justify">
      CSS is designed to enable the separation of content and presentation, including layout, colors, and fonts. This separation can improve content accessibility, since the content can be written without concern for its presentation; provide more flexibility and control in the specification of presentation characteristics; enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, which reduces complexity and repetition in the structural content; and enable the .css file to be cached to improve the page load speed between the pages that share the file and its formatting.
    </p>

    <br>

    <small>Text from Wikipedia, licensed under CC BY-SA 4.0</small>

  `}/>

  <CodeHTML html={`

    <p style="font-size: 2em; --drop-cap-font: 'Updock';" class="custom-drop-cap text-justify">
      CSS is designed to enable the separation of content and presentation, including layout, colors, and fonts. This separation can improve content accessibility, since the content can be written without concern for its presentation; provide more flexibility and control in the specification of presentation characteristics; enable multiple web pages to share formatting by specifying the relevant CSS in a separate .css file, which reduces complexity and repetition in the structural content; and enable the .css file to be cached to improve the page load speed between the pages that share the file and its formatting.
    </p>

    <br>

    <small>Text from Wikipedia, licensed under CC BY-SA 4.0</small>

  `}/>

</ComponentPage>
