# hoipoi

```bash
brew install deno gh
git config --local core.hooksPath .githooks
```

## demo

```bash
deno run --allow-net --allow-write --allow-run --import-map="https://deno.land/x/hoipoi@v0.0.1/import_map.json?source" "https://deno.land/x/hoipoi@v0.0.1/demo/fill_in_commit_message/gitmoji_style.ts?source"
```
