import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { MarpDocWidget } from '../widget/marpDocumentWidget';
import { MarpViewer } from '../widget/marpviewer';
import { RenderedMarp } from '../rendermime/renderer';
import { MIMETYPE } from '../rendermime/factory';

export class MarpDocWidgetFactory extends ABCWidgetFactory<MarpDocWidget> {
  constructor(options: MarpDocWidgetFactory.IOptions) {
    super(options);
    this._rendermime = options.rendermime;
  }

  /**
   * Create a new widget given a context.
   *
   * @param context Contains the information of the file
   * @returns The widget
   */
  protected createNewWidget(context: DocumentRegistry.Context): MarpDocWidget {
    let renderer: RenderedMarp | undefined;
    if (this._rendermime) {
      const rendermime = this._rendermime.clone({
        resolver: context.urlResolver
      });
      renderer = rendermime.createRenderer(MIMETYPE) as
        | RenderedMarp
        | undefined;
    }
    const content = new MarpViewer({ context, renderer });
    return new MarpDocWidget({ context, content });
  }

  private _rendermime?: IRenderMimeRegistry;
}

export namespace MarpDocWidgetFactory {
  export interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
    rendermime?: IRenderMimeRegistry;
  }
}
