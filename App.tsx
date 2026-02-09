
import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Activity,
  Magnet, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  Lock, 
  Clock, 
  Stamp, 
  ArrowRight,
  Menu,
  X,
  Send,
  Loader2,
  MessageCircle,
  BarChart3,
  Gavel,
  ShieldAlert,
  FileSearch
} from 'lucide-react';

// Configuração Global de Contato
const WHATSAPP_NUMBER = "5514997222999"; 

const getWhatsAppLink = (message: string) => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

// Types
interface FAQItemProps {
  question: string;
  answer: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Components
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/5 last:border-0 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left hover:text-[#D4AF37] transition-all"
      >
        <span className="text-lg font-medium pr-4 group-hover:pl-2 transition-all">{question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isOpen ? 'rotate-180 text-[#D4AF37]' : 'text-gray-600'}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] pb-8' : 'max-h-0'}`}>
        <p className="text-gray-400 leading-relaxed border-l-2 border-[#D4AF37]/30 pl-6 ml-1">
          {answer}
        </p>
      </div>
    </div>
  );
};

const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`flex items-center group cursor-pointer ${className}`}>
    <div className="relative w-10 h-10 flex items-center justify-center mr-3">
      <div className="absolute inset-0 border border-[#D4AF37]/40 rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
      <span className="text-[#D4AF37] font-light text-xl serif tracking-tighter relative z-10">T</span>
    </div>
    <div className="flex flex-col leading-none">
      <span className="text-lg font-light tracking-[0.3em] serif text-white group-hover:text-[#D4AF37] transition-colors uppercase">Teodoro</span>
      <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#D4AF37]/80">Auditoria</span>
    </div>
  </div>
);

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCTAClick = () => {
    const msg = "Olá, Teodoro Auditoria. Preciso de uma Análise Pericial de Elite AGORA para bloquear abusos bancários e proteger meu patrimônio.";
    window.open(getWhatsAppLink(msg), '_blank');
    setMobileMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/95 backdrop-blur-xl border-b border-[#D4AF37]/10 py-3' : 'bg-transparent py-8'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />

        <nav className="hidden md:flex items-center space-x-10 text-[11px] font-bold tracking-[0.2em]">
          <a href="#services" className="text-gray-400 hover:text-[#D4AF37] transition-colors uppercase">Serviços</a>
          <a href="#authority" className="text-gray-400 hover:text-[#D4AF37] transition-colors uppercase">Diferencial</a>
          <a href="#faq" className="text-gray-400 hover:text-[#D4AF37] transition-colors uppercase">Dúvidas</a>
          <button 
            onClick={handleCTAClick}
            className="bg-transparent border border-[#D4AF37]/50 text-[#D4AF37] px-8 py-3 hover:bg-[#D4AF37] hover:text-black transition-all duration-500"
          >
            FALAR COM PERITO
          </button>
        </nav>

        <button className="md:hidden text-[#D4AF37]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-2xl border-b border-[#D4AF37]/20 px-8 py-12 flex flex-col space-y-8 animate-in fade-in slide-in-from-top-5">
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl serif italic">Serviços Técnicos</a>
          <a href="#authority" onClick={() => setMobileMenuOpen(false)} className="text-xl serif italic">Diferencial de Elite</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-xl serif italic">Perguntas Frequentes</a>
          <button 
            onClick={handleCTAClick}
            className="bg-[#D4AF37] text-black py-5 font-bold tracking-widest uppercase text-sm"
          >
            ATENDIMENTO WHATSAPP
          </button>
        </div>
      )}
    </header>
  );
};

const ContactFormSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    const whatsappMsg = `Olá Teodoro Auditoria! Desejo uma análise técnica de abusividade.
Nome: ${formData.name}
E-mail: ${formData.email}
Telefone: ${formData.phone}
Dúvida: ${formData.message}`;
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => { window.open(getWhatsAppLink(whatsappMsg), '_blank'); }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-soft-black border-t border-white/5">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="w-24 h-24 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mx-auto mb-10 border border-[#D4AF37]/30">
            <CheckCircle2 className="w-12 h-12 text-[#D4AF37]" />
          </div>
          <h2 className="text-4xl serif mb-6 italic">Solicitação Enviada</h2>
          <p className="text-gray-400 text-lg mb-10">
            Você está sendo redirecionado para nossa mesa de operações. Um especialista em auditoria bancária assumirá seu caso em instantes.
          </p>
          <div className="inline-flex items-center space-x-3 text-[#D4AF37]">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-xs font-bold tracking-[0.3em] uppercase">Redirecionando WhatsApp...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-32 bg-soft-black relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div>
            <div className="text-[#D4AF37] text-xs font-bold tracking-[0.5em] uppercase mb-6">Protocolo de Elite</div>
            <h2 className="text-5xl md:text-6xl serif leading-tight mb-8">
              Inicie sua <br />
              <span className="italic text-[#D4AF37]">Análise Técnica</span>
            </h2>
            <p className="text-gray-400 text-xl leading-relaxed mb-12 max-w-lg">
              Nosso diagnóstico preliminar identifica se o seu contrato possui juros capitalizados ilegalmente ou tarifas abusivas ocultas.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <FileSearch className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="font-bold text-sm tracking-wider uppercase">Triagem Digital</h4>
                <p className="text-xs text-gray-500">Processamento algorítmico do seu contrato inicial.</p>
              </div>
              <div className="space-y-2">
                <ShieldAlert className="w-6 h-6 text-[#D4AF37] mb-2" />
                <h4 className="font-bold text-sm tracking-wider uppercase">Risco Zero</h4>
                <p className="text-xs text-gray-500">Análise técnica sem impacto no seu score.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/50 backdrop-blur-xl border border-white/10 p-10 md:p-16 shadow-2xl relative">
            <div className="absolute -top-px left-10 right-10 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 transition-colors group-focus-within:text-[#D4AF37]">Nome Completo</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#D4AF37] transition-all text-lg serif italic" placeholder="Seu nome" />
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="group">
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 group-focus-within:text-[#D4AF37]">E-mail</label>
                  <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="email@exemplo.com" />
                </div>
                <div className="group">
                  <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 group-focus-within:text-[#D4AF37]">WhatsApp</label>
                  <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="(00) 00000-0000" />
                </div>
              </div>
              <div className="group">
                <label className="block text-[10px] font-bold tracking-widest text-gray-500 uppercase mb-3 group-focus-within:text-[#D4AF37]">Contexto do Caso</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full bg-transparent border-b border-white/20 py-3 focus:outline-none focus:border-[#D4AF37] transition-all resize-none" placeholder="Ex: Financiamento de caminhão no banco X..."></textarea>
              </div>
              <button disabled={isSubmitting} className="w-full bg-[#D4AF37] text-black py-6 font-bold tracking-[0.3em] flex items-center justify-center hover:bg-white transition-all disabled:opacity-50">
                {isSubmitting ? <Loader2 className="animate-spin" /> : "SOLICITAR ANÁLISE DE ELITE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const App: React.FC = () => {
  const handleGeneralWA = (section: string) => {
    const msg = "Olá, Teodoro Auditoria. Preciso de uma Análise Pericial de Elite AGORA para bloquear abusos bancários e proteger meu patrimônio.";
    window.open(getWhatsAppLink(msg), '_blank');
  };

  return (
    <div className="min-h-screen selection:bg-[#D4AF37] selection:text-black">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 scale-110">
          <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2070" alt="Executive Office" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-12 h-px bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-xs font-bold tracking-[0.6em] uppercase">Auditoria Bancária de Elite</span>
            </div>
            <h1 className="text-6xl md:text-8xl serif leading-[0.9] mb-10">
              Juros abusivos? <br />
              <span className="text-[#D4AF37] italic">Nós paramos o banco.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl leading-relaxed font-light">
              Especialistas em auditoria administrativa para recuperação de valores e blindagem patrimonial de alta complexidade.
            </p>
            <div className="flex flex-col sm:flex-row space-y-6 sm:space-y-0 sm:space-x-8">
              <button 
                onClick={() => handleGeneralWA('Hero')}
                className="group relative px-10 py-6 bg-[#D4AF37] text-black font-bold tracking-[0.2em] overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  INICIAR ANÁLISE TÉCNICA <MessageCircle size={18} className="ml-3" />
                </span>
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </button>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="Client" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-white uppercase tracking-widest">+R$ 15M recuperados</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest italic">Casos de alta complexidade</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Section - EXPANDED DIFFERENTIAL */}
      <section id="authority" className="py-32 bg-soft-black border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mb-24">
            <h2 className="text-5xl md:text-6xl serif mb-8 italic">O que nos separa do mercado.</h2>
            <p className="text-gray-400 text-xl leading-relaxed">
              A Teodoro Auditoria não renegocia dívidas. Nós desconstruímos erros técnicos através de uma metodologia pericial avançada, garantindo conformidade total com as normas do BACEN.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Common Company */}
            <div className="bg-black/40 border border-white/5 p-12 relative grayscale group hover:grayscale-0 transition-all duration-700">
              <div className="flex items-center space-x-4 mb-12">
                <XCircle className="text-red-900 w-8 h-8" />
                <h3 className="text-xl font-bold tracking-[0.3em] uppercase text-gray-600 group-hover:text-red-900 transition-colors">Empresa Comum</h3>
              </div>
              <ul className="space-y-8">
                <li className="flex items-start space-x-6">
                  <span className="text-red-900 font-bold serif text-2xl">01</span>
                  <p className="text-gray-500 text-sm leading-relaxed">Abordagem baseada em "pedir descontos" ao gerente, dependendo da boa vontade do banco.</p>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-red-900 font-bold serif text-2xl">02</span>
                  <p className="text-gray-500 text-sm leading-relaxed">Promessas de "quitação milagrosa" sem nenhuma base técnica ou matemática real.</p>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-red-900 font-bold serif text-2xl">03</span>
                  <p className="text-gray-500 text-sm leading-relaxed">Dependência exclusiva de processos judiciais que podem levar 5 a 10 anos.</p>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-red-900 font-bold serif text-2xl">04</span>
                  <p className="text-gray-500 text-sm leading-relaxed">Foco em volume de clientes, tratando casos complexos como se fossem padrão.</p>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-red-900 font-bold serif text-2xl">05</span>
                  <p className="text-gray-500 text-sm leading-relaxed">Falta de conformidade com as diretrizes do Banco Central do Brasil.</p>
                </li>
              </ul>
            </div>

            {/* Teodoro Auditoria - HIGHLIGHTED */}
            <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 p-12 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-4">
                <Stamp className="text-[#D4AF37]/20 w-24 h-24 rotate-12" />
              </div>
              <div className="flex items-center space-x-4 mb-12">
                <CheckCircle2 className="text-[#D4AF37] w-8 h-8" />
                <h3 className="text-xl font-bold tracking-[0.3em] uppercase text-[#D4AF37]">Teodoro Auditoria</h3>
              </div>
              <ul className="space-y-8">
                <li className="flex items-start space-x-6">
                  <span className="text-[#D4AF37] font-bold serif text-2xl">01</span>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase">Análise Técnica de Elite</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Uso de algoritmos próprios para detectar anatocismo e taxas capitalizadas indevidamente.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-[#D4AF37] font-bold serif text-2xl">02</span>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase">Via Administrativa Resolutiva</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Notificações extrajudiciais com peso pericial que forçam o banco a reconhecer o erro sem tribunal.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-[#D4AF37] font-bold serif text-2xl">03</span>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase">Blindagem de Patrimônio</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Estratégias para proteção imediata de bens e fluxo de caixa corporativo/familiar.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-[#D4AF37] font-bold serif text-2xl">04</span>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase">Especialistas em Superendividamento</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Aplicação técnica da Lei 14.181/21 com foco na manutenção do mínimo existencial.</p>
                  </div>
                </li>
                <li className="flex items-start space-x-6">
                  <span className="text-[#D4AF37] font-bold serif text-2xl">05</span>
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-widest uppercase">Conformidade BACEN Pro</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Todos os protocolos seguem as diretrizes atualizadas do Conselho Monetário Nacional.</p>
                  </div>
                </li>
              </ul>
              <button 
                onClick={() => handleGeneralWA('Diferencial Técnico')}
                className="mt-12 w-full py-4 bg-[#D4AF37] text-black font-bold tracking-widest text-xs hover:bg-white transition-colors"
              >
                QUERO ESTA ANÁLISE NO MEU CONTRATO
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-5xl serif mb-6 italic">Soluções de Alta Performance.</h2>
              <p className="text-gray-400 text-lg">Para cada tipo de abuso, uma contraofensiva técnica precisa.</p>
            </div>
            <div className="h-px bg-[#D4AF37]/30 flex-grow mx-12 hidden md:block"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { 
                icon: Shield, 
                title: "Busca e Apreensão", 
                desc: "Análise técnica em tempo recorde para suspender liminares de apreensão de veículos e maquinário agrícola.",
                tag: "ALTA PRIORIDADE"
              },
              { 
                icon: Gavel, 
                title: "Superendividamento", 
                desc: "Aplicação técnica do Mínimo Existencial. Reorganização de dívidas com foco na saúde financeira familiar.",
                tag: "LEI 14.181/21"
              },
              { 
                icon: BarChart3, 
                title: "Revisão Corporativa", 
                desc: "Auditoria de capital de giro e conta garantida para empresas que sofrem com juros flutuantes abusivos.",
                tag: "FOCO CNPJ"
              }
            ].map((service, i) => (
              <div key={i} className="group p-10 bg-soft-black border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-700 hover:-translate-y-2">
                <div className="flex justify-between items-start mb-10">
                  <service.icon size={40} className="text-[#D4AF37] group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-[10px] font-bold tracking-widest text-gray-600 group-hover:text-[#D4AF37]">{service.tag}</span>
                </div>
                <h3 className="text-2xl serif mb-6 italic">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8 text-sm">{service.desc}</p>
                <button 
                  onClick={() => handleGeneralWA(service.title)}
                  className="flex items-center text-xs font-bold tracking-[0.3em] text-[#D4AF37] group-hover:pl-4 transition-all"
                >
                  AUDITAR AGORA <ArrowRight size={14} className="ml-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - RENAMED AND EXPANDED */}
      <section id="faq" className="py-32 bg-soft-black/50 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-24">
            <div>
              <div className="sticky top-32">
                <h2 className="text-5xl serif mb-8 italic text-[#D4AF37]">Perguntas <br /> Frequentes.</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-10">
                  Esclarecimentos técnicos sobre os protocolos de auditoria e segurança jurídica.
                </p>
                <div className="p-8 bg-black border border-[#D4AF37]/20">
                  <p className="text-xs font-bold tracking-widest text-[#D4AF37] mb-4">AINDA TEM DÚVIDAS?</p>
                  <p className="text-sm text-gray-500 mb-6 italic leading-relaxed">
                    Nossa mesa de atendimento técnico está online agora.
                  </p>
                  <button 
                    onClick={() => handleGeneralWA('Dúvida FAQ')}
                    className="w-full py-4 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all"
                  >
                    FALAR COM UM PERITO
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="space-y-2">
                <FAQItem 
                  question="A análise técnica é válida para contratos antigos?" 
                  answer="Sim. Podemos auditar contratos ativos e até mesmo contratos já quitados nos últimos 05 anos. A análise técnica identifica cobranças indevidas retroativas que geram direito à restituição em dobro conforme o CDC." 
                />
                <FAQItem 
                  question="Existe risco do banco cortar meu crédito ou score?" 
                  answer="Não. Auditar um contrato é um direito constitucional do consumidor. Pelo contrário, bancos tendem a respeitar clientes que demonstram vigilância técnica sobre seus contratos, pois isso reduz o risco de inadimplência litigiosa." 
                />
                <FAQItem 
                  question="A Teodoro atende empresas (CNPJ)?" 
                  answer="Somos especialistas em auditoria corporativa. Analisamos cédulas de crédito bancário (CCB), capital de giro e financiamentos de frotas ou maquinário agrícola, onde as abusividades costumam ser em escala multimilionária." 
                />
                <FAQItem 
                  question="Quanto custa a auditoria e os honorários?" 
                  answer="O diagnóstico preliminar é realizado para validar a viabilidade do caso. Nossos honorários são estruturados com base no benefício econômico gerado, garantindo que o investimento na auditoria seja sempre inferior à economia obtida no banco." 
                />
                <FAQItem 
                  question="Como funciona o redirecionamento via administrativa?" 
                  answer="Através da análise técnica algorítmica, emitimos uma notificação extrajudicial com fundamentação normativa. O banco, diante da prova irrefutável do erro, geralmente opta pela retificação do saldo devedor para evitar sanções administrativas do BACEN." 
                />
                <FAQItem 
                  question="A análise técnica pode parar um leilão de imóvel?" 
                  answer="Sim, desde que identificada nulidade técnica no procedimento de consolidação da propriedade ou abusividade no cálculo do saldo devedor. Casos imobiliários recebem tratamento de urgência em nossa mesa de operações." 
                />
                <FAQItem 
                  question="Qual a diferença entre vocês e um advogado comum?" 
                  answer="O advogado comum foca no processo jurídico. A Teodoro foca na matemática pericial. Nossa força vem da Análise Técnica inquestionável que precede a ação judicial, permitindo resoluções muito mais rápidas e precisas." 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Contact Form Section */}
      <ContactFormSection />

      {/* Final CTA / Footer */}
      <footer className="bg-black pt-32 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-32">
            <h2 className="text-5xl md:text-7xl serif italic mb-12">O banco não espera. <br /> <span className="text-[#D4AF37] not-italic">Você também não deve.</span></h2>
            <button 
              onClick={() => handleGeneralWA('Botão Final')}
              className="px-16 py-8 bg-[#D4AF37] text-black font-bold tracking-[0.4em] hover:scale-105 transition-all shadow-[0_20px_60px_rgba(212,175,55,0.2)]"
            >
              FALAR COM A ELITE AGORA
            </button>
          </div>
          
          <div className="grid md:grid-cols-4 gap-16 border-t border-white/5 pt-20">
            <div className="md:col-span-2">
              <Logo className="mb-8" />
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Inteligência pericial e estratégica para enfrentamento bancário de alta complexidade. Proteção patrimonial com rigor técnico e conformidade normativa.
              </p>
            </div>
            <div>
              <h5 className="text-[#D4AF37] font-bold text-xs tracking-widest uppercase mb-8">Navegação</h5>
              <ul className="space-y-4 text-gray-500 text-sm uppercase tracking-widest font-bold text-[10px]">
                <li><a href="#services" className="hover:text-white transition-colors">Serviços</a></li>
                <li><a href="#authority" className="hover:text-white transition-colors">Diferencial</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Perguntas Frequentes</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-[#D4AF37] font-bold text-xs tracking-widest uppercase mb-8">Base de Operações</h5>
              <p className="text-gray-500 text-sm leading-relaxed">
                Rua Ulisses Ferrari, nº78 - Jardim Tropical. Avaré/SP.
              </p>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-600 tracking-[0.3em] uppercase">
            <p>© 2024 Teodoro Auditoria Bancária. Todos os direitos reservados.</p>
            <p className="mt-4 md:mt-0 italic font-serif">A elite em enfrentamento bancário.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
