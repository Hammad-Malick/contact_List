import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, switchMap, of, catchError } from 'rxjs';
import { Contact, EmailAddress, ContactWithEmails } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private http = inject(HttpClient);
  private apiUrl = 'https://688e68f2a459d5566b14df19.mockapi.io/api/v1';

  // Mock data for demo purposes
  private mockContacts: Contact[] = [
    { id: '1', name: 'Nicholas Gordon', title: 'Developer', bio: 'Full-stack developer with expertise in Angular and Node.js' },
    { id: '2', name: 'Bradley Malone', title: 'Sales Manager', bio: 'Experienced sales professional with a track record of exceeding targets' },
    { id: '3', name: 'Johanna Stevens', title: 'Project Manager', bio: 'When I first got into the advertising, I was looking for the magical combination that would put website into the top search engine rankings' },
    { id: '4', name: 'Marvin Lambert', title: 'Designer', bio: 'Creative UI/UX designer passionate about user-centered design' },
    { id: '5', name: 'Teresa Lloyd', title: 'PR agent', bio: 'Public relations specialist with strong media connections' },
    { id: '6', name: 'Fred Haynes', title: 'Support Team', bio: 'Customer support expert dedicated to solving client issues' },
    { id: '7', name: 'Rose Peters', title: 'Project Manager', bio: 'Agile project manager with experience in software development' },
    { id: '8', name: 'Brian Watson', title: 'Developer', bio: 'Frontend developer specializing in React and Vue.js' },
    { id: '9', name: 'Hettie Richardson', title: 'Developer', bio: 'Backend developer with expertise in microservices architecture' },
  ];

  private mockEmailAddresses: { [key: string]: EmailAddress[] } = {
    '1': [
      { id: '1-1', email: 'nicholas.gordon@gmail.com', type: 'primary', contactId: '1' },
      { id: '1-2', email: 'nicholas.gordon@company.com', type: 'secondary', contactId: '1' }
    ],
    '2': [
      { id: '2-1', email: 'bradley.malone@gmail.com', type: 'primary', contactId: '2' },
      { id: '2-2', email: 'bradley@sales.company.com', type: 'secondary', contactId: '2' }
    ],
    '3': [
      { id: '3-1', email: 'johanna.stevens@gmail.com', type: 'primary', contactId: '3' },
      { id: '3-2', email: 'johanna.stevens@whiteui.store', type: 'secondary', contactId: '3' }
    ],
    '4': [
      { id: '4-1', email: 'marvin.lambert@gmail.com', type: 'primary', contactId: '4' }
    ],
    '5': [
      { id: '5-1', email: 'teresa.lloyd@gmail.com', type: 'primary', contactId: '5' },
      { id: '5-2', email: 'teresa@pr.agency.com', type: 'secondary', contactId: '5' }
    ],
    '6': [
      { id: '6-1', email: 'fred.haynes@gmail.com', type: 'primary', contactId: '6' }
    ],
    '7': [
      { id: '7-1', email: 'rose.peters@gmail.com', type: 'primary', contactId: '7' }
    ],
    '8': [
      { id: '8-1', email: 'brian.watson@gmail.com', type: 'primary', contactId: '8' },
      { id: '8-2', email: 'brian@dev.company.com', type: 'secondary', contactId: '8' }
    ],
    '9': [
      { id: '9-1', email: 'hettie.richardson@gmail.com', type: 'primary', contactId: '9' }
    ]
  };

  getContacts(): Observable<Contact[]> {
    // Try API first, fall back to mock data
    return this.http.get<Contact[]>(`${this.apiUrl}/contact`).pipe(
      catchError(() => {
        console.log('Using mock data as API is unavailable');
        return of(this.mockContacts);
      })
    );
  }

  getContactById(id: string): Observable<Contact> {
    return this.http.get<Contact>(`${this.apiUrl}/contact/${id}`).pipe(
      catchError(() => {
        const contact = this.mockContacts.find(c => c.id === id);
        return of(contact || this.mockContacts[0]);
      })
    );
  }

  getEmailAddresses(contactId: string): Observable<EmailAddress[]> {
    return this.http.get<EmailAddress[]>(`${this.apiUrl}/contact/${contactId}/email_addresses`).pipe(
      catchError(() => {
        return of(this.mockEmailAddresses[contactId] || []);
      })
    );
  }

  getContactWithEmails(contactId: string): Observable<ContactWithEmails> {
    return forkJoin({
      contact: this.getContactById(contactId),
      emailAddresses: this.getEmailAddresses(contactId)
    }).pipe(
      map(({ contact, emailAddresses }) => ({
        ...contact,
        emailAddresses
      }))
    );
  }

  getAllContactsWithEmails(): Observable<ContactWithEmails[]> {
    return this.getContacts().pipe(
      switchMap(contacts => {
        const contactObservables = contacts.map(contact => 
          this.getContactWithEmails(contact.id)
        );
        return forkJoin(contactObservables);
      })
    );
  }
}
