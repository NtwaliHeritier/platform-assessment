import * as cdk from 'aws-cdk-lib/core';
import { Template } from 'aws-cdk-lib/assertions';
import { EcrStack } from '../lib/ecr-stack';

test('ECR repository created with scan on push', () => {
  const app = new cdk.App();
  const stack = new EcrStack(app, 'TestEcrStack');

  const template = Template.fromStack(stack);

  template.hasResourceProperties('AWS::ECR::Repository', {
    RepositoryName: 'app-repository',
    ImageScanningConfiguration: {
      ScanOnPush: true,
    },
  });
});