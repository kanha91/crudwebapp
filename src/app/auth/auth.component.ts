import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { FloatLabel } from 'primeng/floatlabel';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auth',
  imports: [CommonModule,FormsModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    FloatLabel,
    ButtonModule,
    ToastModule, 
    TabsModule, 
    BadgeModule, 
    AvatarModule,
    // BrowserAnimationsModule,
    MessageModule,],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [MessageService],
  standalone: true
})
export class AuthComponent {

  isRightPanelActive = false;
  authForm!:FormGroup
  signinForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      device: [null, [Validators.required]], // Make device required
      fromDate: ['', [Validators.required]], // From date is required
      toDate: ['', [Validators.required]],
    });
     // Initialize SignIn Form
     this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });

    // Initialize SignUp Form
    // this.signupForm = this.fb.group(
    //   {
    //     email: ['', [Validators.required, Validators.email]],
    //     password: ['', [Validators.required, Validators.minLength(6)]],
    //     confirmPassword: ['', Validators.required],
    //   },
    //   { validators: this.passwordMatchValidator }
    // );

    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      name: ['', [Validators.required, Validators.minLength(2)]]
    }, { validator: this.checkPasswords });
    
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')!.value;
    const confirmPassword = group.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  // SignIn Form Submission
  onSignin() {
    if (this.signinForm.valid) {
      this.authService.login(this.signinForm.value).subscribe({
        next: (response) => { 
          console.log(response);
          
          this.authService.saveToken(response.token);
          this.router.navigate(['/dashboard']);
          this.messageService.add({ severity: 'success', summary: 'Sign In', detail: 'Successfully signed in!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Sign In', detail: error.error.message || 'Invalid email or password!' });
        }
      });
      // this.messageService.add({ severity: 'success', summary: 'Sign In', detail: 'Successfully signed in!' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Sign In', detail: 'Invalid email or password!' });
    }
  }

  // SignUp Form Submission
  onSignup() {
    if (this.signupForm.valid) {
    const userData = this.signupForm.value;

    this.authService.register(userData).subscribe({
      next: (response) => {
        console.log(response);
        
        this.messageService.add({ severity: 'success', summary: 'Sign Up', detail: 'Account created successfully!' });
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Sign Up', detail: error.error.message || 'Failed to create account!'  });
      }
    });
  } else {
    this.messageService.add({ severity: 'error', summary: 'Sign Up', detail: 'Please check the form for errors!' });
  }
  }


  togglePanel(action: string): void {
    this.isRightPanelActive = action === 'signUp';
  }

  onFormSubmit(event: Event, formType: string): void {
    event.preventDefault();
    console.log(`${formType} form submitted`);
  }

}
