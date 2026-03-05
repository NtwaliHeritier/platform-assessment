# CDK

## Prerequisites & CDK Bootstrap (Local Setup)

This project can be synthesized and tested entirely locally. 
To get started:

### Prerequisites

1. **Node.js & npm**
   - Install Node.js ≥ 18 and npm
   ```bash
   node -v
   npm -v
   ```
2. **AWS CDK CLI**
    - Install globally
    ```bash
    npm install -g aws-cdk
    ```
    - Verify installation
    ```bash
    cdk --version
    ```
3. Project dependencies
    - Install dependencies in the project root:
    ```bash
    npm install
    ```
4. Environment variables / CDK context
    - Some stacks (like EKS) require account and region in props.env even for local synth/tests.
    - For local testing, you can use dummy values in your test files, e.g.:
    ```bash
    const testEnv = { account: '123456789012', region: 'us-east-1' };
    ```

### CDK Bootstrap (Local)
- You do not need to bootstrap AWS since all stacks will be synthesized and tested locally.
- To generate CloudFormation templates without deploying:
```bash
cdk synth
```
- You can check the output templates in cdk.out
- To run unit tests:
```bash
npm test
```