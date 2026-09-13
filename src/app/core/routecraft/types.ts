export interface RouteNode {
  name: string;
  route?: string;
  icon?: string;
  auth?: [string, number];
  authModule?: string;
  useLayout?: boolean;
  menuRoute?: boolean;
  isPublic?: boolean;
  component?: () => Promise<unknown>;
  sub?: RouteNode[];
}

export interface MenuNode {
  name: string;
  path: string;
  icon?: string;
  children?: MenuNode[];
}