# DAE
I've modified this cognito-quick-start with a few improvements. Note that this was a quick copy-paste from an existing project where I made the changes, so we may need to clean this forked project up a bit. 

* Wrapped Callbacks with Observables
  * Why? rxjs observables are paramount to Angular. Angular tries to prevent callback-hell, and the tight coupling that results from it. 
* Added http-interceptor to pass authorization tokens 
  * Why? Services should not be aware of the auth layer. This further decouples the rest of the application from auth. 
* Don't use the `isLoggedIn` interface (I plan to remove it later). Instead, use the auth-guard and put it in your router
  * Why? Further decouples the rest of the application from authorization. Components should have no concept of users or whether someone is logged in. This decision should be made at the router level. 

If this project is used correctly, you should be able to clone it into an existing project, and only modify the `app-routing.module.ts` file to get it working initially. 


Cognito Quickstart
===================================================

## What does this app do?
![QuickStart Angular2 Cognito App](/aws/meta/Cognito-Angular2-QuickStart.png?raw=true)

## Tech Stack
### Required Tools
* [aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html)
* [eb cli](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
* [npm](https://www.npmjs.com/)
* [angular-cli](https://github.com/angular/angular-cli)

### Frameworks
* [AWS JavaScript SDK](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/browser-intro.html)
* [Angular 2](https://angular.io/docs/ts/latest/quickstart.html)
    * [TypeScript](https://www.typescriptlang.org/docs/tutorial.html)
* [Bootstrap](http://getbootstrap.com/)

## AWS Setup
##### Install the required tools (the installation script only runs on Linux and Mac)
* Create an AWS account
* Install [npm](https://www.npmjs.com/)
* [Install or update your aws cli](http://docs.aws.amazon.com/cli/latest/userguide/installing.html) 
* [Install or update your eb cli](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html) 
* [Install angular-cli](https://github.com/angular/angular-cli)


## Getting the code and running it locally
_This uses the pre-configured AWS resources hosted by AWS_

```
# Clone it from github
git clone --depth 1 git@github.com:awslabs/aws-cognito-angular2-quickstart.git
```
```
# Install the NPM packages
cd aws-cognito-angular2-quickstart
npm install
```
```
# Run the app in dev mode
npm start
```

## Creating AWS Resources
This sample application can be deployed to either Elastic Beanstalk or S3. S3 will host this application as a static site
while Elastic Beanstalk gives you the capability of adding backend operations to the application. 

* [What is Elastic Beanstalk](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/Welcome.html)
* [What is S3](http://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html)

**createResources.sh requires your [aws cli to be configured](http://docs.aws.amazon.com/cli/latest/userguide/controlling-output.html) for JSON output.**

```
# Install the AWS resources and deploy your application to either Elastic Beanstalk or S3
cd aws
./createResources.sh
```

Running the above command will create the necessary AWS resources and build & deploy your code to AWS. 
It will prompt you to choose your deployment target (S3 or Elastic Beanstalk). Choosing 'S3' makes your deployment
completely serverless, while choosing Elastic Beanstalk will create an EC2 instance that will host this NodeJS app. 

*Caution:* You might incur AWS charges after running the setup script

## After initially running the ```createResources.sh``` script, use the below commands to rebuild and redeploy

### _S3:_ Update, Build and Deploy
```
# Build the project and sync the output with the S3 bucket
npm run build; cd dist; aws s3 sync . s3://[BUCKET_NAME]/
```
```
# Test your deployed application
curl –I http://[BUCKET_NAME].s3-website-[REGION].amazonaws.com/
```
__*NOTE: You might want to reshuffle some of the "package.json" dependencies and move the ones that belong to devDependencies 
for a leaner deployment bundle. At this point of time, AWS Beanstalk requires all of the dependencies, 
including the devDependencies to be under the dependencies section. But if you're not using Beanstalk then you can
optimize as you wish.*__

*or*

### _Beanstalk:_ Update, Build and Deploy
```
# Commit your changes in order to deploy it to your environment
git add .
git commit
eb deploy
```
```
# View your deployed application in a browser
eb open
```

## Local Testing

This section contains instructions on how to test the application locally (using mocked services instead of the real AWS services).

### LocalStack

To test this application using [LocalStack](https://github.com/localstack/localstack), you can use the `awslocal` CLI (https://github.com/localstack/awscli-local).
```
pip install awscli-local
```
Simply parameterize the `./createResources.sh` installation script with `aws_cmd=awslocal`:
```
cd aws; aws_cmd=awslocal ./createResources.sh
```
Once the code is deployed to the local S3 server, the application is accessible via http://localhost:4572/cognitosample-localapp/index.html (Assuming "localapp" has been chosen as resource name in the previous step)
