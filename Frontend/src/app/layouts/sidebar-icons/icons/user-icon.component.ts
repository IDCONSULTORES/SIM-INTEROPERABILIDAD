import { Component } from '@angular/core';

@Component({
  selector: 'user-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="21"
      viewBox="0 0 16 21"
      fill="none"
    >
      <path
        d="M16 17.2989V18.5678C16 18.8877 15.9387 19.2044 15.8197 19.4998C15.7007 19.7952 15.5264 20.0636 15.3066 20.2895C15.0867 20.5154 14.8258 20.6945 14.5388 20.8164C14.2517 20.9383 13.9441 21.0007 13.6336 21H2.36126C2.05074 21 1.74328 20.9369 1.45646 20.8144C1.16965 20.6918 0.909121 20.5122 0.689792 20.2858C0.470464 20.0594 0.296644 19.7906 0.178283 19.4949C0.059922 19.1992 -0.000655 18.8824 2.00307e-05 18.5626V17.2989C-0.00233968 16.2177 0.203813 15.1469 0.606511 14.1485C1.00921 13.1501 1.60043 12.244 2.34586 11.4829L2.39205 11.4353C2.46389 11.3541 2.54107 11.2782 2.62304 11.2079C2.75323 11.0781 2.89217 10.958 3.03883 10.8484C3.12889 10.7652 3.22499 10.6892 3.32628 10.621L3.45461 10.5206L3.87039 10.2456C4.00899 10.1558 4.15271 10.0764 4.29644 9.99714L4.4761 9.89668C4.62496 9.81737 4.77382 9.74864 4.92782 9.6799C4.24132 9.19102 3.67849 8.53988 3.28644 7.78098C2.89438 7.02207 2.68451 6.17748 2.67438 5.31788C2.71734 3.8925 3.29727 2.54031 4.29132 1.5477C5.28538 0.555087 6.6155 0 7.99999 0C9.38448 0 10.7146 0.555087 11.7087 1.5477C12.7027 2.54031 13.2826 3.8925 13.3256 5.31788C13.3155 6.17748 13.1056 7.02207 12.7135 7.78098C12.3215 8.53988 11.7587 9.19102 11.0722 9.6799C11.2262 9.74864 11.375 9.81737 11.5239 9.89668C11.5788 9.91879 11.6321 9.94531 11.683 9.97599C11.7959 10.0394 11.9037 10.0976 12.0115 10.1663C12.1703 10.2569 12.3245 10.3557 12.4735 10.4624L12.7353 10.6528C12.7691 10.6731 12.8002 10.698 12.8277 10.7268C13.1167 10.9549 13.3911 11.2022 13.649 11.467C14.397 12.2298 14.99 13.1382 15.3937 14.1395C15.7973 15.1408 16.0034 16.2148 16 17.2989Z"
        fill="var(--icon-color)"
      />
    </svg>
  `,
})
export class UserIconComponent {
  constructor() {}
}