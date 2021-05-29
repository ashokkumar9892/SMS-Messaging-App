import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { MessageService } from '../message.service';
import { Message } from '../models/message.model';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {
  messages: Message[] = [];
  loaded = false;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data) => {
      this.messageService.getMessages(data['box']).subscribe((res) => {
        this.messages = res;
        this.loaded = true;
      });
    });
  }
   
  
  ngOnInit() {
    
  }

  ngDoCheck()  {
    this.route.data.subscribe((data) => {
      this.messageService.getMessages(data['box']).subscribe((res) => {
        
        if(this.messages.length !== res.length)
        {
          this.messages = res;
          this.loaded = true;
        }

          res.forEach(element => {
          let incomingmsg = this.messages.filter(msg =>msg.from === element.from);
          if(incomingmsg[0].body! == element.body){
            this.messages = res;
            this.loaded = true;
          }
   
     });

       
      });
    });
  }

}
