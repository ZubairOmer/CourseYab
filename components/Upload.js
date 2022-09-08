import { Spinner } from "./Spinner";
import { Video } from "./Video";

import { useState } from "react";

export function Upload() {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [publicId, setPublicId] = useState("");
  const onChange = async (event) => {
    setShowSpinner(true);
    event.preventDefault();
    const formData = new FormData();
    const file = event.target.files[0];
    formData.append("inputFile", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setPublicId(data.public_id);
    } catch (error) {
      setShowSpinner(false);
    } finally {
      setShowSpinner(false);
      setShowVideo(true);
    }
  };
  return (
    <div>
      {/* <Spinner displayed={showSpinner} />
      <Video publicId={publicId} />
      <label
        className={`mx-auto w-64 text-black items-center p-4 m-5 bg-white rounded-lg shadow-2xl tracking-wide uppercase border border-yellow-500 cursor-pointer hover:bg-yellow-200 ${
          showSpinner || showVideo ? "hidden" : "flex flex-col"
        }`}
      >
        <svg
          className="w-8 h-8"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
        </svg>
        <span className="mt-2 text-base text-black leading-normal">
          Select a video
        </span> */}
      <input type="file" onChange={onChange} className="hidden" />
      {/* </label> */}
    </div>
  );
}
