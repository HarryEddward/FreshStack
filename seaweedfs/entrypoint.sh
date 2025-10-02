#!/bin/sh
set -e

S3_ACCESS_KEY=$(cat /run/secrets/seaweedfs_s3_access_key)
S3_SECRET_KEY=$(cat /run/secrets/seaweedfs_s3_secret_key)
S3_USERNAME=$(cat /run/secrets/seaweedfs_s3_username)

cat > /etc/seaweedfs/s3.json <<EOF
{
  "identities": [
    {
      "name": "${S3_USERNAME}",
      "credentials": [
        {
          "accessKey": "${S3_ACCESS_KEY}",
          "secretKey": "${S3_SECRET_KEY}"
        }
      ],
      "actions": ["Admin","Read","Write","List","Tagging"]
    }
  ]
}
EOF

exec weed s3 \
  -filer=filer:8888 \
  -ip.bind=0.0.0.0 \
  -port=8333 \
  -config=/etc/seaweedfs/s3.json \
  -allowEmptyFolder=true \
  -allowDeleteBucketNotEmpty=false
