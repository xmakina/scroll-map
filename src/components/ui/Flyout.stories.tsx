import type { Meta, StoryObj } from "@storybook/nextjs";
import { within } from "storybook/test";
import { expect } from "@storybook/jest";

import Flyout from "./Flyout";

const meta: Meta<typeof Flyout> = {
  component: Flyout,
};

export default meta;
type Story = StoryObj<typeof Flyout>;

const contents = (
  <ul>
    <li>Hello</li>
    <li>World</li>
    <li>Hello</li>
    <li>World</li>
    <li>Hello</li>
    <li>World</li>
    <li>Hello</li>
    <li>World</li>
  </ul>
);

export const WhenClosed: Story = {
  args: {
    isOpen: false,
    children: contents,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText("Hello");
    expect(message).not.toBeVisible();

    const menuButton = canvas.queryByText("Menu");
    expect(menuButton).toBeVisible();
  },
};

export const WhenOpen: Story = {
  args: {
    isOpen: true,
    children: contents,
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const message = canvas.queryByText("Hello");
    expect(message).toBeVisible();

    const menuButton = canvas.queryByText("Menu");
    expect(menuButton).toBeVisible();
  },
};
