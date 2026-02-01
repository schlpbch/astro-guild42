#!/bin/bash

# Release script for astro-guild42
# Usage: ./scripts/release.sh [patch|minor|major]

set -e

# Get current version from package.json
current_version=$(node -p "require('./package.json').version")
echo "Current version: $current_version"

# Determine version bump type
bump_type=${1:-patch}

if [ "$bump_type" != "patch" ] && [ "$bump_type" != "minor" ] && [ "$bump_type" != "major" ]; then
    echo "Error: Version bump type must be 'patch', 'minor', or 'major'"
    echo "Usage: ./scripts/release.sh [patch|minor|major]"
    exit 1
fi

echo "Preparing $bump_type release..."

# Update version in package.json
npm version $bump_type --no-git-tag-version

# Get new version
new_version=$(node -p "require('./package.json').version")
echo "New version: $new_version"

# Add and commit changes
git add package.json
git commit -m "chore: bump version to $new_version"

# Create and push tag
git tag "v$new_version"
git push origin master
git push origin "v$new_version"

echo "✅ Release v$new_version created!"
echo "🚀 GitHub Actions will now create the release automatically"
echo "📦 Release will be available at: https://github.com/schlpbch/astro-guild42/releases/tag/v$new_version"