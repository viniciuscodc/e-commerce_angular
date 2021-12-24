import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagination } from '../shared/model/pagination';
import { map, Observable } from 'rxjs';
import { IProduct } from '../shared/model/product';
import { IBrand } from '../shared/model/brand';
import { IType } from '../shared/model/productType';
import { ShopParams } from '../shared/model/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = `https://localhost:5001/api/`

  constructor(private http: HttpClient) { }

  public getProducts(shopParams: ShopParams) {
    let params = new HttpParams();

    if (shopParams.brandId !== 0) {
      params = params.append('brandId', shopParams.brandId.toString())
    }

    if (shopParams.typeId !== 0) {
      params = params.append('typeId', shopParams.typeId.toString())
    }

    if (shopParams.search) {
      params = params.append('search', shopParams.search)
    }
    
    params = params.append('sort', shopParams.sort)
    params = params.append('pageIndex', shopParams.pageNumber.toString())
    params = params.append('pageIndex', shopParams.pageSize.toString())
    
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(map(response => response.body))
  }

  public getBrands(): Observable<IBrand[]> {
    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands')
  }

  public getTypes(): Observable<IType[]> {
    return this.http.get<IType[]>(this.baseUrl + 'products/types')
  }
}
