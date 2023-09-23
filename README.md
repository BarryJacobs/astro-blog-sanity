# Astro Sanity Blog Demo

## Overview

This is the next stage of the Astro blog demo but this time incorporating [Sanity CMS](https://www.sanity.io/) to provide content rather than SSG via MDX files, in the original [astro-blog](https://github.com/BarryJacobs/astro-blog) repository.

A demo of the site can be found [here](https://resilient-pavlova-922456.netlify.app/).

## Bun

I've used Bun as the package manager and local dev server. The offical documentation can be found [here](https://bun.sh/).

### Commands

All commands are run from the root of the astro-blog folder, from a terminal:

| Command                   | Action                                        |
| :------------------------ | :-------------------------------------------- |
| `bun install`             | Installs dependencies                         |
| `bun --bun astro dev`     | Starts local dev server at `localhost:4321`   |
| `bun --bun astro build`   | Build your production site to `./dist/`       |
| `bun --bun astro preview` | Preview your build locally, before deploying  |
| `bunx astro add react`    | Use Astro integrations with astro add command |

## Sanity Content Studio

For further information regarding integration with Sanity please read the documentation [here](https://www.sanity.io/guides/sanity-astro-blog).

Additional links:

- [Join the community Slack](https://slack.sanity.io/?utm_source=readme)
- [Extend and build plugins](https://www.sanity.io/docs/content-studio/extending?utm_source=readme)

## Environment Variables

Once you have created a project on the sanity.io website, you will need to copy the .env.template files to .env versions, in both project directories, and populate with the values for your project. These environment variables can then be provided via [Netlify](https://www.netlify.com/) or any other hosting provider you choose but I would highly recommend this platform.
