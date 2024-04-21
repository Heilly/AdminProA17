import { Meta, StoryObj } from '@storybook/angular';

import { AboutmeComponent } from './aboutme.component';

type ComponentWithCustomControls = AboutmeComponent;

const meta: Meta<ComponentWithCustomControls> = {
  // title: 'Components/Aboutme',
  component: AboutmeComponent,
  // decorators: [moduleMetadata({imports: []})],
  parameters: {
    docs: { description: { component: `Aboutme` } },
  },
  argTypes: {},
  args: {},
};
export default meta;

export const Aboutme: StoryObj<ComponentWithCustomControls> = {
  render: (args: ComponentWithCustomControls) => ({ props: args }),
  args: {},
}
