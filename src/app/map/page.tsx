import React from "react";
import Map from "@/components/Map";

function Page() {
  return (
    <div className="bg-white-700 mx-auto my-5 w-[98%] h-[480px]">
      <Map posix={[4.79029, -75.69003]} />
    </div>
  );
}

export default Page;
