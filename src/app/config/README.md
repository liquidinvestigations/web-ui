# Config wizard

The config UI is organized in steps, each step is described as a component that extends either the form-step-base.ts or the common-step-base.ts

The main component wizard.component.ts will go trough each of the steps in the order described by this module router.

The wizard.service.ts manages navigation, progress and other ui elements like the title or the next button.
