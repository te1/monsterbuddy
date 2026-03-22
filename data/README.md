# Monster Buddy Data

## Dev

- `.json5` files in `./data` are the source of truth (edit these files)
- `.json` files in `./app/assets` are generated (don't edit these files) and git ignored
- `.json` files should be automatically generated when you run `dev`, `build` or `generate` commands
- run `pnpm data` to manually trigger the file generation
- zod schemas are used to validate data after transformation is done
- app uses types derived from zod schemas

## Data Sources

- [MHST 1](1/README.md)
- [MHST 2](2/README.md)
- [MHST 3](3/README.md)
