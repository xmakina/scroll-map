import type { Meta, StoryObj } from "@storybook/react";
import { within } from "@storybook/test";
import { expect } from "@storybook/jest";

import Busy from "./Busy";

const meta: Meta<typeof Busy> = {
  component: Busy,
};

export default meta;
type Story = StoryObj<typeof Busy>;

const Message = "hello";

export const WhenBusy: Story = {
  args: {
    isBusy: true,
    children: Message,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText(Message);
    expect(message).not.toBeVisible();
  },
};

export const WhenIdle: Story = {
  args: {
    isBusy: false,
    children: Message,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText(Message);
    expect(message).toBeVisible();
  },
};
