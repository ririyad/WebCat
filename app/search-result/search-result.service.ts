import { Injectable } from '@angular/core';
import { MockVendors } from '../shared/mock-vendors';
import { Vendor } from '../shared/model/vendor';


@Injectable()
export class SearchResultService {

    private Vendors: Vendor[];

    public search(area:string, keyword:string){

        this.Vendors = [];
        this.Vendors = this.getVendors();

        this.getVendors().forEach(vendor=>{
            if(vendor.address.Locality===area){
                for(let i=0; i < vendor.products.length; i++){
                    if(vendor.products[i]===keyword){
                        this.Vendors.push(vendor);
                        break;
                    }
                }
            }
        });
        return this.Vendors;
    }

    private getVendors() {
        return MockVendors.VENDORS;
    }
}