import React, { useState } from 'react';
import { Menu, X, Calendar, BookOpen, Heart, Coffee, Crown, Sparkles, Scroll, Star, MapPin, ChevronRight, Mail, Instagram, Mic, Rss, Play, Headphones, Send } from 'lucide-react';

// --- Datos (Mock Data) ---

const UPCOMING_EVENTS = [
  {
    id: 1,
    title: "Commander Tea Party: Edición Real",
    date: "24 Octubre, 16:00",
    location: "La Guarida del Dragón, CDMX",
    type: "Evento Insignia",
    description: "Nuestra reunión clásica. Trae tu taza de té favorita, tu mazo de Commander y vístete para la corte. Habrá pastelillos y política de mesa.",
    highlight: true
  },
  {
    id: 2,
    title: "Taller de Encantamientos",
    date: "05 Noviembre, 11:00",
    location: "Discord del Reino",
    type: "Online",
    description: "Aprende a construir mazos basándote en auras y encantamientos. Ideal para princesas guerreras.",
    highlight: false
  },
  {
    id: 3,
    title: "Torneo de Bienvenida",
    date: "15 Noviembre, 10:00",
    location: "Magic Store Sur",
    type: "Principiantes",
    description: "Un ambiente seguro para jugar tu primer torneo sellado. Sin presiones, solo diversión.",
    highlight: false
  }
];

const PODCAST_EPISODES = [
  {
    id: 104,
    title: "Ep. 4: Etiqueta en la Mesa de Commander",
    duration: "45 min",
    date: "10 Octubre",
    description: "Discutimos los acuerdos tácitos del formato: ¿Cuándo es correcto atacar a quien no tiene bloqueadores? ¿Se vale romper tratos?",
    guest: "Lady Arwen"
  },
  {
    id: 103,
    title: "Ep. 3: Mujeres en el Lore de Magic",
    duration: "52 min",
    date: "03 Octubre",
    description: "Analizamos la evolución de personajes femeninos icónicos, desde Serra hasta Liliana Vess.",
    guest: "Lorekeeper Val"
  },
  {
    id: 102,
    title: "Ep. 2: Superando el 'Imposter Syndrome'",
    duration: "38 min",
    date: "26 Septiembre",
    description: "Hablamos sobre cómo sentirte segura y validar tu espacio en tiendas competitivas.",
    guest: "Jueza Ana"
  }
];

// --- Componentes de UI ---

const SectionTitle = ({ children, icon: Icon }) => (
  <div className="mb-10 text-center relative z-10">
    <div className="flex justify-center mb-3 text-pink-500">
      {Icon ? <Icon size={32} /> : <Crown size={32} />}
    </div>
    <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-4 drop-shadow-sm">
      {children}
    </h2>
    <div className="h-1 w-24 bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mx-auto rounded-full"></div>
  </div>
);

const Button = ({ children, primary, className = "", onClick }) => (
  <button 
    onClick={onClick}
    className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 shadow-md flex items-center justify-center gap-2 ${
      primary 
        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:shadow-pink-300/50 hover:shadow-lg border border-transparent" 
        : "bg-white text-purple-700 border-2 border-purple-100 hover:border-purple-300 hover:bg-purple-50"
    } ${className}`}
  >
    {children}
  </button>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-xl shadow-purple-100/50 hover:shadow-purple-200/50 transition-all duration-500 ${className}`}>
    {children}
  </div>
);

