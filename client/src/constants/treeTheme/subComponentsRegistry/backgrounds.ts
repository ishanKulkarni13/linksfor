export const backgroundRegistry = {
  'solid-color': {
    name: 'Solid Color',
    load: async () => (await import('@/components/backgrounds/SolidColor')).SolidColorBackground,
    customizableProps: [
      { key: 'color', label: 'Color', type: 'color', default: '#000000' },
    ]
  },
  'gradient': {
    name: 'Gradient',
    load: async () => (await import('@/components/backgrounds/Gradient')).GradientBackground,
    customizableProps: [
      { key: 'colorStart', label: 'Start Color', type: 'color', default: '#000000' },
      { key: 'colorEnd', label: 'End Color', type: 'color', default: '#ffffff' },
      { key: 'direction', label: 'Direction', type: 'select', options: ['to right', 'to bottom'], default: 'to right' }
    ]
  },
  'animated-cars-aura': {
    name: 'Animated Cars Aura',
    load: async () => (await import('@/components/backgrounds/AnimatedCarsAura')).AnimatedCarsAura,
    customizableProps: [
      { key: 'speed', label: 'Speed', type: 'number', default: 1 },
      { key: 'color', label: 'Aura Color', type: 'color', default: '#ff00ff' }
    ]
  }
}
