import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  app: any = "Adarga Login";
 
  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController
  ) {
    
  }

  home() {
    this.router.navigate(['/'], { replaceUrl: true });
  }
 
  ngOnInit() {
    
    this.credentials = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
 
  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
    
    this.apiService.login(this.credentials.value).subscribe(
     
      async _ => {     
        await loading.dismiss();        
        this.router.navigateByUrl('/privado/informes', { replaceUrl: true });
        console.info("1"); 
      },
      async (res) => {   
        console.info("2");  
        console.info(res);    
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
        console.info("3"); 
      }
    );
  }

  test(){
    this.apiService.test();
  }

  async signUp() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.apiService.signUp(this.credentials.value).subscribe(
      async _ => {
        await loading.dismiss();        
        this.login();
      },
      async (res) => {        
        await loading.dismiss();        
        const alert = await this.alertController.create({
          header: 'Signup failed',
          message: res.error.msg,
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }
}
