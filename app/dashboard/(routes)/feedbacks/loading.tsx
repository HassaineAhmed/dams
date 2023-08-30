"use client";

import { Loader } from "@/_components/ui/loader";

const Loading = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center">
      <Loader />
    </div>
  );
}

export default Loading;
