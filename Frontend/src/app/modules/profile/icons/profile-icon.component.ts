import { Component } from '@angular/core';

@Component({
  selector: 'profile-icon',
  template: `
    <svg
      width="285"
      height="285"
      viewBox="0 0 285 285"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="142.5" cy="142.5" r="142.5" fill="var(--primary-color)" />
      <g clip-path="url(#clip0_9_6)">
        <path
          d="M142.498 131.422C165.936 131.422 184.937 112.3 184.937 88.7112C184.937 65.1224 165.936 46 142.498 46C119.06 46 100.059 65.1224 100.059 88.7112C100.059 112.3 119.06 131.422 142.498 131.422Z"
          fill="var(--white)"
        />
        <path
          d="M226.004 200.541C215.771 212.81 202.993 222.676 188.567 229.445C174.142 236.214 158.418 239.721 142.502 239.721C126.585 239.721 110.862 236.214 96.4362 229.445C82.0105 222.676 69.2325 212.81 59 200.541C70.5027 165.208 103.539 139.663 142.502 139.663C181.464 139.663 214.497 165.208 226.004 200.541Z"
          fill="var(--white)"
        />
      </g>
      <defs>
        <clipPath id="clip0_9_6">
          <rect
            width="167"
            height="193.72"
            fill="var(--white)"
            transform="translate(59 46)"
          />
        </clipPath>
      </defs>
    </svg>
  `,
})
export class ProfileIconComponent {
  constructor() {}
}
