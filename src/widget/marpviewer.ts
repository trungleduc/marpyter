import { Widget } from '@lumino/widgets';
import { MarpDocModel } from '../document/docModel';
import { Marp } from '@marp-team/marp-core';
export class MarpViewer extends Widget {
  constructor(options: { model: MarpDocModel }) {
    const node = document.createElement('iframe');
    super({ node });
    this._model = options.model;
    this._model.contentChanged.connect(() => {
      this._renderContent(this._model.toString());
    });

    this.addClass('marpyter-viewer');
  }

  private _renderContent(content: string) {
    const marp = new Marp();
    const { html, css } = marp.render(content);
    const contents = `<style>${css}</style>${html}`;
    const body = (this.node as HTMLIFrameElement).contentWindow?.document.body;
    if (body) {
      body.innerHTML = contents;
    }
  }
  private _model: MarpDocModel;
}
