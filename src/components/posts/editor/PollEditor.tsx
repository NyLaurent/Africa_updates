"use client";

import LoadingButton from "@/components/LoadingButton";
import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";
import { useSubmitPostMutation } from "./mutations";
import "./styles.css";
import RichTextEditor from "./RichTextEditor";
import { useRouter } from "next/navigation";

export default function PollEditor() {
  const [contentData, setContentData] = useState("")
  // const { user } = useSession();

  const mutation = useSubmitPostMutation();
  const router = useRouter()



  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's crack-a-lackin'?",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  function onSubmit() {
    mutation.mutate(
      {
        type: "poll",
        input: {
          title: input,
          description: contentData,
        }
      },
      {
        onSuccess: () => {
          editor?.commands.clearContent();

          router.push("/")
        },
      },
    );
  }


  return (
    <div className="flex flex-col gap-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="flex gap-5">
        {/* <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" /> */}
        <div className="w-full">
          <EditorContent
            editor={editor}
            className={cn(
              "max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-background px-5 py-3"
            )}
          />
          <input />
        </div>
      </div>
      <div>
        <p className="text-primary text-lg">Short Description</p>
        <RichTextEditor value={contentData} onChange={(value: any) => setContentData(value)} />
      </div>


      <div className="flex items-center justify-end gap-3">
        <LoadingButton
          onClick={onSubmit}
          loading={mutation.isPending}
          disabled={!input.trim()}
          className="min-w-20"
        >
          Post
        </LoadingButton>
      </div>




    </div>
  );
}

