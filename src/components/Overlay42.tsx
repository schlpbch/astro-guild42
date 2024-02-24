import React, { useState } from "react";

export default function Overlay42() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  if (open) {
    return (
      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-black px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
              <div>
                <div className="text-center">
                  <h3
                    className="my-5 inline-block bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-5xl font-bold tracking-tighter text-transparent sm:my-8 sm:text-5xl"
                    id="modal-title"
                  >
                    42
                  </h3>
                  <div className="mt-2">
                    <p className="text-md text-gray-200">
                      Answer to the Ultimate Question of Life, the Universe, and
                      Everything
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 text-center sm:mt-6 ">
                <button
                  type="submit"
                  className="relative p-4 underline decoration-dashed underline-offset-4 hover:text-skin-accent focus-visible:p-1"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
