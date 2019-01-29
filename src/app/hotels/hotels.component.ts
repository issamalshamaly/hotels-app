import { Component, OnInit } from '@angular/core';
import { Hotel } from '../services/hotel';
import { HotelService } from '../services/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  hotels:Hotel[];
  orginalHotels:Hotel[];


  starSort:string = null;

  priceSort:string = null;

  hasFilter:boolean = false;
  filterSelectedStars = [];
  stars:number[] = [1,2,3,4,5];
  filterName:string = null;
  filterPriceMin:number = null;
  filterPriceMax:number = null;
  filterSort:string = null;

  constructor(private hotelService:HotelService) { }

  ngOnInit() {


  this.getHotels();

  }

  getHotels(): void {
    this.hotelService.getHotels()
        .subscribe(hotels => {
          this.orginalHotels = hotels;
          this.hotels = hotels
        }

        );
  }

  applyStarSort(sort){

    if(this.hotels){

      if(sort ==  'asc'){
              this.hotels.sort((a, b) => {
                if (a.stars < b.stars)
                    return -1;
                if (a.stars > b.stars)
                    return 1;
                return 0;
            });
          this.starSort = 'asc';
      }else{
            this.hotels.sort((a, b) => {
              if (a.stars > b.stars)
                  return -1;
              if (a.stars < b.stars)
                  return 1;
              return 0;
          });
          this.starSort = 'desc';
      }
      this.priceSort = null;
    }

  }

  applyPriceSort(sort){
      if(this.hotels){  
        if(sort ==  'asc'){
                this.hotels.sort((a, b) => {
                  if (a.price < b.price)
                      return -1;
                  if (a.price > b.price)
                      return 1;
                  return 0;
              });
            this.priceSort = 'asc';
        }else{
              this.hotels.sort((a, b) => {
                if (a.price > b.price)
                    return -1;
                if (a.price < b.price)
                    return 1;
                return 0;
            });
            this.priceSort = 'desc';
        }
        this.starSort =null;
      }
  }


  applyFilter(){
   
    this.hotels = this.orginalHotels;

    if(this.filterName){
          this.hotels = this.hotels.filter(obj => 
            {
                    let objName = obj.name.toLowerCase();
                    return objName.includes(this.filterName.toLowerCase())
            }
          );
    }

    if(this.filterPriceMin){
            this.hotels = this.hotels.filter(obj => 
              {
                      return obj.price >= this.filterPriceMin
              }
            );        
    }

    if(this.filterPriceMax){
      this.hotels = this.hotels.filter(obj => 
        {
                return obj.price <= this.filterPriceMax
        }
      );
    }

    if(this.filterSelectedStars.length > 0){
      this.hotels = this.hotels.filter(obj => this.filterSelectedStars.includes(obj.stars));
    }

    if(this.filterSort != ''){
      switch (this.filterSort) {
        case 'starAsc':
          this.applyStarSort('asc');
          break;
        case 'starDesc':
          this.applyStarSort('desc');
          break;
        case 'priceAsc':
          this.applyPriceSort('asc');
          break;
        case 'priceDesc':
        this.applyPriceSort('desc');
          break;
  
        default:
          break;
      }
    }

      this.hasFilter = true;

    }

  clearFilter(){
    this.hasFilter = false;
    this.filterName = null;
    this.filterPriceMax = null;
    this.filterPriceMin = null;
    this.filterSelectedStars =[];
    this.filterSort = null;
    this.hotels = this.orginalHotels;
  }

  checkDisabledClearFilter(){
    return !this.hasFilter;
  }

  checkDisabledApplyFilter(){
    return (!this.filterName && !this.filterPriceMax && !this.filterPriceMin && this.filterSelectedStars.length == 0 && !this.filterSort);
  }

  onChangeSelect(e){
    this.filterSort = e.target.value;
  }

}
