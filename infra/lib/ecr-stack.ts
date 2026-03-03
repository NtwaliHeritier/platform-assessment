import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';

interface EcrStackProps extends cdk.StackProps {
  repositoryName?: string;
}

export class EcrStack extends cdk.Stack {
  public readonly repository: ecr.Repository;

  constructor(scope: Construct, id: string, props?: EcrStackProps) {
    super(scope, id, props);

    const repositoryName =
      props?.repositoryName ||
      this.node.tryGetContext('repositoryName') ||
      process.env.ECR_REPOSITORY_NAME ||
      'app-repository';

    this.repository = new ecr.Repository(this, 'AppRepository', {
      repositoryName,
      imageScanOnPush: true,
      removalPolicy: cdk.RemovalPolicy.RETAIN,
    });
  }
}