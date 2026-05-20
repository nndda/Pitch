<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeEditor, ComponentRef } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Flavour of <ComponentRef comp="Tree List"/> component, designed specifically for filesystem hierarchy, with file and colored folder icons.
  </p>

  <p>
    Add <code>custom-directory</code> class to the <code>custom-tree</code> <code>&lt;ul&gt;</code> element.
  </p>

  <CodeEditor html={`

    <ul class="custom-tree custom-directory">
      <li>
        <h3>
          TotallyARealVN-pc.zip
        </h3>
        <ul>
          <li class="custom-dir">renpy/</li>
          <li class="custom-dir">lib/</li>
          <li class="custom-dir">game/</li>
          <li>
            bonus/
            <small class="custom-lb">fan pack</small>
            <ul>
              <li class="custom-dir">art pack/</li>
              <li class="custom-dir">soundtracks/</li>
              <li>thank you!.txt</li>
            </ul>
          </li>
          <li>
            TotallyARealVN.sh
            <small class="custom-lb">Linux</small>
          </li>
          <li>
            TotallyARealVN.exe
            <small class="custom-lb">Windows</small>
          </li>
          <li>
            TotallyARealVN.py
          </li>
        </ul>
      </li>
    </ul>

  `}/>

  <p>
    <code>&lt;li&gt;</code> element containing nested <code>&lt;ul&gt;</code> will be marked as a directory.
    <br>
    Add <code>custom-dir</code> class to the <code>&lt;li&gt;</code> element to mark it as a directory manually.
  </p>


</ComponentPage>
