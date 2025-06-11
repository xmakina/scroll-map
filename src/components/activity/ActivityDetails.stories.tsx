import { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import { expect } from "@storybook/jest";
import ActivityDetails from "./ActivityDetails";

const meta: Meta<typeof ActivityDetails> = {
  component: ActivityDetails,
};

export default meta;
type Story = StoryObj<typeof ActivityDetails>;

export const ActivityDetailsTenSecondsRemaining: Story = {
  args: {
    activity: {
      id: "",
      type: "MINE",
      data: null,
      endTime: new Date(Date.now() + 10 * 1000),
      activityWorkerId: "",
    },
    onClaim: () => {},
  },
};

export const ActivityDetailsOneMinuteRemaining: Story = {
  args: {
    activity: {
      id: "",
      type: "MINE",
      data: null,
      endTime: new Date(Date.now() + 62 * 1000),
      activityWorkerId: "",
    },
    onClaim: () => {},
  },
};

export const ActivityDetailsTenMinutesRemaining: Story = {
  args: {
    activity: {
      id: "",
      type: "MINE",
      data: null,
      endTime: new Date(Date.now() + 60 * 10000),
      activityWorkerId: "",
    },
    onClaim: () => {},
  },
};

export const CompletedActivity: Story = {
  args: {
    activity: {
      id: "",
      type: "MINE",
      data: null,
      endTime: new Date(Date.now() - 10),
      activityWorkerId: "",
    },
    onClaim: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const warningText = canvas.getByText("Claim");
    expect(warningText).not.toBeNull();
  },
};
