import {
  Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges,
  ViewChild, Output, EventEmitter
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TablesCols } from 'src/app/models/tablesCols';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {

  @Input() infos!: any[] | null;
  @Input() tableCols!: TablesCols[];
  @Input() currentUser!: User | null;
  @Input() showBtns!: boolean;

  @Output() updateInfosEvent = new EventEmitter();
  @Output() loadMoreData = new EventEmitter();

  @ViewChild(DataTableDirective, { static: false })
  dtElement!: DataTableDirective;

  dtOptions: any = {};
  dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();

  constructor(private authService: AuthService, private translate: TranslateService) { }

  // component life cycle hooks
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['infos']) this.rerenderTable()
  }

  ngOnInit(): void {
    this.dtOptions = this.tableOptions(this.infos, this.tableCols, this.currentUser?.email as string, this.showBtns);
    window.onresize = () => this.rerenderTable()
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next(this.dtOptions)
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe()
  }

  tableOptions(tableData: any[] | null, cols: TablesCols[], usrMail: string | undefined, showBTNs: boolean) {
    return {
      data: tableData,
      columns: cols,
      responsive: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [3, 5, 10, 25, 50, 100],
      dom: 'Bfrtip',
      initComplete: (settings: any, json: any) => {
        $('button').removeClass('dt-button');
        $('button').removeClass('buttons-excel');
        $('button').removeClass('buttons-html5 ');
        $('#DataTables_Table_0_next').on('click', () => this.loadMoreData.emit())
      },
      // Configure buttons (I disabled them coz the user doesn't need them)
      buttons: this.tableBTNs(showBTNs),

      // drawCallback: () => {
      //   $('#DataTables_Table_0_next').on('click', () => this.loadMoreData.emit())
      // },

      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        $(row).addClass('t-row');
        $(row).css({ "white-space": "nowrap" })
        let dt = data as any;
        if (dt.createdBy === usrMail || this.canCRUD) { // only the owner or moderator or admin, can edit row
          const btn = document.createElement('button');
          btn.textContent = this.translate.instant('Edit');
          btn.setAttribute('id', 'tableBtn');
          btn.classList.add('btn', 'btn-dark')
          btn.onclick = () => self.updateInfosEvent.emit(dt);
          const last = $(row.lastChild as any);
          last.addClass('row-btn-container');
          last.children('button').remove();
          last.append(btn)
        }
        return row
      },
      language: {
        processing: this.translate.instant('Processing...'),
        search: this.translate.instant('Search:'),
        lengthMenu: this.translate.instant('Show _MENU_ entries'),
        info: this.translate.instant('Showing _START_ to _END_ of _TOTAL_ entries'),
        infoEmpty: this.translate.instant('Showing 0 to 0 of 0 entries'),
        infoFiltered: this.translate.instant('(filtered from _MAX_ total entries)'),
        infoPostFix: "",
        loadingRecords: this.translate.instant('Loading...'),
        zeroRecords: this.translate.instant('No matching records found'),
        emptyTable: this.translate.instant('No data available in table'),
        paginate: {
          first: this.translate.instant('First'),
          previous: this.translate.instant('Previous'),
          next: this.translate.instant('Next'),
          last: this.translate.instant('Last')
        },
        aria: {
          sortAscending: this.translate.instant(': activate to sort column ascending'),
          sortDescending: this.translate.instant(': activate to sort column descending'),
        }
      }
    }
  }

  rerenderTable() {
    if (this.dtOptions && this.dtElement) {
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

  // we need table buttons in dashboard, but we don't need them in rendezvous, so i made this method:
  private tableBTNs = (showBTNs: boolean): any[] => {
    return !showBTNs ? [] :
      [
        { extend: 'colvis', className: "export-btns" },
        { extend: 'csv', className: "export-btns" },
        { extend: 'excel', className: "export-btns" }
      ]
  }

  get canCRUD() {
    return this.authService.canCRUDrendezvous(this.currentUser as User)
  }

}
