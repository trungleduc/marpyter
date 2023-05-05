import { DocumentWidget } from '@jupyterlab/docregistry';
import { IMarpDocModel, IMarpDocWidget } from '../token';
import { Widget } from '@lumino/widgets';

export class MarpDocWidget
  extends DocumentWidget<Widget, IMarpDocModel>
  implements IMarpDocWidget
{
  constructor(options: DocumentWidget.IOptions<Widget, IMarpDocModel>) {
    super(options);
  }
  /**
   * Dispose of the resources held by the widget.
   */
  dispose(): void {
    //TODO Shutdown kernel does not work??
    this.context.sessionContext.shutdown();
    this.content.dispose();
    super.dispose();
  }

  onResize = (msg: any): void => {
    window.dispatchEvent(new Event('resize'));
  };
}
