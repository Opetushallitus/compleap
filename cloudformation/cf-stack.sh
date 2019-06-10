#!/bin/sh

STACK_NAME=$1
OP=$2

if [[ -z "$CERTIFICATE_ARN" ]]; then
    echo "Certificate ARN not set"
    exit 1
fi

if [[ -z "$STACK_NAME" ]]; then
    echo "Stack name not set"
    exit 1
fi

if [[ $STACK_NAME == "compleap-poc-dev" ]]; then
    TEMPLATE="file://compleap-poc-client.yml"
elif [[ $STACK_NAME == "compleap-test-dev" ]]; then
    TEMPLATE="file://compleap-dev-client.yml"
else 
    echo "Invalid stack name"
    exit 1
fi

if [[ $OP == "create" ]]; then
    echo "Creating stack $STACK_NAME with template $TEMPLATE"
    aws cloudformation create-stack --stack-name $STACK_NAME --template-body $TEMPLATE --parameters ParameterKey=CertificateArn,ParameterValue=$CERTIFICATE_ARN --profile $AWS_PROFILE
elif [[ $OP == "update" ]]; then
    echo "Updating stack $STACK_NAME with template $TEMPLATE"
    aws cloudformation update-stack --stack-name $STACK_NAME --template-body $TEMPLATE --parameters ParameterKey=CertificateArn,ParameterValue=$CERTIFICATE_ARN --profile $AWS_PROFILE
elif [[ $OP == "delete" ]]; then
    echo "Deleting stack $STACK_NAME"
    aws cloudformation delete-stack --stack-name $STACK_NAME --profile $AWS_PROFILE
else
    echo "No command given"
    exit 1
fi
