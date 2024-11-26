import { Component } from '@angular/core';

@Component({
  selector: 'check-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="28"
      viewBox="0 0 36 28"
      fill="none"
    >
      <path
        d="M32.7962 0.491172L35.5107 3.21319C36.1631 3.86735 36.1631 4.92542 35.5107 5.57959L13.6415 27.5094C12.9891 28.1635 11.934 28.1635 11.2816 27.5094L0.489267 16.6872C-0.163089 16.033 -0.163089 14.9749 0.489267 14.3208L3.20377 11.5988C3.85613 10.9446 4.91128 10.9446 5.56364 11.5988L12.4593 18.5136L30.4364 0.486781C31.0887 -0.16299 32.1439 -0.16299 32.7962 0.491172Z"
        fill="var(--primary-color)"
      />
    </svg>
  `,
})
export class CheckIconComponent {
  constructor() {}
}
