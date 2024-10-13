import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event, EventType } from '../../models/event';
import { Image } from '../../models/image';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent implements OnInit {
  @Input() x!: string;


  image: File | null = null;
  imageMin: File | null = null;
  images: Image[] = [];
  uploadingFile:boolean=false;
  mainImage: Image = new Image();
  mainImageAdded: boolean = false;
  id: number =-1;
  newForm!: FormGroup;

  eventType = EventType;
  event:Event = new Event();
  constructor(
    private router: Router,
    private acr: ActivatedRoute,
    private eventService: EventService
  ) {}
  ngOnInit(): void {
    this.newForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      date:new FormControl('',[Validators.required]),
      note:new FormControl('',[Validators.required]),
    });
    this.acr.params.subscribe(params => {
      this.event.id=params['id'];
      this.id=params['id']
      this.eventService.fetchEvent(this.event.id).subscribe((result)=> {
        this.event= result;
        this.mainImageAdded=true
        this.mainImage.id=this.event.imageId
        this.mainImage.imageId=this.event.imageIdCloudinary
        this.mainImage.imageUrl=this.event.imageUrl
        this.images=this.event.images!
        this.newForm.setValue({
          type: this.event.type,
          name: this.event.name,
          date: this.event.date,
          note:this.event.note
        });
        console.log(this.event.date)
        console.log(this.newForm.value.date)
          })

    },(error)=>{
      this.fetchImages(this.id);
    });


    throw new Error('Method not implemented.');

    
    // this.id=this.acr.snapshot.params["id"];
   
  }
   get Name(){ return this.newForm.get("name");}
  get Type(){ return this.newForm.get("type");}
   get Date(){ return this.newForm.get("date");}
 
  goToEventDisplay() {
    this.router.navigate(['/events/display']);
  }
  add() {
    if (this.mainImageAdded)
    if (this.event.id==-1)
    {
      console.log(" id   = == = = -1")
      this.eventService
      .addEvent(this.newForm.value, this.images, this.mainImage)
      .subscribe((response) => {
 
        Swal.fire({
          title: "Created!",
          icon: "success"
        });
      });
    }
    else{
      console.log(" id   = == = = "+this.event.id)

       this.eventService
       
      .updateEvent(this.newForm.value, this.images, this.mainImage,this.id)
      .subscribe((response) => {
        Swal.fire({
          title: "Updated!",
          icon: "success"
        });
      });
    }
   
  }

  swalSuces(){
    console.log("Sending SWAL EVENT")
    Swal.fire({
      title: "Good job!",
      text: "Your Request is Finished!",
      icon: "success"
    });
    
  }
  onFileChange(event: any) {
    this.image = event.target.files[0];
    this.imageMin = null;
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imageMin = evento.target.result;
    };
    if (this.image) {
      fr.readAsDataURL(this.image);
    }
  }

  onUploadImages() {
    this.uploadingFile=true;
    if (this.image) {
      this.eventService.upload(this.image).subscribe(
        (data) => {
          this.images.push(data);
          console.log(data);
          this.uploadingFile=false;
    
        },
        (err) => {
          console.log(err);
          this.uploadingFile=false;
        }
      );
    }
  }
  onUploadMainImage() {
    this.uploadingFile=true;
    if (this.image) {
      this.eventService.uploadForEvent(this.image,-1).subscribe(
        (data) => {
          this.mainImage = data;
          this.mainImageAdded = !this.mainImageAdded;
          console.log(data);
          this.uploadingFile=false;
        },
        (err) => {
          console.log(err);

        }
      );
    }
  }

  

  fetchImages(id: number) {
    console.log("Started to FETCH "+ id)
    this.uploadingFile=true;
    this.eventService.imagesForEvent(id).subscribe(
      (images) => {
        this.images = images;
        this.uploadingFile=false;
        console.log("FETCHING DONE")
      },
      (error) => {
        this.uploadingFile=false;
        console.error('Error fetching images:', error);
      }
    );
  }

  deleteImage(id: any): void {
    this.eventService.delete(id).subscribe(
      () => {
        console.log("FETCHING")
        this.fetchImages(this.id);
        console.log('Image Deleted');
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }
  deleteMainImage(id: any): void {
    this.eventService.delete(id).subscribe(
      () => {
       this.mainImage=new Image()
       this.mainImageAdded=!this.mainImageAdded;
        console.log('Image Deleted');
      },
      (error) => {
        console.error('Error deleting image:', error);
      }
    );
  }



}
