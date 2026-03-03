#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib/core';
import { NetworkStack } from '../lib/network-stack';
import { EcrStack } from '../lib/ecr-stack';

const app = new cdk.App();

const networkStack = new NetworkStack(app, 'NetworkStack');
const ecrStack = new EcrStack(app, 'EcrStack');