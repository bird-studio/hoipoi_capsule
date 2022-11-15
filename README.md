# hoipoi capsule

## fill in commit message

### Demonstrate fill in commit message

```bash
# cd your/project/directory

deno run --allow-net --allow-write --allow-run --import-map="https://deno.land/x/hoipoi_capsule/import_map.json?source" "https://deno.land/x/hoipoi_capsule/demo/fill_in_commit_message/gitmoji_style.ts?source"
```

### Use

```bash
brew install deno gh
mkdir .githooks
git config --local core.hooksPath .githooks

cat <<EOF > .githooks/prepare-commit-msg
#!/bin/sh

if [[ "\$(git config --get my.interactive)" = yes ]];then
    # git -c my.interactive=yes commit

    exec < /dev/tty deno run --allow-net --allow-write --allow-run --import-map="https://deno.land/x/hoipoi_capsule/import_map.json?source" "https://deno.land/x/hoipoi_capsule/demo/fill_in_commit_message/gitmoji_style.ts?source"
fi
EOF
```
