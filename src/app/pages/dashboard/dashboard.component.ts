import { Component } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { AvatarModule } from 'primeng/avatar';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from 'primeng/dialog';

@Component({
  selector: 'app-dashboard',
  imports: [Toolbar, AvatarModule, ButtonModule,TableModule,InputTextModule,Dialog, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  visible: boolean = false;

  products = [
    { code: 'A1', name: 'Product 1', category: 'Category A', quantity: 10 },
    { code: 'B2', name: 'Product 2', category: 'Category B', quantity: 20 },
    { code: 'C3', name: 'Product 3', category: 'Category C', quantity: 30 }
  ];

  showDialog() {
    this.visible = true;
  }

    

    closeDialog() {
        this.visible = false;
    }
    

}
