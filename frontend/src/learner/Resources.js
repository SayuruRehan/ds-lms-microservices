import React from "react";
import { FaEye, FaDownload } from "react-icons/fa";

const Resources = ({ lectureNotes, lectureVideos }) => {
  const handleNotesView = (lectureNotes) => {
    const path = `Viewing PDF: ${lectureNotes}`;

    console.log(path);
  };

  const handleNotesDownload = (resource, type) => {
    // Handle download action
    if (type === "pdf") {
      console.log(`Downloading PDF: ${resource}`);
      // Implement logic to download PDF
    } else if (type === "video") {
      console.log(`Downloading video: ${resource}`);
      // Implement logic to download video
    }
  };

  return (
    <div className="p-8 mt-4 bg-white rounded-lg shadow-xl">
      <h2 className="mb-4 text-lg font-semibold">Resources</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row flex-grow gap-1 text-center">
          <div className="flex flex-col">
            <div className="flex flex-row ">
              <p className="mr-2 text-gray-700">Lecture Notes</p>
              {lectureNotes && (
                <a
                  href={`http://localhost:4003/${lectureNotes.replace(
                    "\\",
                    "/"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View PDF
                </a>
              )}
            </div>
            <div className="flex flex-row ">
              <p className="mr-2 text-gray-700">Lecture Notes</p>
              {lectureVideos && (
                <a
                  href={`http://localhost:4003/${lectureVideos.replace(
                    "\\",
                    "/"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Video
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-grow gap-1 text-center">
          {/* <p className="text-gray-700">Lecture Videos</p> */}
          {/* <FaEye className="ml-4 mr-2 text-blue-500 cursor-pointer" />
          <FaDownload className="mr-2 text-green-500 cursor-pointer" /> */}
        </div>
      </div>
    </div>
  );
};

export default Resources;
