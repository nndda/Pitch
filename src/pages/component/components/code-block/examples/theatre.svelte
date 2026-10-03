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
