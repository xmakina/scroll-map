import React from "react";
import ComponentDetails from "./ComponentDetails";
import BorderedBox from "../ui/BorderedBox";
import { JsonValue } from "@prisma/client/runtime/library";
import ComponentType from "@/models/ComponentType";

type Component = {
  type: ComponentType;
  data: JsonValue;
};

type Props = {
  title: string;
  components: Component[];
};

const ComponentList = ({ title, components }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <BorderedBox title={title}>
        <div className="flex flex-row gap-4">
          {components.map((c) => (
            <ComponentDetails key={c.type} type={c.type} data={c.data} />
          ))}
        </div>
      </BorderedBox>
    </div>
  );
};

export default ComponentList;
