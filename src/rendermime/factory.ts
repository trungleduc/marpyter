import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { RenderedMarp } from './renderer';

export const MIMETYPE = 'text/marp';
export const marpRendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIMETYPE],
  defaultRank: 60,
  createRenderer: options => new RenderedMarp(options)
};
