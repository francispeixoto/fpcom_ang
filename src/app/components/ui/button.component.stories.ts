import type { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  title: 'UI/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'The visual style of the button'
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the button'
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled'
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the button should take full width'
    }
  },
  render: (args) => ({
    props: args,
    template: `<app-button [variant]="variant" [size]="size" [disabled]="disabled" [fullWidth]="fullWidth">Button Text</app-button>`,
  }),
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'md',
    disabled: false,
    fullWidth: false
  },
};

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    size: 'md',
    disabled: false,
    fullWidth: false
  },
};

export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    disabled: false,
    fullWidth: false
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    disabled: false,
    fullWidth: false
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: true,
    fullWidth: false
  },
};

export const FullWidth: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: true
  },
};
