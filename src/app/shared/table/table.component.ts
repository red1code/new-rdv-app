import {
  Component, OnInit, Input, OnDestroy, AfterViewInit, OnChanges, SimpleChanges,
  ViewChild, Output, EventEmitter
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTableDirective } from 'angular-datatables';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject } from 'rxjs';
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
    this.dtOptions = this.tableOptions(this.infos, this.tableCols, this.currentUser?.email, this.showBtns)
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
      // Configure buttons (I disabled them coz the user doesn't need them)
      buttons: this.tableBTNs(showBTNs),
      rowCallback: (row: Node, data: any[] | Object, index: number) => {
        const self = this;
        // Unbind first in order to avoid any duplicate handler
        // (see https://github.com/l-lin/angular-datatables/issues/87)
        // Note: In newer jQuery v3 versions, `unbind` and `bind` are
        // deprecated in favor of `off` and `on`
        let dt = data as any;
        if (dt.created_by === usrMail || this.canCRUD) { // only the owner or moderator or admin, can edit table
          $(row).attr('class', () => 'table-editable-row');
          $(row).attr('title', () => this.translate.instant('Click To Edit'));
        }
        $(row).on('click', () => {
          if (dt.created_by === usrMail || this.canCRUD) { // only the owner or moderator or admin, can edit table
            self.updateInfosEvent.emit(dt);
          }
        });
        return row
      }
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

  // we need table buttons in dashboard, but we don't need them in rendezvous, so i made this method:
  private tableBTNs = (showBTNs: boolean): any[] => showBTNs ? ['colvis', 'csv', 'excel'] : [];

  get canCRUD() {
    return this.authService.canCRUDrendezvous(this.currentUser as User)
  }

}
