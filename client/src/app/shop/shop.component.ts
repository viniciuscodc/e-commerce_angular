import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { ShopService } from './shop.service'
import { IProduct } from '../shared/model/product'
import { IBrand } from '../shared/model/brand'
import { IType } from '../shared/model/productType'
import { ShopParams } from '../shared/model/shopParams';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm: ElementRef
  products!: IProduct[]
  brands!: IBrand[]
  types!: IType[]
  shopParams = new ShopParams()
  totalCount: number
  sortSelected = 'name'
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ]

  constructor(private ShopService: ShopService) { }

  ngOnInit(): void {
    this.getProducts()
    this.getBrands()
    this.getTypes()
  }

  getProducts() {
    this.ShopService.getProducts(this.shopParams).subscribe( 
      {      
        next: x => {
          // @ts-ignore: Object is possibly 'null'.
          this.products = x.data
          // @ts-ignore: Object is possibly 'null'.
          this.shopParams.pageNumber = x.pageIndex
          // @ts-ignore: Object is possibly 'null'.
          this.shopParams.pageSize = x.pageSize
          // @ts-ignore: Object is possibly 'null'.
          this.totalCount = x?.count
        },
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  getBrands() {
    this.ShopService.getBrands().subscribe( 
      {
        next: x => this.brands = [{id: 0, name: 'All'}, ...x],
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  getTypes() {
    this.ShopService.getTypes().subscribe( 
      {
        next: x => this.types = x,
        error: err => console.error('Observer got an error: ' + err),
        complete: () => console.log('Observer got a complete notification'),
      })
  }

  onBrandSelected(brandId: number) {
    this.shopParams.brandId = brandId
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onTypeSelected(typeId: number) {
    this.shopParams.typeId = typeId
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort
    this.getProducts()
  }

  onPageChange(event: any) {
    if(this.shopParams.pageNumber !== event) {
      this.shopParams.pageNumber = event
      this.getProducts()
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value
    this.shopParams.pageNumber = 1
    this.getProducts()
  }

  onReset() {
    this.searchTerm.nativeElement.value = ''
    this.shopParams = new ShopParams()
    this.getProducts()
  }
}
