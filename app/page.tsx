const navItems = ['Home', 'About', 'Services', 'Events', 'Merch', 'Media', 'Contact'];

const floatingObjects = [
  { label: '45 LB', className: 'plate obj-1' },
  { label: 'DB', className: 'dumbbell obj-2' },
  { label: 'CD', className: 'disc obj-3' },
  { label: 'MIC', className: 'mic obj-4' },
  { label: 'BALL', className: 'football obj-5' },
  { label: 'PB', className: 'paintball obj-6' },
  { label: 'TIME', className: 'hourglass obj-7' },
  { label: 'CUP', className: 'cup obj-8' },
  { label: 'BOWL', className: 'bowling obj-9' },
  { label: 'RIDE', className: 'snowboard obj-10' },
];

const featurePortals = [
  { title: 'Featured Videos', icon: '▶', body: 'Reels, workouts, recaps, and raw movement energy.', href: '#media' },
  { title: 'Our Services', icon: '⚙', body: 'Editing, promo, hosting, creative direction, and activations.', href: '#services' },
  { title: 'Upcoming Events', icon: '▦', body: 'Sessions, parties, runs, vendor pop ups, and community drops.', href: '#events' },
  { title: 'New Merch Drop', icon: '▤', body: 'A fashion closet for limited TIMELESS gear and future drops.', href: '#merch' },
];

const services = ['Content creation', 'Video editing', 'Event hosting', 'Business promotion', 'Vendor spotlights', 'Movement sessions'];
const events = [
  { date: 'Jun 01', title: 'TIMELESS Day Party', meta: 'Cincinnati, OH · 3:00 PM' },
  { date: 'Jun 15', title: 'No Limit Experience', meta: 'Community activation · 9:00 PM' },
  { date: 'Jul 04', title: 'Built Without Limits', meta: 'Workout, media, vendors' },
];
const merch = ['Chrome hoodie', 'No Limit tee', 'Training shorts', 'Infinity accessories'];

export default function Home() {
  return (
    <main>
      <nav className="nav-shell" aria-label="Main navigation">
        <a className="mini-mark" href="#home" aria-label="TIMELESS No Limit home">T∞L</a>
        <div className="nav-links">{navItems.map((item) => <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>)}</div>
        <a className="movement-btn" href="#join">Join the Movement <span>›</span></a>
      </nav>

      <section id="home" className="hero-section">
        <div className="aura aura-purple" />
        <div className="aura aura-orange" />
        <div className="studio-lines" />
        <div className="float-stage" aria-hidden="true">{floatingObjects.map((object) => <div key={object.className} className={`floating-object ${object.className}`}><span>{object.label}</span></div>)}</div>
        <div className="hero-content">
          <p className="eyebrow">Two worlds. One purpose.</p>
          <div className="logo-orb"><img src="/images/timeless-logo.svg" alt="TIMELESS No Limit official logo" /></div>
          <h1>TIMELESS NO LIMIT</h1>
          <p className="hero-tagline">Balance is power. Limits are illusions.</p>
          <a className="explore-btn" href="#movement">Explore the Movement <span>∞</span></a>
        </div>
        <div className="feature-grid" id="movement">{featurePortals.map((feature) => <a className="feature-portal" href={feature.href} key={feature.title}><div className="feature-icon"><span>{feature.icon}</span></div><strong>{feature.title}</strong><p>{feature.body}</p></a>)}</div>
        <form id="join" className="join-bar"><div><strong>Join the Movement</strong><p>Stay updated. Get inspired. No limits.</p></div><label className="sr-only" htmlFor="email">Email address</label><input id="email" type="email" placeholder="Enter your email address" /><button type="submit">Join Now</button></form>
      </section>

      <section id="about" className="content-section split-section"><div><p className="eyebrow">About</p><h2>A lifestyle movement built around duality.</h2></div><p>TIMELESS No Limit blends fitness, spirituality, creativity, events, and community into one clean universe. Purple carries the cosmic side: discipline, focus, space, and higher energy. Orange carries the grounded side: action, fire, freedom, and greatness. The site is designed like a white chrome showroom where the brand colors glow through the details.</p></section>
      <section id="services" className="content-section"><div className="section-header"><p className="eyebrow">Services</p><h2>We build the energy around the moment.</h2></div><div className="service-grid">{services.map((service) => <div className="glass-card" key={service}>{service}</div>)}</div></section>
      <section id="events" className="content-section split-section"><div><p className="eyebrow">Events</p><h2>Experiences, sessions, activations.</h2></div><div className="event-list">{events.map((event) => <article className="event-card" key={event.title}><span>{event.date}</span><div><h3>{event.title}</h3><p>{event.meta}</p></div><a href="#join">RSVP</a></article>)}</div></section>
      <section id="merch" className="content-section closet-section"><div className="section-header"><p className="eyebrow">Merch</p><h2>Wear the movement.</h2><p>Future-ready fashion closet for drops, limited apparel, and chrome-toned product displays.</p></div><div className="closet-display">{merch.map((item) => <div className="hanger" key={item}><span />{item}</div>)}</div></section>
      <section id="media" className="content-section"><div className="section-header"><p className="eyebrow">Media</p><h2>Featured videos and energy clips.</h2></div><div className="media-grid">{[1, 2, 3].map((video) => <div className="video-card" key={video}><span>▶</span><p>Upload MP4 videos into /public/videos and swap these placeholders.</p></div>)}</div></section>
      <section id="contact" className="content-section contact-section"><p className="eyebrow">Contact</p><h2>Book a service, join the team, or plug into the next event.</h2><form className="contact-form"><input placeholder="Name" /><input placeholder="Email" type="email" /><input placeholder="City" /><select defaultValue=""><option value="" disabled>Interest</option><option>Events</option><option>Services</option><option>Merch</option><option>Join the team</option><option>Vendor partnership</option></select><textarea placeholder="Message" /><button type="submit">Send Message</button></form></section>
      <footer><strong>TIMELESS No Limit LLC</strong><span>Live Beyond Limits</span></footer>
    </main>
  );
}
