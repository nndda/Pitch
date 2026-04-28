<script>
  const props = $props();
</script>

<div class="comp-cont {props.class ?? ""}">
  <button class="preview">
    Table
  </button>

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
</div>
