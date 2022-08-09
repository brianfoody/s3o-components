import { components } from "./components";

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

export interface ComponentStatus {
  playing: boolean;
  authorisation: "authorized" | "expired";
  network?: "connected" | "disconnected";
}
export interface Component {
  id: string;
  def: ElementType<typeof components>;
  location: number[];
  size: number[];
  lastLocation: number[];
  props?: any;
}

export interface AwsComponent<T> extends Component {
  config: {
    accountId?: string;
    ssoUrl?: string;
    region?: string;
    permissionSet?: string;
  };
  props: T;
}
