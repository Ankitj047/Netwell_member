

const awsmobile = {
    "aws_project_region": "us-east-2",
    "aws_cognito_identity_pool_id": process.env.REACT_APP_BUILD.REACT_APP_aws_cognito_identity_pool_id,
    "aws_user_pools_id": process.env.REACT_APP_aws_user_pool_id,
    "aws_user_pools_web_client_id":process.env.REACT_APP_aws_user_pools_web_client_id,
    "oauth": {}
};

export default awsmobile;
