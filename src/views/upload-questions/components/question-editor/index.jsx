import '@wangeditor/editor/dist/css/style.css' // 引入 css

import React, { useState, useEffect } from 'react'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { DomEditor } from '@wangeditor/editor'

// 当前菜单排序和分组

function MyEditor(props) {
    // editor 实例
    const [editor, setEditor] = useState(null)


    // 编辑器内容
    const [html, setHtml] = useState('<p></p>')


    // 工具栏配置
    const toolbarConfig = {
        excludeKeys: [
            'group-image', 'group-video'
        ]
    }

    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
    }


    const changeValue = (html) => {
        setHtml(html)
        props.onChange(html)
    }

    // 及时销毁 editor ，重要！
    useEffect(() => {
        // if (editor) {
        //     const toolbar = DomEditor.getToolbar(editor)
        //     const curToolbarConfig = toolbar.getConfig()
        //     console.log(curToolbarConfig.toolbarKeys)
        // }
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    return (
        <>
            <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    mode="default"
                    style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                    defaultConfig={editorConfig}
                    value={html}
                    onCreated={setEditor}
                    onChange={editor => changeValue(editor.getHtml())}
                    mode="default"
                    style={{ height: '300px', overflowY: 'scroll' }}
                />
            </div>
        </>
    )
}

export default MyEditor