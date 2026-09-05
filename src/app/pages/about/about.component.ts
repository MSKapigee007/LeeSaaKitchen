import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TeamMember } from '../../models/menu-item.model';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  teamMembers: TeamMember[] = [
    { name: 'Chef Amir Hassan', role: 'Head Chef & Founder', bio: 'With over 20 years of culinary experience across South Asia and the US, Chef Amir brings authentic family recipes to every dish.' },
    { name: 'Fatima Lee', role: 'Co-Founder & Operations', bio: 'Fatima ensures every order is prepared and delivered with care, managing the kitchen operations and customer experience.' },
    { name: 'David Chen', role: 'Sous Chef', bio: 'Trained in both Eastern and Western cuisines, David adds creative fusion elements while respecting traditional flavors.' },
    { name: 'Maria Santos', role: 'Catering Manager', bio: 'Maria coordinates all catering events, ensuring every celebration is a memorable culinary experience for our clients.' }
  ];

  values = [
    { icon: '🌿', title: 'Fresh Ingredients', desc: 'We source the freshest produce and authentic spices, never compromising on quality.' },
    { icon: '❤️', title: 'Made With Love', desc: 'Every dish is prepared with the same care and passion as a home-cooked meal.' },
    { icon: '🌍', title: 'Community First', desc: 'We are proud to serve Augusta and give back to the community that supports us.' },
    { icon: '♻️', title: 'Sustainability', desc: 'We use eco-friendly packaging and minimize food waste through smart kitchen practices.' }
  ];
}
