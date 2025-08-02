import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact, ContactWithEmails } from '../../models/contact.model';
import { ContactService } from '../../services/contact';

@Component({
  selector: 'app-contact-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-details.html',
  styleUrl: './contact-details.scss'
})
export class ContactDetailsComponent implements OnChanges {
  @Input() contact: Contact | null = null;
  
  contactService = inject(ContactService);
  contactWithEmails: ContactWithEmails | null = null;
  isLoading = false;
  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['contact'] && this.contact) {
      this.loadContactDetails();
    }
  }
  
  loadContactDetails(): void {
    if (!this.contact) return;
    
    this.isLoading = true;
    this.contactService.getContactWithEmails(this.contact.id).subscribe({
      next: (contactData) => {
        this.contactWithEmails = {
          ...contactData,
          ...this.contact, // Preserve enhanced data from contact list
          emailAddresses: contactData.emailAddresses || []
        };
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading contact details:', error);
        this.isLoading = false;
        // Use contact without emails if request fails
        this.contactWithEmails = {
          ...this.contact!,
          emailAddresses: []
        };
      }
    });
  }
  
  getPrimaryEmail(): string {
    if (!this.contactWithEmails?.emailAddresses?.length) {
      return this.contactWithEmails?.name.toLowerCase().replace(/\s+/g, '.') + '@gmail.com';
    }
    const primary = this.contactWithEmails.emailAddresses.find(e => e.type === 'primary');
    return primary?.email || this.contactWithEmails.emailAddresses[0].email;
  }
  
  getSecondaryEmail(): string {
    if (!this.contactWithEmails?.emailAddresses?.length) {
      return this.contactWithEmails?.name.toLowerCase().replace(/\s+/g, '.') + '@whiteui.store';
    }
    const secondary = this.contactWithEmails.emailAddresses.find(e => e.type === 'secondary');
    return secondary?.email || '';
  }
  
  getDialNumber(): string {
    return 'j.stevens@ymsg.com';
  }
  
  getPrimaryPhone(): string {
    return this.contactWithEmails?.phone || '439-582-1578';
  }
  
  getSecondaryPhone(): string {
    return '621-770-7689';
  }
}
