export interface Contact {
  id: string;
  name: string;
  title: string;
  bio?: string;
  avatar?: string;
  status?: 'online' | 'offline';
  department?: string;
  company?: string;
  phone?: string;
  meeting?: string;
}

export interface EmailAddress {
  id: string;
  email: string;
  type: 'primary' | 'secondary';
  contactId: string;
}

export interface ContactWithEmails extends Contact {
  emailAddresses?: EmailAddress[];
} 