<script lang="ts" module>
  import css from "./table?css-component";

  export const data: ComponentData = {
    css: css,

    name: "Table",

    scopes: {
      compatible: "project",
      none: [
        "profile",
        "jam",
      ],
    },

  };

  import { CodeHTML, ComponentPage } from "../_template/components";

</script>

<ComponentPage data={data}>

  <p>
    Modified default table element, that takes the full width of the page.
  </p>

  <p>
    This is just a redesign of itch's default table element, no custom class or specific HTML structures required.
  </p>

  <h2>Examples</h2>

  <p>
    Table element with table heading cells on the first column and first row:
  </p>

  <CodeHTML html={`

    <table>
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
    </table>

  `}/>

  <CodeHTML html={`

    <table>
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
          <td>Fire Ball</td>
          <td>🔥</td>
          <td>2</td>
          <td>20-25</td>
        </tr>
        <tr>
          <td>Ice Spear</td>
          <td>❄️</td>
          <td>3</td>
          <td>10-25</td>
        </tr>
        <tr>
          <td>Lightning Bolt</td>
          <td>⚡</td>
          <td>5</td>
          <td>15-20</td>
        </tr>
      </tbody>
    </table>

  `}/>

</ComponentPage>
