import * as cdk from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as kubectl from '@aws-cdk/lambda-layer-kubectl-v29';

interface EksStackProps extends cdk.StackProps {
  vpc: ec2.Vpc;
  repository: ecr.Repository;
  clusterName?: string; // from context/env
}

export class EksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EksStackProps) {
    super(scope, id, props);

    const clusterName =
      props.clusterName ||
      this.node.tryGetContext('clusterName') ||
      process.env.EKS_CLUSTER_NAME ||
      'my-eks-cluster';

    const cluster = new eks.Cluster(this, 'EksCluster', {
      clusterName,
      version: eks.KubernetesVersion.V1_29,
      vpc: props.vpc,
      vpcSubnets: [
        {
          subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        },
      ],
      defaultCapacity: 0,
      kubectlLayer: new kubectl.KubectlV29Layer(this, 'KubectlLayer'),
    });

    const nodeRole = new iam.Role(this, 'EksNodeRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
    });

    nodeRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSWorkerNodePolicy')
    );
    nodeRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName(
        'AmazonEC2ContainerRegistryReadOnly'
      )
    );
    nodeRole.addManagedPolicy(
      iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonEKS_CNI_Policy')
    );

    cluster.addNodegroupCapacity('ManagedNodeGroup', {
      nodegroupName: 'private-nodes',
      instanceTypes: [new ec2.InstanceType('t3.medium')],
      minSize: 2,
      maxSize: 4,
      desiredSize: 2,
      subnets: {
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
      },
      nodeRole,
    });
  }
}