// --- Componente Newsletter ---
const NewsletterSection = () => (
  <section className="py-20 relative overflow-hidden">
    {/* Background Decorations */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-slate-900 z-0"></div>
    <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
       <Send size={300} className="text-white" />
    </div>

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-3xl mx-auto text-center text-white">
        <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6 text-pink-300 border border-white/20">
          <Mail size={24} />
        </div>
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">
          Los Edictos Reales
        </h2>
        <p className="text-purple-200 mb-8 text-lg">
          Suscríbete para recibir noticias de torneos, nuevos episodios del podcast y secretos del reino directamente en tu bandeja de entrada (vía cuervo digital).
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto bg-white/10 p-2 rounded-full border border-white/20 backdrop-blur-sm">
          <input 
            type="email" 
            placeholder="tu_correo@reino.com" 
            className="flex-1 bg-transparent border-none text-white placeholder-purple-300 px-6 py-3 focus:outline-none focus:ring-0 rounded-full"
          />
          <button className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-pink-500/30 transition-all transform hover:scale-105">
            Suscribirse
          </button>
        </div>
        <p className="text-xs text-purple-400 mt-4">
          Prometemos no enviar spam ni hechizos de confusión.
        </p>
      </div>
    </div>
  </section>
);

// --- Vistas ---

const HomeView = ({ setView }) => (
  <>
    {/* Hero Section */}
    <section className="relative pt-32 pb-24 overflow-hidden bg-[#faf5ff]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-300/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-pink-200 text-pink-700 text-sm font-bold mb-8 shadow-sm animate-fade-in-up">
          <Sparkles size={16} /> Bienvenida al Reino de Ladies The Gathering
        </div>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-slate-800 mb-6 leading-tight">
          Donde la Magia <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">encuentra su Corte.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Un espacio seguro, inclusivo y encantado para mujeres que aman Magic: The Gathering. 
          Aquí, cada jugadora es una reina y cada mazo cuenta una historia.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button primary onClick={() => setView('events')}>
            <Calendar size={18} /> Ver Eventos
          </Button>
          <Button onClick={() => setView('podcast')}>
            <Headphones size={18} /> Escuchar Podcast
          </Button>
        </div>
      </div>
    </section>

    {/* Commander Tea Party Feature */}
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-[3rem] p-8 md:p-16 relative overflow-hidden shadow-2xl shadow-pink-100 border border-white">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
             <Coffee size={300} />
          </div>
          
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-wider">
                El Evento Favorito
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-800 mb-6">
                Commander Tea Party
              </h2>
              <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                Olvída la tensión de los torneos oscuros. Te invitamos a nuestra mesa: un lugar lleno de luz, té, postres y risas. 
                El <strong>Commander Tea Party</strong> es nuestra celebración de la amistad y la estrategia, donde ganar es secundario y pasarlo bien es la ley del reino.
              </p>
              <Button primary onClick={() => setView('events')}>Reservar mi lugar en la mesa</Button>
            </div>
            <div className="hidden md:flex justify-center">
               <div className="w-80 h-96 bg-white rounded-t-full rounded-b-3xl shadow-[0_20px_50px_rgba(236,72,153,0.3)] border-8 border-white flex flex-col items-center justify-center p-6 text-center">
                  <div className="mb-4 bg-pink-50 rounded-full p-6 text-pink-400">
                     <Coffee size={64} />
                  </div>
                  <p className="font-serif italic text-slate-500">"No hay mejor manera de resolver un conflicto en la mesa que con una buena taza de té y un Counterspell a tiempo."</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <NewsletterSection />
  </>
);

const PodcastView = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen">
    <SectionTitle icon={Mic}>La Voz del Reino</SectionTitle>
    
    <div className="text-center mb-12">
      <p className="text-slate-600 max-w-2xl mx-auto mb-6">
        Escucha las crónicas de nuestras bardas. Entrevistas, consejos de estrategia y chismes de la corte mágica, directo a tus oídos.
      </p>
      <div className="flex justify-center gap-4">
        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-orange-100 text-orange-600 font-bold hover:bg-orange-200 transition-colors">
          <Rss size={18} /> Feed RSS
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-green-100 text-green-700 font-bold hover:bg-green-200 transition-colors">
          <span className="font-serif">Spotify</span>
        </button>
      </div>
    </div>

    <div className="max-w-4xl mx-auto space-y-6">
      {PODCAST_EPISODES.map((episode) => (
        <div key={episode.id} className="bg-white rounded-3xl p-6 border border-purple-100 shadow-lg shadow-purple-50 hover:shadow-xl transition-all flex flex-col md:flex-row gap-6 items-center group">
          
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
            <Headphones className="text-white" size={32} />
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2 justify-center md:justify-start">
               <span className="text-xs font-bold text-pink-500 bg-pink-50 px-2 py-1 rounded-md uppercase tracking-wide">Nuevo Episodio</span>
               <span className="text-xs text-slate-400">{episode.date} • {episode.duration}</span>
            </div>
            <h3 className="text-xl font-bold font-serif text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
              {episode.title}
            </h3>
            <p className="text-slate-600 text-sm mb-3">
              {episode.description}
            </p>
            <div className="text-xs font-semibold text-purple-400">
              Invitada especial: {episode.guest}
            </div>
          </div>

          <button className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-pink-500 hover:text-white transition-all shadow-sm group-hover:scale-110">
            <Play size={20} className="ml-1" />
          </button>
        </div>
      ))}
    </div>
  </div>
);

const ManifestoView = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen relative overflow-hidden">
    <div className="absolute inset-0 z-0 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#f0abfc 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

    <div className="max-w-4xl mx-auto relative z-10">
      <SectionTitle icon={Scroll}>El Manifiesto</SectionTitle>
      
      <div className="bg-[#fffbf0] p-8 md:p-12 rounded shadow-2xl border-t-8 border-b-8 border-pink-300 relative">
        <div className="absolute top-4 left-4 text-pink-200"><Crown size={40} /></div>
        <div className="absolute bottom-4 right-4 text-pink-200"><Sparkles size={40} /></div>
        
        <h3 className="text-3xl font-serif text-center text-slate-800 italic mb-10">
          "En esta mesa, todas portamos corona"
        </h3>

        <div className="space-y-12">
          <div className="flex gap-6">
            <div className="text-5xl font-serif text-pink-300 font-bold opacity-50">I.</div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide">La Excelencia del Respeto</h4>
              <p className="text-slate-700 leading-relaxed text-lg">
                Declaramos que nuestro espacio es sagrado. La intolerancia y la condescendencia son dragones desterrados. Aquí, la bondad es el hechizo más poderoso.
              </p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="text-5xl font-serif text-pink-300 font-bold opacity-50">II.</div>
            <div>
              <h4 className="text-xl font-bold text-slate-800 mb-2 uppercase tracking-wide">Magia sin Barreras</h4>
              <p className="text-slate-700 leading-relaxed text-lg">
                El valor de una jugadora no reside en su colección, sino en su espíritu. Nos comprometemos a construir puentes de cristal para todas.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-pink-200 text-center">
          <p className="font-serif italic text-slate-500">Sellado y decretado por Ladies The Gathering.</p>
        </div>
      </div>
    </div>
  </div>
);

