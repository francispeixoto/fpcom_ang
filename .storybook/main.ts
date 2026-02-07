export default {
  stories: ['../src/**/*.stories.@(ts|mdx)', '../projects/ui/src/**/*.stories.@(ts|mdx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/angular',
    options: {}
  },
  core: {
    builder: '@storybook/builder-webpack5'
  },
  typescript: {
    check: false
  }
};
