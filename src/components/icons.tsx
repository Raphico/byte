import {
  Calendar,
  Check,
  ChevronLeft,
  CircleEllipsis,
  CircleHelp,
  Clock,
  Copy,
  EllipsisVertical,
  LayoutDashboard,
  Loader2,
  LogOut,
  MoveRight,
  PackageOpen,
  Pen,
  Plus,
  RotateCcw,
  Trash2,
  TriangleAlert,
  UsersRound,
  Video,
  Watch,
  X,
  type LucideProps,
} from "lucide-react"

export const Icons = {
  users: UsersRound,
  close: X,
  trash: Trash2,
  pen: Pen,
  watch: Watch,
  clock: Clock,
  more: EllipsisVertical,
  help: CircleHelp,
  calendar: Calendar,
  spinner: Loader2,
  copy: Copy,
  check: Check,
  video: Video,
  plus: Plus,
  circleEllipsis: CircleEllipsis,
  empty: PackageOpen,
  menu: LayoutDashboard,
  logOut: LogOut,
  arrowRight: MoveRight,
  chevronLeft: ChevronLeft,
  refresh: RotateCcw,
  warning: TriangleAlert,
  logo: ({ ...props }: LucideProps) => (
    <svg
      viewBox="0 0 61 59"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M52.406 42.002C50.816 42.01 49.33 42.46 48.068 43.234L48.104 43.214L42.716 38.316C44.164 36.106 45.024 33.398 45.024 30.49C45.024 27.346 44.018 24.436 42.308 22.066L42.338 22.108L48.462 15.984C49.602 16.616 50.96 16.99 52.404 17H52.408C57.102 17 60.908 13.194 60.908 8.5C60.908 3.806 57.102 0 52.408 0C47.714 0 43.908 3.806 43.908 8.5C43.918 9.948 44.294 11.306 44.946 12.49L44.924 12.446L38.8 18.57C36.506 16.89 33.626 15.882 30.512 15.882C28.776 15.882 27.114 16.196 25.578 16.768L25.676 16.736L24.388 14.396C25.84 12.882 26.734 10.822 26.734 8.554C26.734 3.89 22.952 0.108 18.288 0.108C13.624 0.108 9.842 3.89 9.842 8.554C9.842 13.218 13.624 17 18.288 17C18.9 17 19.498 16.934 20.074 16.81L20.018 16.82L21.302 19.152C17.932 21.782 15.786 25.842 15.786 30.406C15.786 31.616 15.938 32.792 16.222 33.914L16.2 33.816L14.866 34.382C13.306 32.574 11.012 31.434 8.452 31.434C3.784 31.434 0 35.218 0 39.886C0 44.554 3.784 48.338 8.452 48.338C13.12 48.338 16.904 44.554 16.904 39.886C16.904 39.87 16.904 39.852 16.904 39.836C16.888 39.518 16.858 39.224 16.812 38.936L16.818 38.984L18.152 38.418C20.758 42.47 25.246 45.116 30.352 45.116C33.758 45.116 36.888 43.938 39.358 41.968L39.328 41.99L44.732 46.9C44.216 47.952 43.912 49.188 43.904 50.494C43.904 55.188 47.71 58.996 52.404 58.996C57.098 58.996 60.904 55.19 60.904 50.496C60.904 45.802 57.098 41.996 52.404 41.996L52.406 42.002ZM14.786 8.502C14.786 6.57 16.354 5.002 18.286 5.002C20.218 5.002 21.786 6.57 21.786 8.502C21.786 10.434 20.218 12.002 18.286 12.002C16.354 12 14.788 10.434 14.786 8.502ZM8.406 43.342C6.474 43.34 4.91 41.776 4.91 39.844C4.91 37.912 6.476 36.346 8.408 36.346C10.34 36.346 11.904 37.91 11.906 39.842C11.904 41.774 10.338 43.34 8.406 43.342ZM52.406 5.002C54.338 5.002 55.906 6.57 55.906 8.502C55.906 10.434 54.338 12.002 52.406 12.002C50.474 12.002 48.906 10.434 48.906 8.502C48.908 6.57 50.474 5.004 52.406 5.002ZM20.786 30.502C20.786 30.5 20.786 30.498 20.786 30.496C20.786 25.186 25.09 20.882 30.4 20.882C33.056 20.882 35.46 21.96 37.2 23.7L37.202 23.702L37.204 23.704C38.944 25.444 40.018 27.848 40.018 30.502C40.018 35.814 35.712 40.118 30.402 40.118C25.092 40.118 20.786 35.812 20.786 30.502ZM52.406 54.002C50.474 54.002 48.906 52.434 48.906 50.502C48.906 48.57 50.474 47.002 52.406 47.002C54.338 47.002 55.906 48.57 55.906 50.502C55.904 52.434 54.338 54 52.406 54.002Z"
        fill="currentColor"
      />
    </svg>
  ),
  github: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 496 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      ></path>
    </svg>
  ),
}
