import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UnitTesingService } from '../services/unit-tesing.service';
import { MyPost } from '../sharedData';

@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styles: [``]
})
export class TestingComponent implements OnInit {
  data: MyPost[] = new Array();

  myPostData: MyPost = {
    id: 100,
    title: 'testing',
    author: 'akshay'
  };
  constructor(private service: UnitTesingService, private http: HttpClient) {}

  ngOnInit(): void {}

  getData() {
    this.service.getPosts().subscribe(
      data => {
        this.data = data;
      },
      err => console.log('get error', err)
    );

    console.log(this.data);
  }

  postData() {
    this.service.post(this.myPostData).subscribe(
      res => console.log(res),
      err => {
        console.log('posterror', err);
      }
    );
    this.myPostData.id += 1;
  }

  putData() {
    let author = this.myPostData.author;
    this.myPostData.author = author + this.myPostData.id;
    this.service.put(this.myPostData).subscribe(
      () => {},
      err => {
        console.log('put error ', err);
      }
    );
  }

  deleteData(id: number) {
    this.service
      .delete(id)
      .subscribe(() => console.log(`${id} deleted`), err => console.log(err));
  }
}
