export interface ComponentStatus {
  playing: boolean;
  authorisation: "authorized" | "expired";
  network?: "connected" | "disconnected";
}
export interface Component {
  id: string;
  type: "dynamoDbWatcher" | "lambdaWatcher" | "box";
  location: number[];
  size: number[];
  lastLocation: number[];
  props: any;
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
