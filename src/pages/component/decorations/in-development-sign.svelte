<script lang="ts" module>
  import css from "./in-development-sign?css-component";

  export const data: ComponentData = {
    css: css,

    name: "In Development Sign",

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
    In development sign for your in development project, to tell that your project is in development.
  </p>

  <CodeHTML html={`

    <div class="custom-indev">
      <div>🚧 IN DEVELOPMENT</div>
    </div>

    <div class="custom-indev">
      <div>WORK IN PROGRESS</div>
    </div>

  `}/>

</ComponentPage>
