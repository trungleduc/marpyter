import {
  ILayoutRestorer,
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { WidgetTracker } from '@jupyterlab/apputils';
import { IRenderMimeRegistry } from '@jupyterlab/rendermime';
import { ITranslator } from '@jupyterlab/translation';

import { MarpDocWidgetFactory } from './document/widgetFactory';
import { IMarpViewerTracker } from './token';
import { MarpDocWidget } from './widget/marpDocumentWidget';
import { marpRendererFactory } from './rendermime/factory';
import { MarpViewer } from './widget/marpviewer';

/**
 * Initialization data for the marpyter extension.
 */
const plugin: JupyterFrontEndPlugin<IMarpViewerTracker> = {
  id: 'marpyter:plugin',
  description: 'A JupyterLab extension.',
  autoStart: true,
  provides: IMarpViewerTracker,
  requires: [IRenderMimeRegistry, ITranslator],
  optional: [ILayoutRestorer],
  activate: (
    app: JupyterFrontEnd,
    rendermime: IRenderMimeRegistry,
    translator: ITranslator
  ): IMarpViewerTracker => {
    console.log('JupyterLab extension marpyter is activated!');
    const trans = translator.load('jupyterlab');
    const { docRegistry } = app;

    rendermime.addFactory(marpRendererFactory);
    const namespace = 'marpyter-widget';
    const tracker = new WidgetTracker<MarpDocWidget>({
      namespace
    });

    app.commands.addCommand('marpyter:download', {
      execute: args => {
        const current = tracker.currentWidget;
        if (current) {
          const marpViwer = current.content as MarpViewer;
          const htmlContent = marpViwer.htmlContent;
          if (!htmlContent) {
            return;
          }
          const element = document.createElement('a');
          element.setAttribute(
            'href',
            'data:text/plain;charset=utf-8,' + encodeURIComponent(htmlContent)
          );
          const fileName =
            current.context.path
              .split('\\')
              ?.pop()
              ?.split('/')
              ?.pop()
              ?.split('.')?.[0] ?? 'Untitled';

          element.setAttribute('download', `${fileName}.html`);
          element.click();
        }
      }
    });
    const factory = new MarpDocWidgetFactory({
      name: 'Marp Doc',
      label: trans.__('Marp Preview'),
      fileTypes: ['markdown'],
      rendermime,
      commands: app.commands
    });
    factory.widgetCreated.connect((sender, widget) => {
      // Notify the widget tracker if restore data needs to update.
      widget.context.pathChanged.connect(() => {
        void tracker.save(widget);
      });
      void tracker.add(widget);
    });
    docRegistry.addWidgetFactory(factory);

    return tracker;
  }
};

export default [plugin];
