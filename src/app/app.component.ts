import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { Validators, FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';

export interface Mensagem{
  usuario: string;
  mensagem: string;
  dataHora: string;
}

@Component({
  selector: 'app-root',  
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  socket;
  socketUserID;
  userName;
  usuario: string = 'Fulano';
  //mensagens = [];
  mensagens: Mensagem[] = [];
  chatForm = this.fb.group({
    mensagem: []
  })
  userNameForm = this.fb.group({
    nome: []
  })

  constructor(private fb: FormBuilder) {
    this.socket = io('http://localhost:3000');
    this.socketUserID = this.socket.id;
  }

  ngOnInit(){
    this.chatForm.get('mensagem').disable();
    var msgs = this.mensagens;
    this.socket.on('chat message', function(msg) {
      msgs.push(msg);
      setTimeout(function() {
        let caixaMsg = document.getElementsByClassName('message-wrapper');
        caixaMsg[caixaMsg.length-1].classList.add("them");
      }, 10);
    });
  }
  
  entrarChat(modal) {
    this.userName = modal.nome;
    this.chatForm.get('mensagem').enable();
  }

  enviarMensagem(modal) {
    var data = new Date();
    var dataHora = (data.toLocaleString());
    var mensagem:any = modal.mensagem;

    if(mensagem != null && mensagem != "") {
      
      mensagem = {
        usuario: this.userName,
        mensagem: mensagem,
        dataHora: dataHora
      };

      this.socket.emit('chat message', mensagem);
      setTimeout(function() {
        let caixaMsg = document.getElementsByClassName('message-wrapper');
        caixaMsg[caixaMsg.length-1].classList.add("me");
      }, 10);
      this.chatForm.get('mensagem').setValue('');
    }
    return false;
  }

  title = 'chatbox';
}
