"use client";

import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import CharacterCount from "@tiptap/extension-character-count";
import {
    EditorContent,
    useEditor,
    type Editor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
    ArrowBigLeft,
    Italic,
    List,
    ListOrdered,
    Text,
    TextQuote,
} from "lucide-react";
import { useEffect } from "react";


const RichTextEditor = ({
    value,
    onChange,
}: {
    value: string;
    onChange: (value: string) => void;
}) => {

    const editor = useEditor({
        editorProps: {
            attributes: {
                class:
                    "h-[20vh] lg:h-[40vh] w-full rounded-md rounded-br-none rounded-bl-none border border-input bg-transparent px-3 py-2 border-b-0 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50 overflow-auto",
            },
        },
        extensions: [
            StarterKit.configure({
                history: false,
                heading: {
                    levels: [1, 2],
                },
            }),
            CharacterCount.configure(),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });




    useEffect(() => {
        const breakLine = (e: KeyboardEvent) => {
            if (e.key === "Enter" && e.shiftKey) {

                e.preventDefault();
                editor?.chain().focus().setHardBreak().run();
            }
        };
        document.addEventListener("keydown", breakLine);

        return () => document.removeEventListener("keydown", breakLine);
    }, [editor]);


    return (
        <>
            <EditorContent editor={editor} />
            {editor ? (
                <RichTextEditorToolbar
                    editor={editor}
                />
            ) : null}
            <div className={`flex flex-row items-center gap-2 text-sm`}>
                {editor?.storage.characterCount.characters()} caractères
            </div>
        </>
    );
};

const RichTextEditorToolbar = ({
    editor,


}: {
    editor: Editor;
}) => {
    return (
        <div className="border border-input bg-transparent rounded-br-md rounded-bl-md p-1 flex flex-row items-center gap-1 flex-wrap">

            <Toggle
                size="sm"
                pressed={editor.isActive("italic")}
                onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            >
                <Italic className="size-4" />
            </Toggle>
            
            <Separator orientation="vertical" className="w-[1px] h-8" />
            <Toggle
                size="sm"
                pressed={editor.isActive("bulletList")}
                onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
            >
                <List className="size-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("orderedList")}
                onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
            >
                <ListOrdered className="size-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("blockquote")}
                onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <TextQuote className="size-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("hardBreak")}
                onPressedChange={() => editor.chain().focus().setHardBreak().run()}
            >
                <ArrowBigLeft className="size-4" />
            </Toggle>
            <Toggle
                size="sm"
                pressed={editor.isActive("paragraph")}
                onPressedChange={() => editor.chain().focus().setParagraph().run()}
            >
                <Text className="size-4" />
            </Toggle>
            
        </div>
    );
};

export default RichTextEditor;