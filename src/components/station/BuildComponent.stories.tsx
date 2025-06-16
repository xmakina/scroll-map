import { Meta, StoryObj } from "@storybook/react";
import BuildComponent from "./BuildComponent";
import { StationComponent, StationComponentType } from "@prisma/client";
import { withReactContext } from "storybook-react-context";
import StationContext from "@/StationContext";
import { CargoHoldWithContainers } from "@/models/CargoHoldWithContainers";

const meta: Meta<typeof BuildComponent> = {
  component: BuildComponent,
  decorators: [withReactContext],
};

export default meta;
type Story = StoryObj<typeof BuildComponent>;

function AddStationContext(
  cargoHold?: CargoHoldWithContainers,
  components?: StationComponent[]
) {
  return {
    reactContext: {
      context: StationContext,
      contextValue: {
        station: {
          CargoHold: cargoHold,
          Components: components,
        },
      },
    },
  };
}

export const BuildComponentHasRequiredCargo: Story = {
  args: {
    onBuildComponent: () => {},
    level: 1,
    componentType: StationComponentType.SMELTER,
  },
  parameters: {
    ...AddStationContext({
      id: "",
      data: {},
      CargoContainers: [
        { id: "", type: "ORE", data: null, amount: 1000, cargoHoldId: "" },
        { id: "", type: "ICE", amount: 500, data: null, cargoHoldId: "" },
      ],
    }),
  },
};

export const BuildComponentHasInsufficientButPresentCargo: Story = {
  args: {
    onBuildComponent: () => {},
    level: 1,
    componentType: StationComponentType.SMELTER,
  },
  parameters: {
    ...AddStationContext({
      id: "",
      data: {},
      CargoContainers: [
        { id: "", type: "ORE", data: null, amount: 999, cargoHoldId: "" },
        { id: "", type: "ICE", amount: 499, data: null, cargoHoldId: "" },
      ],
    }),
  },
};

export const BuildComponentHasMissingCargo: Story = {
  parameters: {
    ...AddStationContext({
      id: "",
      data: {},
      CargoContainers: [
        { id: "", type: "ORE", data: null, amount: 1000, cargoHoldId: "" },
      ],
    }),
  },
  args: {
    onBuildComponent: () => {},
    level: 1,
    componentType: StationComponentType.SMELTER,
  },
};

export const BuildComponentCanAffordAndHasPrerequisite: Story = {
  parameters: {
    ...AddStationContext(
      {
        id: "",
        data: {},
        CargoContainers: [
          { id: "", type: "ALLOY", data: null, amount: 1000, cargoHoldId: "" },
        ],
      },
      [{ id: "", type: "SMELTER", data: { level: 1 }, stationId: null }]
    ),
  },
  args: {
    onBuildComponent: () => {},
    level: 2,
    componentType: StationComponentType.SMELTER,
  },
};
