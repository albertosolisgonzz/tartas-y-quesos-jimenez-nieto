'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { X, Send, Smile } from 'lucide-react';

const WHATSAPP_NUMBER = '34646927410';

// Respuestas rápidas: al pulsarlas se abre WhatsApp con el mensaje ya escrito
const QUICK_REPLIES = [
    'Quiero hacer un pedido 🧀',
    'Quiero encargar una tarta 🎂',
    '¿Cuánto tarda el envío?',
    'Quiero saber más de las promos de 9 €',
];

// Patrón de garabatos sutil, al estilo del fondo de chat de WhatsApp
const CHAT_PATTERN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='84' height='84' viewBox='0 0 84 84'%3E%3Cg fill='none' stroke='%23d5ccc2' stroke-width='1.2' opacity='0.55'%3E%3Ccircle cx='14' cy='16' r='4'/%3E%3Cpath d='M60 10c3 0 5 2 5 5M38 32l4 4M42 32l-4 4'/%3E%3Ccircle cx='70' cy='46' r='3'/%3E%3Cpath d='M12 58c2-3 6-3 8 0M52 66c0-3 2-5 5-5M24 78l3 3M27 78l-3 3'/%3E%3C/g%3E%3C/svg%3E")`;

export function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [now, setNow] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNow(new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }));
        }
    }, [isOpen]);

    const openWhatsApp = (text: string) => {
        if (!text.trim()) return;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
        setMessage('');
        setIsOpen(false);
    };

    const handleSendMessage = () => openWhatsApp(message);

    return (
        <>
            {/* Chat Panel - Fixed to viewport */}
            {isOpen && (
                <div
                    style={{
                        position: 'fixed',
                        bottom: '100px',
                        right: '24px',
                        zIndex: 9999,
                    }}
                >
                    <div className="w-[330px] rounded-2xl shadow-2xl overflow-hidden animate-scale-in origin-bottom-right">
                        {/* Cabecera estilo WhatsApp */}
                        <div className="bg-[#008069] text-white px-3 py-2.5">
                            <div className="flex items-center gap-2.5">
                                <div className="relative w-10 h-10 rounded-full bg-white overflow-hidden shrink-0 ring-1 ring-black/10">
                                    <Image
                                        src="/images/logo-jimenez-nieto.png"
                                        alt=""
                                        fill
                                        className="object-contain p-0.5"
                                        sizes="40px"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[15px] font-semibold leading-tight truncate">Jiménez Nieto</p>
                                    <p className="text-xs text-white/80 leading-tight">Cuenta de empresa</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                    aria-label="Cerrar chat"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Conversación */}
                        <div
                            className="px-3 pt-3 pb-2 h-[340px] bg-[#ECE5DD] flex flex-col overflow-y-auto"
                            style={{ backgroundImage: CHAT_PATTERN }}
                        >
                            {/* Chip de fecha */}
                            <div className="flex justify-center mb-3">
                                <span className="bg-white/95 text-[#54656F] text-[11px] px-2.5 py-1 rounded-md shadow-sm uppercase tracking-wide">
                                    Hoy
                                </span>
                            </div>

                            {/* Mensaje entrante */}
                            <div className="relative max-w-[85%]">
                                {/* Pico de la burbuja */}
                                <svg
                                    className="absolute -left-[7px] top-0 w-2 h-3 text-white"
                                    viewBox="0 0 8 12"
                                    aria-hidden="true"
                                >
                                    <path d="M8 0 L0 0 C4 3 6.5 7 8 12 Z" fill="currentColor" transform="scale(-1,1) translate(-8,0)" />
                                </svg>
                                <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 shadow-[0_1px_1px_rgba(0,0,0,0.08)]">
                                    <p className="text-[14px] leading-snug text-[#111B21]">
                                        ¡Hola! 👋 ¿En qué podemos ayudarte?
                                    </p>
                                    <span className="block text-right text-[10px] text-[#667781] mt-0.5 leading-none">
                                        {now}
                                    </span>
                                </div>
                            </div>

                            {/* Respuestas rápidas */}
                            <div className="mt-auto pt-4 flex flex-col items-end gap-1.5">
                                {QUICK_REPLIES.map((reply) => (
                                    <button
                                        key={reply}
                                        onClick={() => openWhatsApp(reply)}
                                        className="bg-white text-[#008069] border border-[#00A884]/50 text-[13px] px-3.5 py-1.5 rounded-full shadow-sm hover:bg-[#00A884] hover:text-white hover:border-[#00A884] transition-colors text-left"
                                    >
                                        {reply}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Barra de escritura */}
                        <div
                            className="px-2 pb-2 pt-1 bg-[#ECE5DD]"
                            style={{ backgroundImage: CHAT_PATTERN }}
                        >
                            <div className="flex items-end gap-1.5">
                                <div className="flex-1 flex items-center gap-1.5 bg-white rounded-full pl-2.5 pr-3 py-1">
                                    <Smile className="w-5 h-5 text-[#8696A0] shrink-0" aria-hidden="true" />
                                    <input
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Escribe un mensaje"
                                        className="flex-1 min-w-0 bg-transparent py-1.5 text-[14px] text-[#111B21] placeholder:text-[#8696A0] focus:outline-none"
                                    />
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="w-10 h-10 shrink-0 bg-[#00A884] rounded-full flex items-center justify-center text-white hover:bg-[#008f70] transition-colors disabled:opacity-60"
                                    aria-label="Enviar mensaje por WhatsApp"
                                >
                                    <Send className="w-4 h-4 translate-x-[1px]" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* WhatsApp Button - Fixed to viewport */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    zIndex: 9999,
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: isOpen ? '#44403c' : '#25D366',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                    border: 'none',
                    cursor: 'pointer',
                }}
                aria-label="Abrir chat de WhatsApp"
            >
                {isOpen ? (
                    <X style={{ width: '24px', height: '24px', color: 'white' }} />
                ) : (
                    <svg
                        viewBox="0 0 24 24"
                        fill="white"
                        style={{ width: '28px', height: '28px' }}
                    >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                )}
            </button>
        </>
    );
}
