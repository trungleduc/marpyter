import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ABCWidgetFactory, DocumentRegistry } from '@jupyterlab/docregistry';
import { MarpDocWidget } from '../widget/marpDocumentWidget';
import { MarpViewer } from '../widget/marpviewer';
import { RenderedMarp } from '../rendermime/renderer';
import { MIMETYPE } from '../rendermime/factory';
import { ToolbarWidget } from '../widget/toolbar';
import { CommandRegistry } from '@lumino/commands';

export class MarpDocWidgetFactory extends ABCWidgetFactory<MarpDocWidget> {
  constructor(options: MarpDocWidgetFactory.IOptions) {
    super(options);
    this._rendermime = options.rendermime;
    this._commands = options.commands;
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

    const toolbar = new ToolbarWidget({ commands: this._commands });
    return new MarpDocWidget({ context, content, toolbar });
  }

  private _rendermime?: IRenderMimeRegistry;
  private _commands?: CommandRegistry;
}

export namespace MarpDocWidgetFactory {
  export interface IOptions extends DocumentRegistry.IWidgetFactoryOptions {
    rendermime?: IRenderMimeRegistry;
    commands: CommandRegistry;
  }
}
