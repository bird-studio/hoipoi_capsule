# hoipoi capsule

```bash
brew install deno gh
git config --local core.hooksPath .githooks
```

## fill in commit message

### Demonstrate fill in commit message

```bash
deno run --allow-net --allow-write --allow-run --import-map="https://deno.land/x/hoipoi_capsule@v0.0.1/import_map.json?source" "https://deno.land/x/hoipoi_capsule@v0.0.1/demo/fill_in_commit_message/gitmoji_style.ts?source"
```
