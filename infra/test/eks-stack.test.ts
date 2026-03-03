import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { NetworkStack } from '../lib/network-stack';
import { EcrStack } from '../lib/ecr-stack';
import { EksStack } from '../lib/eks-stack';

test('EKS Cluster Custom Resource Exists', () => {
  const app = new cdk.App();

  const testEnv = { account: '111111111111', region: 'us-east-1' };

  const network = new NetworkStack(app, 'TestNetworkStack', { env: testEnv });
  const ecr = new EcrStack(app, 'TestEcrStack', { env: testEnv });

  const eksStack = new EksStack(app, 'TestEksStack', {
    env: testEnv,
    vpc: network.vpc,
    repository: ecr.repository,
    clusterName: 'test-cluster',
  });

  const template = Template.fromStack(eksStack);

  // Check that a Custom Resource for EKS exists
  template.resourceCountIs('Custom::AWSCDK-EKS-Cluster', 1);
});