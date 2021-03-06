import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { News } from 'src/app/news';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  @Output() postData = new EventEmitter<void>();

  formData: News[] = [];
  formStatus = false;
  error = null;

  myForm!:FormGroup;
  updateForm!:FormGroup;

  selected:boolean = false;

  news:News = {
    name:'Nothing selected',
    content:'Select some post',
    id:'xxxx'
  };

  testProperty = 'no event';

  constructor(private service:PostService, private router: Router) {

    this.myForm = new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

    this.updateForm = new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

   } 

  ngOnInit(): void {

    // this.errorSub = this.service.error.subscribe(errorMsg => {
    //   this.error = errorMsg;
    // })
    // jos ondestroj da usubrskribas se 
    
    this.getData();
  
  }

  execute()
  {
    this.formStatus=true;
    this.service.insertData(this.myForm.value).subscribe(
      () => {
        this.formData.push(this.myForm.value);
        this.formStatus=false;
        this.myForm.reset();
      }
    )
  }

  getData()
  {
    this.formStatus=true;
    this.service.onFetch().subscribe(posts => {
      this.formData = posts
      this.formStatus=false;
    },
    error => {
      this.error = error.message
    })  
  }

  onDeleteNews(data:News)
  {
    this.service.deleteData(data).subscribe(
      () => {
        this.formData = this.formData.filter(d => d.id !== data.id)
      }
    )
  }

  updatePost(){
    this.service.updateData(this.news).subscribe(
      () => {
        this.formStatus=false;
        this.getData();
      }
    )
  }

  // In main 
  update(data){
    this.news = data;
    this.selected= true;
  }
  // 

  catchEvent(data)
  {
    this.news = data;
    this.updatePost();
  }




}
