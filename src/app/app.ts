import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './components/contact-list/contact-list';
import { ContactDetailsComponent } from './components/contact-details/contact-details';
import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  imports: [CommonModule, ContactListComponent, ContactDetailsComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  title = 'contact-management';
  selectedContact: Contact | null = null;
  isSidebarOpen = false;

  onContactSelected(contact: Contact): void {
    this.selectedContact = contact;
    // Close sidebar on mobile when contact is selected
    if (window.innerWidth <= 768) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
