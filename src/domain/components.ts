// @ts-ignore
import lambdaIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Compute/64/Arch_AWS-Lambda_64.svg";
// @ts-ignore
import dynamoIcon from "aws-svg-icons/lib/Architecture-Service-Icons_07302021/Arch_Database/64/Arch_Amazon-DynamoDB_64.svg";

interface ComponentDefinition {
  name: string; // need to type
  type: string; // need to type
  icon?: any;
}

export const DynamoWatcherComponent = {
  name: "DynamoDB stream poller",
  type: "dynamoDbWatcher",
  icon: dynamoIcon,
} as ComponentDefinition;

export const LambdaWatcherComponent = {
  name: "Lambda monitor",
  type: "lambdaWatcher",
  icon: lambdaIcon,
} as ComponentDefinition;

export const Box = {
  name: "Box",
  type: "box",
} as ComponentDefinition;

export const components = [DynamoWatcherComponent, LambdaWatcherComponent, Box];
