import { useState, useEffect } from 'react';

export function useSlotsDisponiveis(nutricionistaId, dataInicio, dataFim) {
    const [slots, setSlots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!nutricionistaId || !dataInicio || !dataFim) return;

        const buscarSlots = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/nutricionista/horario-fixo/slots-disponiveis?` +
                    `nutricionista_id=${nutricionistaId}&data_inicio=${dataInicio}&data_fim=${dataFim}`
                );

                if (!response.ok) {
                    throw new Error('Erro ao buscar slots disponíveis');
                }

                const data = await response.json();
                setSlots(data.slots || []);
            } catch (err) {
                console.error('Erro ao buscar slots:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        buscarSlots();
    }, [nutricionistaId, dataInicio, dataFim]);

    return { slots, loading, error };
}
