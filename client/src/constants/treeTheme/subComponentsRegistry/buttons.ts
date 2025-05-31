export const buttonRegistry = {
  'solid': {
    name: 'Solid Button',
    load: async () => (await import('@/components/buttons/SolidButton')).SolidButton,
    customizableProps: [
      { key: 'color', label: 'Color', type: 'color', default: '#007bff' }
    ]
  },
  // Add more button styles as needed
};
