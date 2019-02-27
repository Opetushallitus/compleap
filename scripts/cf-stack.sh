#!/bin/sh

STACK_NAME="compleap-poc-dev"
OP=$1

if [[ -z "$CERTIFICATE_ARN" ]]; then
    echo "Certificate ARN not set"
    exit 1
fi

if [[ $OP == "create" ]]; then
    echo "Creating stack $STACK_NAME"
    aws cloudformation create-stack --stack-name $STACK_NAME --template-body file://cloudformation.yml --parameters ParameterKey=CertificateArn,ParameterValue=$CERTIFICATE_ARN --profile $AWS_PROFILE
elif [[ $OP == "update" ]]; then
    echo "Updating stack $STACK_NAME"
    aws cloudformation update-stack --stack-name $STACK_NAME --template-body file://cloudformation.yml --parameters ParameterKey=CertificateArn,ParameterValue=$CERTIFICATE_ARN --profile $AWS_PROFILE
elif [[ $OP == "delete" ]]; then
    echo "Deleting stack $STACK_NAME"
    aws cloudformation delete-stack --stack-name $STACK_NAME --profile $AWS_PROFILE
fi
