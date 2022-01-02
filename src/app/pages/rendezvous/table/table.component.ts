import { Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges, ViewChild }
  from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
import { TablesCols } from 'src/app/models/tablesCols';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() infos!: any;
  @Input() tableCol!: TablesCols[];
  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;
  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infos']) this.rerenderTable()
  }

  ngOnInit(): void {
    this.dtOptions = this.tableOptions()
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions);
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  tableOptions() {
    return {
      data: this.infos,
      columns: this.tableCol,
      responsive: true,
      multiple: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [3, 5, 10, 25, 50, 100],
      dom: 'Bfrtip',

      // Configure the buttons
      buttons: [
        // 'columnsToggle',
        'colvis',
        // 'copy',
        // 'print',
        'csv',
        'excel',
      ]
    }
  }

  rerenderTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
      // Update table infos
      this.dtOptions.data = this.infos;
      // Call the dtTrigger to rerender again
      this.dtTrigger.next(this.dtOptions);
    });

  }

}
