import { Component, input } from '@angular/core';
import {
  LucideActivity,
  LucideAlertTriangle,
  LucideArrowLeft,
  LucideAtSign,
  LucideBox,
  LucideBuilding2,
  LucideCheckCircle,
  LucideCheckCheck,
  LucideChevronRight,
  LucideClock,
  LucideEdit,
  LucideEye,
  LucideFileText,
  LucideFilter,
  LucideFlaskConical,
  LucideGrid,
  LucideHash,
  LucideHeartPulse,
  LucideHistory,
  LucideHome,
  LucideHospital,
  LucideInbox,
  LucideInfo,
  LucideKey,
  LucideKeyRound,
  LucideLock,
  LucideLogOut,
  LucideMail,
  LucideMessageCircle,
  LucideMicroscope,
  LucideMoon,
  LucidePencil,
  LucidePhone,
  LucideRefreshCcw,
  LucideRefreshCw,
  LucideSave,
  LucideSearch,
  LucideSearchX,
  LucideSettings,
  LucideShield,
  LucideShieldCheck,
  LucideStethoscope,
  LucideSun,
  LucideUser,
  LucideUserRoundKey,
  LucideUsers,
  LucideUsersRound,
  LucideX,
  LucideXCircle,
} from '@lucide/angular';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [
    LucideActivity, LucideAlertTriangle, LucideArrowLeft, LucideAtSign, LucideBox, LucideBuilding2,
    LucideCheckCircle, LucideCheckCheck, LucideChevronRight, LucideClock, LucideEdit, LucideEye,
    LucideFileText, LucideFilter, LucideFlaskConical, LucideGrid, LucideHash, LucideHeartPulse,
    LucideHistory, LucideHome, LucideHospital, LucideInbox, LucideInfo, LucideKey, LucideKeyRound,
    LucideLock, LucideLogOut, LucideMail, LucideMessageCircle, LucideMicroscope, LucideMoon,
    LucidePencil, LucidePhone, LucideRefreshCcw, LucideRefreshCw, LucideSave, LucideSearch,
    LucideSearchX, LucideSettings, LucideShield, LucideShieldCheck, LucideStethoscope, LucideSun,
    LucideUser, LucideUserRoundKey, LucideUsers, LucideUsersRound, LucideX, LucideXCircle,
  ],
  template: `
    <svg [style.width.px]="size()" [style.height.px]="size()" [style.color]="color()">
      @switch (name()) {
        @case ('Activity') { <svg [size]="size()" lucideActivity></svg> }
        @case ('AlertTriangle') { <svg [size]="size()" lucideAlertTriangle></svg> }
        @case ('ArrowLeft') { <svg [size]="size()" lucideArrowLeft></svg> }
        @case ('AtSign') { <svg [size]="size()" lucideAtSign></svg> }
        @case ('Box') { <svg [size]="size()" lucideBox></svg> }
        @case ('Building2') { <svg [size]="size()" lucideBuilding2></svg> }
        @case ('CheckCircle') { <svg [size]="size()" lucideCheckCircle></svg> }
        @case ('CheckCheck') { <svg [size]="size()" lucideCheckCheck></svg> }
        @case ('ChevronRight') { <svg [size]="size()" lucideChevronRight></svg> }
        @case ('Clock') { <svg [size]="size()" lucideClock></svg> }
        @case ('Edit') { <svg [size]="size()" lucideEdit></svg> }
        @case ('Eye') { <svg [size]="size()" lucideEye></svg> }
        @case ('FileText') { <svg [size]="size()" lucideFileText></svg> }
        @case ('Filter') { <svg [size]="size()" lucideFilter></svg> }
        @case ('FlaskConical') { <svg [size]="size()" lucideFlaskConical></svg> }
        @case ('Grid') { <svg [size]="size()" lucideGrid></svg> }
        @case ('Hash') { <svg [size]="size()" lucideHash></svg> }
        @case ('HeartPulse') { <svg [size]="size()" lucideHeartPulse></svg> }
        @case ('History') { <svg [size]="size()" lucideHistory></svg> }
        @case ('Home') { <svg [size]="size()" lucideHome></svg> }
        @case ('Hospital') { <svg [size]="size()" lucideHospital></svg> }
        @case ('Inbox') { <svg [size]="size()" lucideInbox></svg> }
        @case ('Info') { <svg [size]="size()" lucideInfo></svg> }
        @case ('Key') { <svg [size]="size()" lucideKey></svg> }
        @case ('KeyRound') { <svg [size]="size()" lucideKeyRound></svg> }
        @case ('Lock') { <svg [size]="size()" lucideLock></svg> }
        @case ('LogOut') { <svg [size]="size()" lucideLogOut></svg> }
        @case ('Mail') { <svg [size]="size()" lucideMail></svg> }
        @case ('MessageCircle') { <svg [size]="size()" lucideMessageCircle></svg> }
        @case ('Microscope') { <svg [size]="size()" lucideMicroscope></svg> }
        @case ('Moon') { <svg [size]="size()" lucideMoon></svg> }
        @case ('Pencil') { <svg [size]="size()" lucidePencil></svg> }
        @case ('Phone') { <svg [size]="size()" lucidePhone></svg> }
        @case ('RefreshCcw') { <svg [size]="size()" lucideRefreshCcw></svg> }
        @case ('RefreshCw') { <svg [size]="size()" lucideRefreshCw></svg> }
        @case ('Save') { <svg [size]="size()" lucideSave></svg> }
        @case ('Search') { <svg [size]="size()" lucideSearch></svg> }
        @case ('SearchX') { <svg [size]="size()" lucideSearchX></svg> }
        @case ('Settings') { <svg [size]="size()" lucideSettings></svg> }
        @case ('Shield') { <svg [size]="size()" lucideShield></svg> }
        @case ('ShieldCheck') { <svg [size]="size()" lucideShieldCheck></svg> }
        @case ('Stethoscope') { <svg [size]="size()" lucideStethoscope></svg> }
        @case ('Sun') { <svg [size]="size()" lucideSun></svg> }
        @case ('User') { <svg [size]="size()" lucideUser></svg> }
        @case ('UserRoundKey') { <svg [size]="size()" lucideUserRoundKey></svg> }
        @case ('Users') { <svg [size]="size()" lucideUsers></svg> }
        @case ('UsersRound') { <svg [size]="size()" lucideUsersRound></svg> }
        @case ('X') { <svg [size]="size()" lucideX></svg> }
        @case ('XCircle') { <svg [size]="size()" lucideXCircle></svg> }
      }
    </svg>
  `,
})
export class IconComponent {
  name = input('');
  size = input(20);
  color = input('currentColor');
}