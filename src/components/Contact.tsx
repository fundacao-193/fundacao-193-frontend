import { MapPin, Phone, Mail, Send } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contato" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block bg-[#3d685d]/10 text-[#3d685d] px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Entre em Contato
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-6">
            Vamos trabalhar juntos
          </h2>
          <p className="text-lg text-neutral-600">
            Tem uma dúvida ou deseja colaborar com a Fundação 193?
            Estamos prontos para atendê-lo.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="space-y-8 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#3d685d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-[#3d685d]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">Endereço</h3>
                  <p className="text-neutral-600">
                    SHS Quadra 6, Conjunto A, Bloco A
                    <br />
                    Sala 501 - Brasília-DF
                    <br />
                    CEP: 70316-102
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#3d685d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="text-[#3d685d]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">Telefone</h3>
                  <p className="text-neutral-600">
                    (61) 3321-3000
                    <br />
                    Seg à Sex: 8h às 18h
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-[#3d685d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="text-[#3d685d]" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-neutral-900 mb-1">E-mail</h3>
                  <p className="text-neutral-600">
                    contato@fundacao193.org.br
                    <br />
                    assessoria@fundacao193.org.br
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-neutral-50 rounded-xl p-6">
              <h3 className="font-bold text-neutral-900 mb-4">Horário de Atendimento</h3>
              <div className="space-y-2 text-neutral-600">
                <p>Segunda a Sexta: 8h às 18h</p>
                <p>Sábado e Domingo: Fechado</p>
                <p className="text-sm text-neutral-500 mt-4">
                  Para emergências, entre em contato diretamente com o CBMDF através do 193.
                </p>
              </div>
            </div>
          </div>

          <div>
            <form className="bg-neutral-50 rounded-xl p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Nome completo
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#3d685d] focus:ring-2 focus:ring-[#3d685d]/20 outline-none transition-all"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-900 mb-2">
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#3d685d] focus:ring-2 focus:ring-[#3d685d]/20 outline-none transition-all"
                    placeholder="seu@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#3d685d] focus:ring-2 focus:ring-[#3d685d]/20 outline-none transition-all"
                    placeholder="Como podemos ajudar?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-neutral-900 mb-2">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-neutral-300 focus:border-[#3d685d] focus:ring-2 focus:ring-[#3d685d]/20 outline-none transition-all resize-none"
                    placeholder="Escreva sua mensagem..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3d685d] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#2f5349] transition-all hover:shadow-lg hover:shadow-[#3d685d]/30 inline-flex items-center justify-center gap-2"
                >
                  Enviar mensagem
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
