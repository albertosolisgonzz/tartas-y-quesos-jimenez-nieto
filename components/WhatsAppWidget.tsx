'use client';

import { useState } from 'react';
import { X, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '34646927410';

export function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const handleSendMessage = () => {
        if (!message.trim()) return;
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
        setMessage('');
        setIsOpen(false);
    };

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
                    <div className="w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-stone-200">
                        {/* Header */}
                        <div className="bg-stone-800 text-white p-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-stone-700 flex items-center justify-center">
                                    <span className="font-serif font-bold">JN</span>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-serif text-base">Jimenez Nieto</h3>
                                    <p className="text-xs text-stone-300">Responde rápidamente</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1.5 hover:bg-stone-700 rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Chat */}
                        <div className="p-4 bg-stone-50 min-h-[120px]">
                            <div className="flex gap-2">
                                <div className="w-7 h-7 rounded-full bg-stone-800 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs font-bold">JN</span>
                                </div>
                                <div className="bg-white rounded-xl rounded-tl-sm p-3 shadow-sm border border-stone-200">
                                    <p className="text-sm text-stone-700">
                                        ¡Hola! 👋 ¿En qué podemos ayudarte?
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-white border-t border-stone-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Escribe tu mensaje..."
                                    className="flex-1 bg-stone-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-300"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!message.trim()}
                                    className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-white hover:bg-stone-700 disabled:opacity-40"
                                >
                                    <Send className="w-4 h-4" />
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
