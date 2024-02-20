---
description: 'meta description of the page'
---

# MDC

Learn more: https://content.nuxt.com/usage/markdown

Learn how to use MDC
<!--more-->
Full amount of content beyond the more divider.

## components

::card
The content of the card
::

::hero
Default slot text

#description
This will be rendered inside the `description` slot.
::

::hero
  :::card
    A nested card
    ::card
      A super nested card
    ::
  :::
::


:inline

:hello{}-world

## String

> Hello {{ $doc.name || 'World' }}

## Attributes

Hello [World]{style="background-color: var(--color-primary-500)"}!

::alert{:type="type" icon="exclamation-circle"}
Oops! An error occurred
::

- ![](/favicon.ico){style="display: inline; margin: 0;"} image,
- [link](#attributes){style="background-color: pink;"}, `code`{style="color: cyan;"},
- _italic_{style="background-color: yellow; color:black;"} and **bold**{style="background-color: lightgreen;"} texts.
