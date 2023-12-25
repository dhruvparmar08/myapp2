import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'myapp2';

  ngOnInit(): void {
    chrome.action.onClicked.addListener(() => console.log("click here")); 

    chrome.tabs.getCurrent().then((res) => console.log("res --", res));
  
  }
}
