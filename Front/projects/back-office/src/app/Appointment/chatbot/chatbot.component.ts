import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ChatbotServiceService } from '../../services/chatbot-service.service';

declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  chatForm = new FormGroup({
    message: new FormControl('')
  });
  chatbotResponse: string;
  //  la fonctionnalité de reconnaissance vocale
  // api fill les navigateurs web
  recognition = new webkitSpeechRecognition();
  finalTranscript = '';

  constructor(private chatbotService: ChatbotServiceService) {
    this.setupSpeechRecognition();
  }

  setupSpeechRecognition() {
    // reconnaissance continue 
    //la récupération des donnee 
    // tout en spécifiant la langue
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.finalTranscript += event.results[i][0].transcript + ' ';
        }
        if (this.finalTranscript.toLowerCase().includes('calendar')) {
          // Redirige vers la page http://localhost:4203/calendar
          window.location.href = 'http://localhost:4203/calander2';
        }
        if (this.finalTranscript.toLowerCase().includes('classroom list')) {
          // Redirige vers la page http://localhost:4203/calendar
          window.location.href = 'http://localhost:4203/classrooms';
        }
        else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      this.chatForm.controls['message'].setValue(this.finalTranscript + interimTranscript);
    };

    this.recognition.onerror = (event: any) => {
      console.log('Error occurred in recognition: ' + event.error);
    };
  }

  startListening() {
    this.finalTranscript = ''; // Reset the final transcript on start.
    this.recognition.start();
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('stop-btn').style.display = 'inline-block';
  }

  stopListening() {
    this.recognition.stop();
    document.getElementById('start-btn').style.display = 'inline-block';
    document.getElementById('stop-btn').style.display = 'none';
  }

  add() {
    const message = this.chatForm.get('message').value;
    this.chatbotService.getChatbotResponse(message).subscribe(
      (response) => {
        // Assuming response structure is as anticipated; adjust as necessary
        const randomIndex = Math.floor(Math.random() * response.data.responses.length);
        this.chatbotResponse = response.data.responses[randomIndex];
      },
      (error) => {
        console.error('Error communicating with the chatbot API', error);

      }
    );
  }
}

