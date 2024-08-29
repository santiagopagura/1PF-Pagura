import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../../core/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService
  ) { 
    this.userForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: [{ value: this.generatePassword(), disabled: true }, Validators.required]
    });
  }

  generatePassword(): string {
    // Generación automática de contraseña (puedes personalizar esta lógica)
    return Math.random().toString(36).slice(-8);
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = {
        ...this.userForm.getRawValue()  // Obtén valores incluso de los campos deshabilitados
      };
      this.registerService.registerUser(formData).subscribe({
        next: () =>{
          this.userForm.reset();
          console.log("usuario creado");
        },
        error: () =>{
          alert('Ocurrió un error al registrar el usuario');
        },
        complete: () =>{
          alert('Usuario registrado con éxito');
        }
        })
    }
  }


  
}