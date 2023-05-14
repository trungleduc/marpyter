import { DocumentWidget } from '@jupyterlab/docregistry';
import { Widget } from '@lumino/widgets';

export class MarpDocWidget extends DocumentWidget<Widget> {
  onResize = (msg: any): void => {
    window.dispatchEvent(new Event('resize'));
  };
}
