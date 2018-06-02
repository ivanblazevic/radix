#! /bin/bash
version=`git diff HEAD^..HEAD -- "$(git rev-parse --show-toplevel)"/package.json | grep '^\+.*version' | sed 's/[^0-9\.]//g'`

if [ "$version" != "" ]; then
    git tag -a "$version" -m "`git log -1 --format=%s`"
    git push --tags
    ./github-release
    echo "Created a new tag, v$version"
fi