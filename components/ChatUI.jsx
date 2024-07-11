import React, { useState } from "react";
import Link from "next/link";

const ChatUI = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      if (response.ok) {
        const data = await response.json();
        setChatResponse(data.result);
        setMessage(""); // Clear the input
      } else {
        console.error("Failed to send message");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="flex-1 space-y-6 overflow-y-auto h-60 rounded-xl bg-slate-200 p-4 text-sm leading-6 text-slate-900 shadow-sm sm:text-base sm:leading-7">
          <button
            type="button"
            className="lg:w-full mt-5 mx-1 lg:mx-2 flex justify-end px-4 text-base font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={handleClose}
          >
            Close
          </button>
          <div className="flex items-start">
            <img
              className="mr-2 h-8 w-8 rounded-full"
              src="https://dummyimage.com/128x128/363536/ffffff&text=J"
              alt="User avatar"
            />

            <div className="flex rounded-b-xl rounded-tr-xl bg-slate-50 p-4 sm:max-w-md md:max-w-2xl">
              <p className="text-gray-400">
                {message
                  ? message
                  : `Curiosity is a good thing. This tool will tell
                you anything you'd like to know about me.`}
              </p>
            </div>
          </div>
          <div className="flex flex-row-reverse items-start">
            <img
              className="ml-2 h-8 w-8 rounded-full"
              src="https://dummyimage.com/128x128/354ea1/ffffff&text=G"
              alt="Guest avatar"
            />
            <div className="flex rounded-b-xl rounded-tl-xl bg-slate-50 p-4 dark:bg-slate-800 sm:min-h-0 sm:max-w-md md:max-w-2xl">
              {/* Placeholder for guest conversation */}
              <p className="text-gray-400">
                {loading ? "Loading..." : chatResponse}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <input
            className="w-56 h-12 px-2"
            placeholder="Type something here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="w-28 lg:w-full md:text-xl mx-1 lg:mx-2 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatUI;
