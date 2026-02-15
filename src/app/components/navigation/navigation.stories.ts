import type { Meta, StoryObj } from '@storybook/angular';
import { NavigationComponent } from './navigation';
import { moduleMetadata } from '@storybook/angular';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faPrint } from '@fortawesome/free-solid-svg-icons';
import { ButtonComponent } from '../ui/button.component';

const meta: Meta<NavigationComponent> = {
  title: 'Components/Navigation',
  component: NavigationComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FontAwesomeModule, ButtonComponent],
      providers: [
        {
          provide: FaIconLibrary,
          useFactory: () => {
            const library = new FaIconLibrary();
            library.addIcons(faPrint);
            return library;
          }
        }
      ]
    }),
  ],
  argTypes: {
    title: {
      control: 'text',
      description: 'The title displayed in the navigation'
    },
    showPrintButton: {
      control: 'boolean',
      description: 'Whether to show the print button'
    }
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<NavigationComponent>;

export const Default: Story = {
  args: {
    title: 'Francis Peixoto',
    showPrintButton: true
  },
};

export const WithoutPrintButton: Story = {
  args: {
    title: 'Francis Peixoto',
    showPrintButton: false
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'My Custom CV',
    showPrintButton: true
  },
};
