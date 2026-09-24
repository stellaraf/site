# CI runner routing

Linux CI uses disposable AWS CodeBuild runners in the isolated public-repository pool. Public pull request code never runs on the persistent private EC2 runner. Existing macOS and Windows jobs retain their native operating systems. Dependency caches remain repository scoped. Tag-only release workflows are not dispatched by this infrastructure update.
