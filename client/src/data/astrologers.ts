// Use public asset paths

export interface AstrologerItem {
  id: number;
  name: string;
  skills: string[];
  langs: string[];
  rating: number;
  chat: number;
  call: number;
  img: string;
}

export const ASTROLOGERS: AstrologerItem[] = [
  { id: 1, name: "Acharya Pradeep Shastri", skills: ["Vedic Astrology","Experience: 17 years"], langs: ["Hindi","English","Bengali"], rating: 4.9, chat: 11, call: 45, img: "/assets/astro1.jpg" },
  { id: 2, name: "Pandit Manoj Shastri", skills: ["Vedic Astrology"], langs: ["Hindi","English","Bengali"], rating: 4.8, chat: 11, call: 50, img: "/assets/astro3.jpg" },
  { id: 3, name: "Guruji Arun Kumar", skills: ["KP Astrology","Business"], langs: ["Hindi","Tamil","English"], rating: 4.9, chat: 11, call: 48, img: "/assets/astro2.jpg" },
  { id: 4, name: "Himadri Barua", skills: ["Gemologist","Gemstone"], langs: ["Hindi","Gujarati","English"], rating: 4.7, chat: 11, call: 46, img: "/assets/astro2.jpg" },
];


