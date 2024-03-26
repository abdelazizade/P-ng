// import { Component, Input } from '@angular/core';

// @Component({
//   selector: 'app-pagination',
//   templateUrl: './pagination.component.html',
//   styleUrls: ['./pagination.component.css'],
// })
// export class PaginationComponent {
//   @Input() items: any[] = [];
//   @Input() pageSize: number = 5; // default page size
//   currentPage: number = 1;

//   constructor() {}

//   onPageChange(pageNumber: number) {
//     console.log('onPageChange');

//     this.currentPage = pageNumber;
//   }
// }

//////////////////////////////////
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent {
  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  @Input() pageSize: number;
  @Input() totalItems: number;
  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  currentPage: number = 1;

  constructor() {}

  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.emitPageChangeEvent();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChangeEvent();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  emitPageChangeEvent() {
    this.pageChange.emit(this.currentPage);
  }
}
