import React, { useState } from "react";

const ChatUI = ({ handleClose }) => {
  const [message, setMessage] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    console.log(message);
    // Send data to the server
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      const data = await response.json();
      console.log(data);
      // Handle response
    } catch (error) {
      console.error("Error sending message:", error);
    }
    handleClose();
  };

  return (
    <div>
      <form onSubmit={handleSend}>
        <div className="flex-1 space-y-6 overflow-y-auto h-60 rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm sm:text-base sm:leading-7">
          <div className="flex items-start">
            <img
              className="mr-2 h-8 w-8 rounded-full"
              src="https://dummyimage.com/128x128/363536/ffffff&text=J"
            />
            <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 sm:max-w-md md:max-w-2xl">
              <p className="text-gray-400">
                Ask anything you'd like to know about me. This tool will tell
                you everything there is to know.
              </p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start">
            {/* Guest Avatar */}
            <img
              className="ml-2 h-8 w-8 rounded-full"
              src="https://dummyimage.com/128x128/354ea1/ffffff&text=G"
            />
            {/* Guest Convo */}
            <div className="flex min-h-[85px] rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl">
              {/* <p>Guest Convo  - Response goes here</p> */}
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="submit"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            Send
          </button>
          <input
            className="w-56"
            placeholder="Type something here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
