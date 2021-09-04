import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { News } from 'src/app/news';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  @Input() singleNews:News;

  @Output() sendEvent = new EventEmitter<News>()
  @Output() turnBack:EventEmitter<Boolean> = new EventEmitter<Boolean>();
 
  data = 'Event started';
  test!:FormGroup;
  selected = false;

  constructor(private router:Router) {
    this.test = new FormGroup({
      name: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    })
   }

   get funcControls(){
     return this.test.controls;
   }

  ngOnInit(): void {

  }

  eventing()
  {
    if(this.funcControls.name.value === '' || this.funcControls.content.value === ''){
      return;
    }

    const name = this.funcControls.name.value;
    const content = this.funcControls.content.value;
    const id = this.singleNews.id

    const data ={
      name,
      content,
      id
    }

    this.sendEvent.emit(data);
  }

  
  goBack()
  {
    return this.router.navigate([''])
  }  

}
