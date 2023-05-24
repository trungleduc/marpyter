import { Widget } from '@lumino/widgets';
import { Marp } from '@marp-team/marp-core';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { PromiseDelegate } from '@lumino/coreutils';
import { ActivityMonitor } from '@jupyterlab/coreutils';
import { Message } from '@lumino/messaging';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { MIMETYPE } from '../rendermime/factory';
import { RenderedMarp } from '../rendermime/renderer';
export class MarpViewer extends Widget {
  constructor(options: {
    context: DocumentRegistry.Context;
    renderer?: RenderedMarp;
  }) {
    const node = document.createElement('iframe');
    super({ node });
    this._context = options.context;
    this._renderer = options.renderer;

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
  get htmlContent(): string | undefined {
    return this._htmlContent;
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

  private _renderContent(): void {
    const content = this._context.model.toString();

    if (!this._renderer) {
      return;
    }

    const body = (this.node as HTMLIFrameElement).contentWindow?.document.body;

    if (body) {
      this._renderer
        .render({
          trusted: true,
          data: { [MIMETYPE]: content },
          metadata: {},
          setData: () => {
            /** */
          }
        })
        .then(() => {
          this._htmlContent = body.innerHTML = this._renderer!.node.innerHTML;
        });
    }
  }
  private _context: DocumentRegistry.Context;
  private _htmlContent: string | undefined;
  private _ready = new PromiseDelegate<void>();
  private _monitor: ActivityMonitor<DocumentRegistry.IModel, void> | null =
    null;
  private _renderer: RenderedMarp | undefined;
}
