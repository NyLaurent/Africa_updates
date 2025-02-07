import React, { useState, useEffect } from "react";
import { EditorProvider, useCurrentEditor, Editor } from "@tiptap/react";
import { FaBold, FaItalic, FaStrikethrough, FaCode, FaListUl, FaListOl, FaQuoteRight, FaUndo, FaRedo, FaRegDotCircle, FaRegTimesCircle } from "react-icons/fa";  // Import icons
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import { Color } from "@tiptap/extension-color";

// MenuBar component with icons
const MenuBar: React.FC = () => {
    const { editor } = useCurrentEditor();

    if (!editor) {
        return null;
    }

    return (
        <div className="flex items-center gap-4 mb-6">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaBold size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("italic") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaItalic size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("strike") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaStrikethrough size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editor.can().chain().focus().toggleCode().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("code") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaCode size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().clearNodes().run()}
                className="p-3 bg-red-500 text-white rounded-full transition-colors hover:bg-red-600"
            >
                <FaRegTimesCircle size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("bulletList") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaListUl size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("orderedList") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaListOl size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={`p-3 rounded-full transition-colors ${editor.isActive("blockquote") ? "bg-blue-500 text-white" : "bg-card hover:scale-95"}`}
            >
                <FaQuoteRight size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            >
                <FaRegDotCircle size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().chain().focus().undo().run()}
                className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            >
                <FaUndo size={20} />
            </button>
            <button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().chain().focus().redo().run()}
                className="p-3 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
            >
                <FaRedo size={20} />
            </button>
        </div>
    );
};

// Extensions
const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
    }),
];

const RichTextEditor = ({ value, onChange }: { value: any, onChange: (value: any) => void }) => {
    const [editorContent, setEditorContent] = useState(value);

    useEffect(() => {
        if (value !== editorContent) {
            setEditorContent(value);
        }
    }, [value]);

    const handleEditorChange = (editor: Editor) => {
        const content = editor.getHTML();
        setEditorContent(content);
        onChange(content);  // Call the onChange prop to update the parent state
    };

    return (
        <div className=" p-6 bg-background border rounded-lg shadow-lg">
            <EditorProvider
                extensions={extensions}
                content={editorContent}
                onUpdate={({ editor }) => handleEditorChange(editor)}
                slotBefore={<MenuBar />}
            />
        </div>
    );
};

export default RichTextEditor;
