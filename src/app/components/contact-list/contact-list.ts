import { Component, OnInit, inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact';
import { Contact } from '../../models/contact.model';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact-list.html',
  styleUrl: './contact-list.scss'
})
export class ContactListComponent implements OnInit {
  @Output() contactSelected = new EventEmitter<Contact>();
  @Output() closeSidebar = new EventEmitter<void>();
  
  contactService = inject(ContactService);
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  selectedContactId: string | null = null;
  private _searchTerm: string = '';
  
  get searchTerm(): string {
    return this._searchTerm;
  }
  
  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filterContacts();
  }
  
  ngOnInit(): void {
    this.loadContacts();
  }
  
  loadContacts(): void {
    this.contactService.getContacts().subscribe({
      next: (contacts) => {
        this.contacts = this.addMockData(contacts);
        this.filteredContacts = [...this.contacts];
        if (this.contacts.length > 0) {
          this.selectContact(this.contacts[0]);
        }
      },
      error: (error) => {
        console.error('Error loading contacts:', error);
      }
    });
  }
  
  filterContacts(): void {
    const term = this.searchTerm.toLowerCase().trim();
    
    if (!term) {
      this.filteredContacts = [...this.contacts];
    } else {
      this.filteredContacts = this.contacts.filter(contact => 
        contact.name.toLowerCase().includes(term) ||
        contact.title?.toLowerCase().includes(term) ||
        contact.department?.toLowerCase().includes(term) ||
        contact.phone?.includes(term)
      );
    }
  }
  
  addMockData(contacts: Contact[]): Contact[] {
    // Add mock data for demo purposes based on the Figma design
    const mockEnhancements = [
      { status: 'online' as const, department: 'Developer', avatar: 'https://i.pravatar.cc/150?img=1' },
      { status: 'offline' as const, department: 'Sales Manager', avatar: 'https://i.pravatar.cc/150?img=2' },
      { status: 'online' as const, department: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=3' },
      { status: 'offline' as const, department: 'Designer', avatar: 'https://i.pravatar.cc/150?img=4' },
      { status: 'offline' as const, department: 'PR agent', avatar: 'https://i.pravatar.cc/150?img=5' },
      { status: 'offline' as const, department: 'Support Team', avatar: 'https://i.pravatar.cc/150?img=6' },
      { status: 'offline' as const, department: 'Project Manager', avatar: 'https://i.pravatar.cc/150?img=7' },
      { status: 'online' as const, department: 'Developer', avatar: 'https://i.pravatar.cc/150?img=8' },
      { status: 'online' as const, department: 'Developer', avatar: 'https://i.pravatar.cc/150?img=9' },
    ];
    
    return contacts.map((contact, index) => ({
      ...contact,
      ...mockEnhancements[index % mockEnhancements.length],
      phone: contact.phone || `+1 555-0${100 + index}`,
      meeting: contact.meeting || `http://meet.company.com/${contact.id}`
    }));
  }
  
  selectContact(contact: Contact): void {
    this.selectedContactId = contact.id;
    this.contactSelected.emit(contact);
  }
  
  getStatusClass(status: string | undefined): string {
    return status === 'online' ? 'status-online' : 'status-offline';
  }
  
  onCloseSidebar(): void {
    this.closeSidebar.emit();
  }
}
