import {
  RenderedHTMLCommon,
  IRenderMime,
  renderHTML
} from '@jupyterlab/rendermime';
import Marp from '@marp-team/marp-core';

export class RenderedMarp extends RenderedHTMLCommon {
  constructor(options: IRenderMime.IRendererOptions) {
    super(options);
    this.addClass('jp-RenderedMarp');
  }

  /**
   * Render a mime model.
   *
   * @param model - The mime model to render.
   *
   * @returns A promise which resolves when rendering is complete.
   */
  render(model: IRenderMime.IMimeModel): Promise<void> {
    return renderMarp({
      host: this.node,
      source: String(model.data[this.mimeType]),
      trusted: model.trusted,
      resolver: this.resolver,
      sanitizer: this.sanitizer,
      linkHandler: this.linkHandler,
      shouldTypeset: this.isAttached,
      latexTypesetter: this.latexTypesetter
    });
  }
}

export async function renderMarp(
  options: renderMarp.IRenderOptions
): Promise<void> {
  // Unpack the options.
  const { host, source, ...others } = options;

  // Clear the content if there is no source.
  if (!source) {
    host.textContent = '';
    return;
  }

  const marp = new Marp({ html: true });
  const { html, css } = marp.render(source, { htmlAsArray: false });

  // Render HTML
  const htmlBody = document.createElement('div');

  await renderHTML({
    host: htmlBody,
    source: html,
    ...others
  });
  const customStyle = '<style>.marpit{  display: grid;gap: 10px;}</style>\n';
  const htmlSource = `${customStyle}<style>${css}</style>${htmlBody.innerHTML}`;
  host.innerHTML = htmlSource;
}

export namespace renderMarp {
  /**
   * The options for the `renderMarkdown` function.
   */
  export interface IRenderOptions {
    /**
     * The host node for the rendered Markdown.
     */
    host: HTMLElement;

    /**
     * The Markdown source to render.
     */
    source: string;

    /**
     * Whether the source is trusted.
     */
    trusted: boolean;

    /**
     * The html sanitizer for untrusted source.
     */
    sanitizer: IRenderMime.ISanitizer;

    /**
     * An optional url resolver.
     */
    resolver: IRenderMime.IResolver | null;

    /**
     * An optional link handler.
     */
    linkHandler: IRenderMime.ILinkHandler | null;

    /**
     * Whether the node should be typeset.
     */
    shouldTypeset: boolean;

    /**
     * The LaTeX typesetter for the application.
     */
    latexTypesetter: IRenderMime.ILatexTypesetter | null;
  }
}
