<script lang="ts">
  import { Link } from "@elements";
</script>

<style lang="scss">
  .footer {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin-top: 2em;

    // & code {
    //   padding: 0;
    // }
  }
</style>

<h2>License</h2>

<ul class="custom-ul">
  <li>
    The Pitch web app is licensed under <Link h="https://github.com/nndda/Pitch/blob/main/LICENSE">GNU AGPLv3</Link>.
  </li>

  <li>
    The CSS components are licensed under <Link h="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0</Link>.
  </li>

  <li>
    The placeholder content in the HTML preview and/or in the image preview may be subject to different license or copyright restrictions.
  </li>
</ul>

<footer class="footer">
  <div>
    Build
    <Link h="https://github.com/nndda/Pitch/commit/{COMMIT_HASH}">
      {COMMIT_HASH}
    </Link>
    <br>
    {#await import("date-fns") then { formatDistanceToNow }}
      Released <b>{formatDistanceToNow( COMMIT_DATE, { addSuffix: true, })}</b>
    {/await}
  </div>

  <div>
    Copyright &copy; 2023-2026 nnda
  </div>
</footer>