const EventsView = () => (
  <div className="pt-32 pb-20 container mx-auto px-6 min-h-screen bg-pink-50/50">
    <SectionTitle icon={Calendar}>Calendario Real</SectionTitle>
    <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
      {UPCOMING_EVENTS.map(event => (
        <div key={event.id} className={`group relative bg-white rounded-3xl p-8 border transition-all duration-300 hover:shadow-xl ${event.highlight ? 'border-pink-400 shadow-pink-100 col-span-1 lg:col-span-2 flex flex-col md:flex-row gap-8 items-center' : 'border-white shadow-sm'}`}>
          {event.highlight && (
            <div className="absolute top-0 right-0 bg-pink-500 text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl">
              ¡IMPERDIBLE!
            </div>
          )}
          <div className={`${event.highlight ? 'md:w-1/3' : 'mb-6'} flex justify-center`}>
             <div className={`rounded-2xl flex items-center justify-center ${event.highlight ? 'bg-pink-100 w-full h-48' : 'bg-purple-50 w-16 h-16'}`}>
                {event.highlight ? <Coffee size={64} className="text-pink-400" /> : <Sparkles size={32} className="text-purple-400" />}
             </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 text-pink-500 text-sm font-bold uppercase tracking-wide mb-2">
              <Calendar size={14} /> {event.date}
            </div>
            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2 group-hover:text-pink-600 transition-colors">{event.title}</h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
              <MapPin size={14} /> {event.location}
            </div>
            <p className="text-slate-600 mb-6 leading-relaxed">{event.description}</p>
            <Button className={event.highlight ? "" : "w-full"} primary={event.highlight}>
              {event.highlight ? "Reservar Cupo" : "Más Información"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Componente Principal ---

export default function App() {
  const [view, setView] = useState('home'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const NavLink = ({ target, children, icon: Icon }) => (
    <button 
      onClick={() => {
        setView(target);
        setIsMenuOpen(false);
      }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all ${
        view === target 
          ? "bg-pink-100 text-pink-700" 
          : "text-slate-600 hover:bg-white/50 hover:text-pink-600"
      }`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-pink-200 selection:text-pink-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 left-0 px-4 py-4">
        <div className="bg-white/80 backdrop-blur-lg rounded-full border border-white/40 shadow-lg shadow-purple-100/50 container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-400 to-purple-500 rounded-full flex items-center justify-center text-white shadow-md">
              <Crown size={16} />
            </div>
            <span className="font-serif font-bold text-lg tracking-tight text-slate-800 hidden sm:block">
              Ladies The Gathering
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-2">
            <NavLink target="home">Inicio</NavLink>
            <NavLink target="events">Eventos</NavLink>
            <NavLink target="podcast">Podcast</NavLink>
            <NavLink target="manifesto">Manifiesto</NavLink>
            <div className="w-px h-6 bg-slate-200 mx-2"></div>
            <button className="flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-300">
              <Instagram size={16} /> Instagram
            </button>
          </div>

          <button className="lg:hidden text-slate-600 p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-white flex flex-col gap-2 animate-in slide-in-from-top-4">
            <NavLink target="home" icon={Sparkles}>Inicio</NavLink>
            <NavLink target="events" icon={Calendar}>Eventos</NavLink>
            <NavLink target="podcast" icon={Headphones}>Podcast</NavLink>
            <NavLink target="manifesto" icon={Scroll}>Manifiesto</NavLink>
            <hr className="border-slate-100 my-2" />
            <a href="https://instagram.com/ladiesthegathering" target="_blank" rel="noreferrer" className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-center flex items-center justify-center gap-2">
              <Instagram size={18} /> Instagram
            </a>
          </div>
        )}
      </nav>

      <main className="min-h-screen">
        {view === 'home' && <HomeView setView={setView} />}
        {view === 'events' && <EventsView />}
        {view === 'podcast' && <PodcastView />}
        {view === 'manifesto' && <ManifestoView />}
      </main>

      {/* Footer minimalista, la sección de Newsletter está arriba en Home */}
      <footer className="bg-white border-t border-purple-100 pt-16 pb-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center gap-2 justify-center mb-6">
             <Crown className="text-pink-500" />
             <span className="font-serif font-bold text-2xl text-slate-800">LTG</span>
          </div>
          <p className="text-slate-500 max-w-sm mx-auto mb-8">
            Construyendo un reino donde cada carta jugada es un lazo de amistad fortalecido.
          </p>
          <div className="border-t border-slate-100 pt-8 text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} Ladies The Gathering. Hecho con polvo de hadas y código.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
