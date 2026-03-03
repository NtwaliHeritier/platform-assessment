#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { NetworkStack } from '../lib/network-stack';
import { EcrStack } from '../lib/ecr-stack';
import { EksStack } from '../lib/eks-stack';

const app = new cdk.App();

const networkStack = new NetworkStack(app, 'NetworkStack');
const ecrStack = new EcrStack(app, 'EcrStack');
new EksStack(app, 'EksStack', {
  vpc: networkStack.vpc,
  repository: ecrStack.repository,
});