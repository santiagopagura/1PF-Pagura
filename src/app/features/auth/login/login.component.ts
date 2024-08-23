import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private authService: AuthService, private fb: FormBuilder) {  
    this.loginForm = this.fb.group({
      email:['santiago@gmail.com', [Validators.required, Validators.email]],
      password: ['1234', Validators.required],
      role: ['user', Validators.required],
    })
  }
 
  onSubmit() {
    if (this.loginForm.invalid) {
      alert('El formulario no es valido');
    } else {
      this.authService.login();
    }
  }

}
