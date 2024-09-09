
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../../core/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store) {
    this.loginForm = this.fb.group({
      email: ['sasa@gmail.com', [Validators.required, Validators.email]],
      password: ['czbz9728', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    }
  }
}








// import { Component } from '@angular/core';
// import { AuthService } from '../../../core/services/auth.service';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {
//   loginForm: FormGroup;

//   constructor(private authService: AuthService, private fb: FormBuilder) {  
//     this.loginForm = this.fb.group({
//       email:['sasa@gmail.com', [Validators.required, Validators.email]],
//       password: ['czbz9728', Validators.required],
//     })
//   }
 
//   onSubmit() {
//     if (this.loginForm.invalid) {
//       alert('El formulario no es valido');
//     } else {
//       const data = {
//         email: this.loginForm.get('email')?.value,
//         password: this.loginForm.get('password')?.value,
//       };
//       this.authService.login( data);
//     }
//   }

// }
