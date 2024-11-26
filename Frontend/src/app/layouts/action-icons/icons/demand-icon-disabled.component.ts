import { Component } from '@angular/core';

@Component({
  selector: 'demand-icon-disabled',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
    >
      <path
        d="M0 0V4H4L12 20V28H16V20L24 4H28V0H0Z"
        fill="#6C6B6B"
      />
    </svg>
  `,
})
export class DemandIconComponentDisabled {
  constructor() {}
}
