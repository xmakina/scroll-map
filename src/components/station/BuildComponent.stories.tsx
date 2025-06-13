import { Meta, StoryObj } from "@storybook/react";
import BuildComponent from "./BuildComponent";
import { StationComponentType } from "@prisma/client";

const meta: Meta<typeof BuildComponent> = {
  component: BuildComponent,
};

export default meta;
type Story = StoryObj<typeof BuildComponent>;

export const BuildComponentHasRequiredCargo: Story = {
  args: {
    onBuildComponent: () => {},
    level: 1,
    componentType: StationComponentType.SMELTER,
    cargoHold: {
      id: "",
      data: {},
      CargoContainers: [
        {
          id: "",
          type: "ORE",
          data: null,
          amount: 1000,
          cargoHoldId: "",
        },
        {
          id: "",
          type: "ICE",
          amount: 500,
          data: null,
          cargoHoldId: "",
        },
      ],
    },
  },
};

export const BuildComponentHasInsufficientButPresentCargo: Story = {
  args: {
    onBuildComponent: () => {},
    level: 1,
    componentType: StationComponentType.SMELTER,
    cargoHold: {
      id: "",
      data: {},
      CargoContainers: [
        {
          id: "",
          type: "ORE",
          data: null,
          amount: 999,
          cargoHoldId: "",
        },
        {
          id: "",
          type: "ICE",
          amount: 499,
          data: null,
          cargoHoldId: "",
        },
      ],
    },
  },
};

export const BuildComponentHasMissingCargo: Story = {
  args: {
    onBuildComponent: () => {},
    level: 1,
    componentType: StationComponentType.SMELTER,
    stationComponents: [],
    cargoHold: {
      id: "",
      data: {},
      CargoContainers: [
        {
          id: "",
          type: "ORE",
          data: null,
          amount: 1000,
          cargoHoldId: "",
        },
      ],
    },
  },
};

export const BuildComponentCanAffordAndHasPrerequisite: Story = {
  args: {
    onBuildComponent: () => {},
    level: 2,
    componentType: StationComponentType.SMELTER,
    stationComponents: [
      {
        id: "",
        type: "SMELTER",
        data: { level: 1 },
        stationId: null,
      },
    ],
    cargoHold: {
      id: "",
      data: {},
      CargoContainers: [
        {
          id: "",
          type: "ALLOY",
          data: null,
          amount: 1000,
          cargoHoldId: "",
        },
      ],
    },
  },
};
