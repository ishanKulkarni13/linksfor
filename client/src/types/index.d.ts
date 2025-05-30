// Centralized type declarations for your project
// Place global types, module declarations, and ambient types here

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const value: string;
  export default value;
}

// Add more global/ambient types as your project grows
