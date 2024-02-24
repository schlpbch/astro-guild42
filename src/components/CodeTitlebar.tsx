import React, { useState } from "react";
import Overlay42 from "./Overlay42";

export default function CodeTitlebar() {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className="flex-none border-b border-slate-500">
      <div className="flex h-8 items-center space-x-1.5">
        <button
          className="h-2.5 w-2.5 rounded-full bg-red-500 hover:bg-red-400"
          aria-label="Close"
        ></button>
        <button
          className="h-2.5 w-2.5 rounded-full bg-yellow-500 hover:bg-yellow-400"
          aria-label="Maximize"
        ></button>
        <button
          className="h-2.5 w-2.5 rounded-full bg-green-500 hover:bg-green-400"
          aria-label="Minimize"
          onClick={() => setShowDialog(true)}
        ></button>
      </div>
      {showDialog && <Overlay42 onClick={() => setShowDialog(false)} />}
    </div>
  );
}
