# Hoipoi capsule

## Fill in the blanks to create a commit message

https://user-images.githubusercontent.com/92862731/201958468-dec2cf7a-8035-47b1-9668-d468641ce8be.mov

### Try out

```bash
# cd your/project/directory

deno run --allow-net --allow-write --allow-run --import-map="https://deno.land/x/hoipoi_capsule/import_map.json?source" "https://deno.land/x/hoipoi_capsule/demo/fill_in_commit_message/conventionalcommits_style.ts?source"
```

### Use

```bash
brew install deno gh
mkdir .githooks
git config --local core.hooksPath .githooks

cat <<EOF > .githooks/prepare-commit-msg
#!/bin/sh

exec < /dev/tty deno run --allow-net --allow-write --allow-run --import-map="https://deno.land/x/hoipoi_capsule/import_map.json?source" "https://deno.land/x/hoipoi_capsule/demo/fill_in_commit_message/conventionalcommits_style.ts?source"

EOF
```

### Customize
