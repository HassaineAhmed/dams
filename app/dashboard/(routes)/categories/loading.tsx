"use client";

import { Loader } from "@/_components/ui/loader";

const Loading = () => {
  return (
    <div className="flex h-[100vh]  w-[100%] items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
