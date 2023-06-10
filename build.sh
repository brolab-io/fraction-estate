mkdir -p deploy

rm -rf .next

yarn build

cp -r .next/standalone/* deploy
cp -r public deploy/
cp -r .next/static deploy/