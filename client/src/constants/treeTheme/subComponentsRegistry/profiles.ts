export const profileRegistry = {
  'default': {
    name: 'Default Profile',
    load: async () => (await import('@/components/profiles/DefaultProfile')).DefaultProfile,
    customizableProps: [
      { key: 'showAvatar', label: 'Show Avatar', type: 'boolean', default: true }
    ]
  },
  // Add more profiles as needed
};
