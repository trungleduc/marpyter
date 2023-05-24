import { CommandRegistry } from '@lumino/commands';
import { CommandToolbarButton } from '@jupyterlab/apputils';
import { Toolbar, saveIcon } from '@jupyterlab/ui-components';

export class ToolbarWidget extends Toolbar {
  constructor(options: ToolbarWidget.IOptions) {
    super(options);

    if (options.commands) {
      this.addItem(
        'download',
        new CommandToolbarButton({
          id: 'marpyter:download',
          label: 'Save HTML',
          icon: saveIcon,
          commands: options.commands
        })
      );
    }
  }
}

export namespace ToolbarWidget {
  export interface IOptions extends Toolbar.IOptions {
    commands?: CommandRegistry;
  }
}
