"use client";

import { Loader } from "@/_components/ui/loader";
import { useIsMobile } from "../../../shop/_hooks/useIsMobile";

const Loading = () => {
  const isMobile = useIsMobile()
  return (
     <div className="flex h-[100vh] w-[100%] items-center justify-center">
      <div className={`${isMobile && "pb-[200px] lg:pb-0"}`}>
        <Loader />
      </div>
    </div>
  );
}

export default Loading;
