<template>
<div class="dev-container">
    <div class="editor-container" ref="editor" contenteditable="true">
        
    </div>
</div>
</template>

<script>
import {schema} from "prosemirror-schema-basic"
import {EditorState} from "prosemirror-state"
import {EditorView} from "prosemirror-view"
import {undo, redo, history} from "prosemirror-history"
import {keymap} from "prosemirror-keymap"
import {baseKeymap} from "prosemirror-commands"

export default {
    data () {
        return {
            
        }
    },
    mounted () {
        let state = EditorState.create({schema});
        let view = new EditorView(this.$refs.editor, {
            state,
            plguins: [
                history(),
                keymap({
                    "Mod-z": undo,
                    "Mod-y": redo
                }),
                keymap(baseKeymap)
            ]
        });
        console.log(view)
    }
}
</script>

<style lang="scss">
.dev-container
{
    .editor-container
    {
        position: relative;
        width: 500px;
        height: 500px;
    }
}
</style>