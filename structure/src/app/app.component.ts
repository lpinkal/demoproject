import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'structure';
  form: FormGroup;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  createForm() {
    // this.form = this.fb.group({
    //   name: ['', Validators.required],
    //   avatar: null
    // });
  }

  onFileChange(event) {
    // let reader = new FileReader();
    // if(event.target.files && event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.form.get('avatar').setValue({
    //       filename: file.name,
    //       filetype: file.type,
    //       value: reader.result
    //     })
    //   };
    // }
  }

  onSubmit() {
    // const formModel = this.form.value;
  }



}
