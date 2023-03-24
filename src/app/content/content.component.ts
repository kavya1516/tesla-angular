import { Component, AfterViewInit, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {


  constructor(private render: Renderer2, private httpClient: HttpClient) { }


  images = ["../../assets/images/models.jpg", "../../assets/images/model3.jpg", "../../assets/images/modelx.jpg", "../../assets/images/modely.jpg"]

  pinDetails: any;
  finalAddress: any;
  pinCode: string = '';
  state = '';
  block = '';
  district = '';
  city = '';

  currentImage: string = this.images[0]
  ChangeThePicture(event: any, number: number) {
    this.currentImage = this.images[number]
    this.render.addClass(document.getElementById("image"), "animate");
    setInterval(() => {
      this.render.removeClass(document.getElementById("image"), "animate");
    }, 2000)
  }


  getAdd(event: any) {
    this.pinCode = String(event.target.value)
    if (this.pinCode == "") {
      this.state = ""
      this.district = ""
      this.city = ""
    }
    this.httpClient
      .get(`https://api.postalpincode.in/pincode/${this.pinCode}`)
      .subscribe((val) => {
        const [address] = val as any;
        this.finalAddress = address;
        const postOffices = this.finalAddress.PostOffice;
        if (postOffices.length > 0) {
          this.state = postOffices[0].State;
          this.district = postOffices[0].District;
          this.city = postOffices[0].Name;
        }
      });

  }

}
