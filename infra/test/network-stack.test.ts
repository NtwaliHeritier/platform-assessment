import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { NetworkStack } from '../lib/network-stack';

test('VPC Created', () => {
  const app = new cdk.App();
  const stack = new NetworkStack(app, 'TestNetworkStack');

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::EC2::VPC', 1);
});

test('Has 2 public subnets', () => {
  const app = new cdk.App();
  const stack = new NetworkStack(app, 'TestNetworkStack');

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::EC2::Subnet', 4);
});