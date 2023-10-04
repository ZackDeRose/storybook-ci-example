import type { Meta, StoryObj } from '@storybook/react';
import { Test } from './Test';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof Test> = {
  component: Test,
  title: 'Test',
};
export default meta;
type Story = StoryObj<typeof Test>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to Test!/gi)).toBeTruthy();
  },
};
