import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ContactListComponent } from './contact-list';
import { ContactService } from '../../services/contact';
import { of } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactService: ContactService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent, HttpClientTestingModule],
      providers: [ContactService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactService = TestBed.inject(ContactService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load contacts on init', () => {
    const mockContacts = [
      { id: '1', name: 'John Doe', title: 'Developer' },
      { id: '2', name: 'Jane Smith', title: 'Designer' }
    ];
    
    spyOn(contactService, 'getContacts').and.returnValue(of(mockContacts));
    
    component.ngOnInit();
    
    expect(contactService.getContacts).toHaveBeenCalled();
    expect(component.contacts.length).toBeGreaterThan(0);
  });

  it('should emit selected contact', () => {
    const mockContact = { id: '1', name: 'John Doe', title: 'Developer' };
    
    spyOn(component.contactSelected, 'emit');
    
    component.selectContact(mockContact);
    
    expect(component.selectedContactId).toBe('1');
    expect(component.contactSelected.emit).toHaveBeenCalledWith(mockContact);
  });

  it('should return correct status class', () => {
    expect(component.getStatusClass('online')).toBe('status-online');
    expect(component.getStatusClass('offline')).toBe('status-offline');
    expect(component.getStatusClass(undefined)).toBe('status-offline');
  });
}); 