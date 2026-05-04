import Editor from "@monaco-editor/react";

const CodeEditor = () => {
  return (
    <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold text-[#004650] inter">Balanced Binary Tree</h1>
            <p className="text-lg font-semibold text-teal-900">Given a binary tree, determine if it is height-balanced.</p>
        </div>
      <Editor 
      height="410px"
      theme="vs-light"/>
    </div>
  )
}

export default CodeEditor
