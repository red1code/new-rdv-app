import {
  Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges,
  ViewChild, Output, EventEmitter
} from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { Rendezvous } from 'src/app/models/rendezvous';
import { TablesCols } from 'src/app/models/tablesCols';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() infos!: Rendezvous[] | null;
  @Input() tableCols!: TablesCols[];
  @Input() userEmail!: string;

  @Output() updateInfosEvent = new EventEmitter<Rendezvous>();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  constructor() { }

  // component life cycle hooks
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infos']) this.rerenderTable()
  }

  ngOnInit(): void {
    this.dtOptions = this.tableOptions(this.infos as Rendezvous[], this.tableCols, this.userEmail)
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  tableOptions(tableData: Rendezvous[], cols: TablesCols[], usrMail: string) {
    return {
      data: tableData,
      columns: cols,
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [3, 5, 10, 25, 50, 100],
      dom: 'Bfrtip',
      // Configure buttons (I disabled them coz the user doesn't need them)
      buttons: [
        // 'columnsToggle',
        // 'colvis',
        // 'copy',
        // 'print',
        // 'csv',
        // 'excel',
      ],
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        let dt = data as Rendezvous;
        if (dt.created_by === usrMail) {
          $(row).attr('class', () => 'table-editable-row');
          $(row).attr('title', () => 'Click to edit informations or delete Rendezvous')
        }
        $(row).on('click', () => {
          if (dt.created_by === usrMail) {
            self.someClickHandler(data as Rendezvous)
          }
        });
        return row
      }
    }
  }

  someClickHandler(info: Rendezvous): void {
    this.updateInfosEvent.emit(info);
  }

  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Update table infos
      this.dtOptions.data = this.infos as Rendezvous[];
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });
  }

}