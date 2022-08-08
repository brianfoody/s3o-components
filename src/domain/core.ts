// @ts-ignore
import lambdaIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_AWS-Lambda_64.svg";
// @ts-ignore
import dynamoIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg";

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
  infer ElementType
>
  ? ElementType
  : never;

interface ComponentDefinition {
  name: string;
  type: string;
  icon?: any;
}

export const components = [
  {
    name: "DynamoDB stream poller",
    type: "dynamoDbWatcher",
    icon: dynamoIcon,
  } as ComponentDefinition,
  {
    name: "Lambda monitor",
    type: "lambdaWatcher",
    icon: lambdaIcon,
  } as ComponentDefinition,
  {
    name: "Box",
    type: "box",
  } as ComponentDefinition,
];

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
