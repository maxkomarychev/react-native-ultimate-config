# Developing

## Misc

Files

```
ios/ConfigValues.h
```

are updated with every `rnuc` execution, yet they have to exist in the repo.

In order to avoid committing them accidentally run

```bash
git update-index --assume-unchanged ios/ConfigValues.h
```

When changing them turn the flag off, update, commit, turn flag back on.
More details: https://git-scm.com/docs/git-update-index#_using_assume_unchanged_bit
