# Diagram rendering

Fenced `mermaid` blocks are rendered on demand by [Pele](https://pele.run/),
pinned to **1.13.0** on jsDelivr. No npm dependency or build step is needed.
The shared entry point remains `public/js/mermaid.js`.

Pele accepts Mermaid source with its own layout and style. It measures the
container, responds to resizing, and provides zoom controls when diagrams shrink.
Colors follow the site's light/dark class through `src/styles/diagrams.css`.
Pages without diagrams do not download the library.

## Existing formatting

Data attributes take precedence over preceding HTML comments, followed by
formatting comments on the first line of the Mermaid source. Numeric dimensions
are interpreted as pixels; pixel and percentage dimensions remain supported.

- `width`, `height`, `align`, `center`, and `border` remain supported.
- Widths are capped at the available container width on narrow screens.
- `scale` and `scalePos` were pie whitespace cropping workarounds for Mermaid.
  Pele already lays pies out compactly, so these options are retained in source
  but are **not applied**. A visible note explains this on affected pies. The
  complete title, slices, and legend fit the requested dimensions instead.
- Mermaid init directives and ordinary comments are passed through intact.

## Compatibility limits

See Pele's [compatibility reference](https://pele.run/compatibility).
Mermaid themes and most `themeVariables` do not carry over; Pele uses CSS
variables. Arbitrary HTML labels are unsupported, although line breaks, bold,
and italic text work. JavaScript click callbacks and external Mermaid plugins
are unsupported. Custom icons require a resolver and math requires a typesetter;
neither is configured here. Math labels otherwise show their TeX source.
Do not rely on these features when authoring new diagrams.

A load, parsing, or initial rendering failure keeps the original source and copy
controls, with a visible message. Pele reports later responsive redraw errors in
its diagram container. Failed diagrams are not silently replaced by empty SVGs.
Mounted observers are destroyed before Astro page swaps.

The migration was checked against the existing English/Turkish flowcharts,
sequence diagram, and pie charts. Renderer tests execute the shipped parser
functions rather than maintaining separate copies.
