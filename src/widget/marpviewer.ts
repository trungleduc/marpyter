import { Widget } from '@lumino/widgets';
import { Marp } from '@marp-team/marp-core';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { PromiseDelegate } from '@lumino/coreutils';
import { ActivityMonitor } from '@jupyterlab/coreutils';
import { Message } from '@lumino/messaging';
export class MarpViewer extends Widget {
  constructor(options: { context: DocumentRegistry.Context }) {
    const node = document.createElement('iframe');
    super({ node });
    this._context = options.context;

    void this._context.ready.then(async () => {
      this._renderContent();
      this._monitor = new ActivityMonitor({
        signal: this._context.model.contentChanged
      });
      this._monitor.activityStopped.connect(this.update, this);

      this._ready.resolve(undefined);
    });

    this.addClass('marpyter-viewer');
  }

  get ready(): Promise<void> {
    return this._ready.promise;
  }

  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    if (this.isDisposed) {
      return;
    }
    if (this._monitor) {
      this._monitor.dispose();
    }
    this._monitor = null;
    super.dispose();
  }

  /**
   * Handle an `update-request` message to the widget.
   */
  protected onUpdateRequest(msg: Message): void {
    if (this._context.isReady && !this.isDisposed) {
      void this._renderContent();
    }
  }

  private _renderContent() {
    const content = this._context.model.toString();
    const marp = new Marp();
    const { html, css } = marp.render(content);
    const contents = `<style>${css}</style>${html}`;
    const body = (this.node as HTMLIFrameElement).contentWindow?.document.body;
    if (body) {
      body.innerHTML = contents;
    }
  }
  private _context: DocumentRegistry.Context;
  private _ready = new PromiseDelegate<void>();
  private _monitor: ActivityMonitor<DocumentRegistry.IModel, void> | null =
    null;
}
