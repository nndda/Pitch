<script lang="ts">
  export let data: ComponentData;
  import { ComponentPage, CodeHTML } from "../_template/components";
</script>

<ComponentPage data={data}>

  <p>
    Code block component with number lines on the side.
  </p>

  <CodeHTML html={`

    <div class="custom-code"><code>
    </code><code>.custom-uwu &#123;
    </code><code>  color: darkblue;
    </code><code>  background: cyan;
    </code><code>&#125;
    </code><code>
    </code></div>

  `}/>

  <h2>Highlight Lines</h2>

  <p>
    Highlight lines by adding <code>custom-hl</code> class to the <code>&lt;code&gt;</code> line.
  </p>

  <CodeHTML html={`

    <div class="custom-code"><code>extends Control
    </code><code>
    </code><code class="custom-hl">var epic_dialogue = Dialogue.load('res://intro.dlg')
    </code><code>
    </code><code>@export var my_stage : Stage
    </code><code>
    </code><code>func _ready():
    </code><code>    my_stage.start(epic_dialogue)
    </code><code>
    </code><code>func _input(event):
    </code><code>    if event.is_action_pressed('ui_accept'):
    </code><code>        my_stage.progress()
    </code><code>
    </code></div>

  `}/>

</ComponentPage>
