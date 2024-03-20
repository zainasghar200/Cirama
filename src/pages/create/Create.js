import FileInput from "../../component/file-input/FileInput";

export default function Create() {
  return (
    <div className="w-full min-h-[100vh] bg-[#163545] px-5 md:px-10 lg:px-20">
      <div className="pt-10 pb-10 lg:pt-20 lg:pb-10 flex flex-row justify-between items-center">
        <div className="text-xl md:text-3xl lg:text-5xl font-medium text-white">
          Create a new movie
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="w-full md:w-1/2 lg:w-1/2">
          <FileInput />
        </div>
        <div className="w-full md:ml-10 md:w-1/2 lg:w-1/2">
          <div className="md:w-[312px] lg:w-[362px] flex flex-col justify-center item-center gap-4">
            <input
              className="w-full bg-[#224957] p-2 rounded-md text-sm md:text-base"
              placeholder="Title"
            />
            <input
              className="w-[70%] bg-[#224957] p-2 rounded-md text-sm md:text-base"
              placeholder="Publishing year"
            />
            <div className="flex flex-col mt-5 lg:mt-10 md:flex-row gap-2">
              <button className="w-full md:w-1/2 bg-transparent border border-white p-2 rounded-md text-white text-center hover:bg-white hover:text-[#66D17F] transition duration-300">
                Cancel
              </button>
              <button className="w-full md:w-1/2 bg-[#66D17F] p-2 rounded-md text-white text-center hover:bg-white hover:text-[#66D17F] transition duration-300">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
