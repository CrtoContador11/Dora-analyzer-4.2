import React, { useState } from 'react';

interface QuestionnaireStarterProps {
  language: 'es' | 'pt';
  onStartQuestionnaire: (providerName: string, financialEntityName: string, userName: string) => void;
}

const QuestionnaireStarter: React.FC<QuestionnaireStarterProps> = ({ language, onStartQuestionnaire }) => {
  const [financialEntityName, setFinancialEntityName] = useState('');
  const [providerName, setProviderName] = useState('');
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');
  const meo = 'Meo'; // Variable Meo for future use in questions

  const departmentOptions = [
    { value: 'dept1', label: { es: 'Departamento 1', pt: 'Serviços de Cloud & Data Center' } },
    { value: 'dept2', label: { es: 'Departamento 2', pt: 'Serviços de Dados & Internet fixo e móvel' } },
    { value: 'dept3', label: { es: 'Departamento 3', pt: 'Serviços de Segurança' } },
    { value: 'dept4', label: { es: 'Departamento 4', pt: 'Serviços de Comunicação Unificadas' } },
    { value: 'dept5', label: { es: 'Departamento 5', pt: 'Serviços IoT Connect' } },
  ];

  const handleStartQuestionnaire = () => {
    if (!providerName.trim() || !financialEntityName.trim() || !userName.trim()) {
      setError(language === 'es' 
        ? 'Por favor, complete todos los campos.' 
        : 'Por favor, preencha todos os campos.');
      return;
    }
    setError('');
    onStartQuestionnaire(providerName, financialEntityName, userName);
  };

  return (
    <div className="bg-white shadow-md rounded px-4 sm:px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
        {language === 'es' ? 'Iniciar Cuestionario DORA' : 'Iniciar Questionário DORA'}
      </h2>
      
      {/* Financial Entity Name - First field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="financialEntityName">
          {language === 'es' ? 'Nombre de la Entidad Financiera' : 'Nome da Entidade Financeira'}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="financialEntityName"
          type="text"
          value={financialEntityName}
          onChange={(e) => setFinancialEntityName(e.target.value)}
          placeholder={language === 'es' ? 'Ingrese el nombre de la entidad financiera' : 'Digite o nome da entidade financeira'}
        />
      </div>

      {/* Department/Torre de Serviços - Second field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="providerName">
          {language === 'es' ? 'Departamento' : 'Torre de Serviços'}
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="providerName"
          value={providerName}
          onChange={(e) => setProviderName(e.target.value)}
        >
          <option value="">
            {language === 'es' ? 'Seleccione un departamento' : 'Selecione uma torre de serviços'}
          </option>
          {departmentOptions.map((dept) => (
            <option key={dept.value} value={dept.value}>
              {dept.label[language]}
            </option>
          ))}
        </select>
      </div>

      {/* User Name - Third field */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
          {language === 'es' ? 'Nombre de usuario' : 'Nome de usuário'}
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="userName"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          placeholder={language === 'es' ? 'Ingrese su nombre de usuario' : 'Digite seu nome de usuário'}
        />
      </div>

      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      
      <button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleStartQuestionnaire}
      >
        {language === 'es' ? 'Comenzar cuestionario' : 'Iniciar questionário'}
      </button>
    </div>
  );
};

export default QuestionnaireStarter;
