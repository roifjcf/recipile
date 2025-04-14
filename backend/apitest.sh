#!/bin/bash
# bash ./apitest.sh

root="http://127.0.0.1:5000/"

echo "Get all recipes, categories, and tags"

curl -X GET "${root}recipes"
curl -X GET "${root}tags"
curl -X GET "${root}categories"

echo "========================="
echo "Rename tag 'fried' to 'delicious junk'"

curl -X PUT "${root}tag/update/fried/delicious%20junk"
curl -X GET "${root}recipes"
curl -X GET "${root}tags"

echo "========================="
echo "Remove tag 'delicious junk'"

curl -X DELETE "${root}tag/delete/delicious%20junk"
curl -X GET "${root}recipes"
curl -X GET "${root}tags"

echo "========================="
echo "Rename category 'cat1' to 'nya1'"