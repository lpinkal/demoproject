import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css']
})
export class LeftSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  displayMore() {
    let ele = document.getElementById('data');
    let textnode = document.createElement("div");
    textnode.setAttribute("id", "Div1");
    ele.appendChild(textnode);
    textnode.innerText = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi at eligendi, ex mollitia necessitatibus placeat praesentium ratione recusandae voluptatibus voluptatum. Culpa, doloribus ex obcaecati praesentium qui, rem repudiandae sapiente sed vero voluptate, voluptates voluptatum. Ab at, consequatur dolorem et ipsam neque obcaecati quis reprehenderit sunt?';
    const elem: HTMLDivElement = document.querySelector('#Div1');
    elem.scrollIntoView();
  }

}
