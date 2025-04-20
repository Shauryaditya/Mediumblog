import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface TextEditorProps {
  value: string;
  setValue: (value: string) => void;
  reactQuillRef: React.RefObject<ReactQuill>;
}

const TextEditor: React.FC<TextEditorProps> = ({ value, setValue, reactQuillRef }) => {
  return (
    <ReactQuill
      ref={reactQuillRef}
      theme="snow"
      className="h-64 mb-5 rounded-2xl border-0 outline-0"
      placeholder="Write something awesome..."
      value={value}
      onChange={setValue}
      modules={{
        toolbar: {
          container: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
              { list: "ordered" },
              { list: "bullet" },
              { indent: "-1" },
              { indent: "+1" },
            ],
            ["link", "image", "video"],
            ["code-block"],
            ["clean"],
          ],
        },
        clipboard: {
          matchVisual: false,
        },
      }}
      formats={[
        "header",
        "font",
        "size",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "video",
        "code-block",
      ]}
    />
  );
};

export default TextEditor;
