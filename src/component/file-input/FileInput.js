import React from "react";

export default function FileInput() {
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    // Do something with the selected file, such as uploading or processing
    console.log("Selected file:", file);
  };

  return (
    <>
      <div className="md:w-[370px] md:h-[400px] lg:w-[470px] lg:h-[500px] rounded-lg bg-[#224957] flex flex-col justify-center items-center p-6 md:p-10">
        <label
          htmlFor="file-input"
          className="flex flex-col justify-center items-center"
        >
          <img
            src="./icons/drop-file.svg"
            className="w-6 h-6 md:w-8 md:h-8"
            alt="Drop file"
          />
          <div className="text-white mt-2">Drop your file here</div>
        </label>
        <input
          id="file-input"
          className="hidden"
          type="file"
          onChange={handleFileChange} // Call handleFileChange when a file is selected
        />
      </div>
    </>
  );
}
