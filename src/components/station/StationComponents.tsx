import { StationComponent } from "@prisma/client";
import React from "react";
import ComponentDetails from "./ComponentDetails";

type Props = {
  components: StationComponent[];
};

const StationComponents = ({ components }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <div>Station Components</div>
      <div className="flex flex-row gap-4">
        {components.map((c) => (
          <ComponentDetails key={c.id} component={c} />
        ))}
      </div>
    </div>
  );
};

export default StationComponents;
