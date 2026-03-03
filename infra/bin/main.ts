import * as cdk from 'aws-cdk-lib';
import { NetworkStack } from '../lib/network-stack';
import { EcrStack } from '../lib/ecr-stack';
import { EksStack } from '../lib/eks-stack';

const app = new cdk.App();

const env = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const clusterName = app.node.tryGetContext('clusterName') || process.env.EKS_CLUSTER_NAME;
const repositoryName = app.node.tryGetContext('repositoryName') || process.env.ECR_REPOSITORY_NAME;

const networkStack = new NetworkStack(app, 'NetworkStack', { env });
const ecrStack = new EcrStack(app, 'EcrStack', { env, repositoryName });

new EksStack(app, 'EksStack', {
  env,
  vpc: networkStack.vpc,
  repository: ecrStack.repository,
  clusterName,
});