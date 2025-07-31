import { SummaryRow } from './type/type';

interface Props {
  summary: SummaryRow[];
}

export const SummaryByTypeCards: React.FC<Props> = ({ summary }) => {
  const typeOptions = [
    {
      value: 'SOUFFLAGE',
      label: 'Soufflage',
      icon: '→',
      bgClass: 'bg-green-50',
      txtClass: 'text-green-600',
    },
    {
      value: 'REPRISE',
      label: 'Reprise',
      icon: '←',
      bgClass: 'bg-purple-50',
      txtClass: 'text-purple-600',
    },
    {
      value: 'EXTRACTION',
      label: 'Extraction',
      icon: '↑',
      bgClass: 'bg-orange-50',
      txtClass: 'text-orange-600',
    },
  ];
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {summary.map((row) => {
        const opt = typeOptions.find((o) => o.value === row.type)!;
        return (
          <div key={row.type} className={`rounded-lg p-3 ${opt.bgClass}`}>
            <p className={`pb-2 text-xs ${opt.txtClass}`}>{opt.label}</p>
            <div className="flex flex-col gap-1">
              <p className="text-gray-800">Total bouches: {row.totalCount}</p>
              <p className="text-gray-800">
                Débit théorique: {row.totalTheorique} m³/h
              </p>
              <p className="text-gray-800">
                Débit mesuré: {row.totalMesure} m³/h
              </p>
              <p className="font-bold text-gray-800">
                Écart global:{' '}
                <span
                  className={`text-lg font-semibold ${
                    row.errorPct <= 10
                      ? 'text-green-600'
                      : row.errorPct <= 20
                        ? 'text-orange-600'
                        : 'text-red-600'
                  }`}
                >
                  {row.errorPct > 0 ? '+' : ''}
                  {row.errorPct}%
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
