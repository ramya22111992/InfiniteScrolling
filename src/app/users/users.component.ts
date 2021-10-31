import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { InfiniteScrolling } from '../handleInfiniteScrolling';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private dataService:DataService,private scrollService:InfiniteScrolling) { }

  public endLimit:number=10;
  public albumData:any=[];

  ngOnInit() {
    this.getAlbumData(this.endLimit); //for the first time

    this.scrollService.getObservable().subscribe(status=>{
      if(status){
        this.endLimit=this.endLimit+10;
        this.getAlbumData(this.endLimit);
      }
    })
  }

  getAlbumData(endLimit:number){
 this.dataService.getAlbumData(endLimit).subscribe(response=>{
   console.log(response);
   this.albumData=this.albumData.concat(response);
   console.log(this.albumData);
   let clear=setInterval(()=>{
    let target=document.querySelector(`#target${endLimit}`);
if(target){
  console.log("element found")
  clearInterval(clear);
  this.scrollService.setObserver().observe(target);
}
   },2000)
 },
 err=>{
   console.log(err);
 })
  }

}
