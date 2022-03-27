import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { IProduct } from '@projects/interface';
import { ProductService } from '../product.service';
import { ProductsTableItem } from './products-table-datasource';

@Component({
  selector: 'projects-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductsTableItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  dataSource!: MatTableDataSource<IProduct>;

  constructor(public productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll();
  }

  ngAfterViewInit(): void {
    this.productService.filteredEntities$.subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  setFilter(filterValue: string) {
    this.productService.setFilter((p: IProduct) => {
      return JSON.stringify(p)
        .toLowerCase()
        .includes(filterValue.toLowerCase());
    });
  }
}
