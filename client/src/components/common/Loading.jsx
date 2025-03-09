import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full min-h-[70vh] flex flex-col gap-4 items-center justify-center ">
      <div className="animate-spin">
        <Loader2 className="w-16 h-16" />
      </div>
      <p className="text-gray-500 text-lg font-medium">Loading, please wait...</p>
    </div>
  );
};

export default Loading;
