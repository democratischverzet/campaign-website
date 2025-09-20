export type Testimonial = {
  avatar: string
  name: string
  title: string
  desc: string
  city: string
  latitude: number
  longitude: number
}

export const testimonials: Testimonial[] = [
  {
    avatar: '/img/danielle.jpg',
    name: 'Danielle',
    title: 'Beeldend kunstenaar',
    desc: '"Ik ben eigenlijk helemaal geen activist. Ik vind het belangrijk dat we weer met elkaar in gesprek gaan. Hier kan ik bijdragen aan die verbinding. Mensen en organisaties bij elkaar brengen, dat is wat ik het liefste doe."',
    city: 'Arnhem',
    latitude: 51.9836561,
    longitude: 5.9086988,
  },
  {
    avatar: '/img/joppe.jpeg',
    name: 'Joppe',
    title: 'Online marketeer',
    desc: '"De hele wereld staat in de fik. Dat komt door de elite die zichzelf aan het verrijken is. Ik wil daar iets aan doen, maar voel me vaak machteloos. Democratisch Verzet is een plek waar ik kan bijdragen aan échte verandering."',
    city: 'Utrecht',
    latitude: 52.0919,
    longitude: 5.123,
  },
]
