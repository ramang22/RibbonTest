import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseListViewCommandSet,
  Command,
  IListViewCommandSetListViewUpdatedParameters,
  IListViewCommandSetExecuteEventParameters
} from '@microsoft/sp-listview-extensibility';
import { Dialog } from '@microsoft/sp-dialog';

import {RowAccessor} from '@microsoft/sp-listview-extensibility';
import * as strings from 'RibbonTestCommandSetStrings';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IRibbonTestCommandSetProperties {
  // This is an example; replace with your own properties
  sampleTextOne: string;
  sampleTextTwo: string;
}

const LOG_SOURCE: string = 'RibbonTestCommandSet';

export default class RibbonTestCommandSet extends BaseListViewCommandSet<IRibbonTestCommandSetProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, 'Initialized RibbonTestCommandSet');
    return Promise.resolve();
  }

  @override
  public onListViewUpdated(event: IListViewCommandSetListViewUpdatedParameters): void {
    const commandOne: Command = this.tryGetCommand('COMMAND_1');
    if (commandOne) {
      // Single item selection
      commandOne.visible = event.selectedRows.length > 0;
    }



    // const compareOneCommand: Command = this.tryGetCommand('COMMAND_1');
    // if (compareOneCommand) {
    //   // This command should be hidden unless exactly one row is selected.
    //   compareOneCommand.visible = event.selectedRows.length === 1;
    // }
  }

  @override
  public onExecute(event: IListViewCommandSetExecuteEventParameters): void {
    switch (event.itemId) {
      case 'COMMAND_1':
        if (event.selectedRows.length > 0) {
          // Check the selected rows
          event.selectedRows.forEach((row: RowAccessor, index: number) => {
            alert(`Smernica: ${row.getValueByName('N_x00e1_zovSmernice')} - Field title: ${row.getValueByName('Title')}`);
          });
      }
        break;
      default:
        throw new Error('Unknown command');
    }
  }
}
