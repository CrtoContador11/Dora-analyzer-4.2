import { Question, Category } from './types';

export const MEO = 'Meo'; // Constant for use in questions

export const questions: Question[] = [
  {
    id: 1,
    text: {
      es: `¿${MEO} ha verificado que {financialEntityName} está trabajando en el cumplimiento del reglamento DORA?`,
      pt: `${MEO} verificou que {financialEntityName} está a trabalhar no cumprimento do regulamento DORA?`
    },
    categoryId: 1,
    options: [
      { text: { es: "Sí", pt: "Sim" }, value: 100 },
      { text: { es: "Parcialmente", pt: "Parcialmente" }, value: 50 },
      { text: { es: "No", pt: "Não" }, value: 0 },
      { text: { es: "No sé", pt: "Não sei" }, value: 25 },
      { text: { es: "No aplica", pt: "Não se aplica" }, value: -1 }
    ]
  },
  {
    id: 2,
    text: {
      es: `¿{financialEntityName} ha solicitado a ${MEO} información sobre algún aspecto de cumplimiento de DORA?`,
      pt: `{financialEntityName} solicitou a ${MEO} informações sobre algum aspeto de conformidade com o DORA?`
    },
    categoryId: 1,
    options: [
      { text: { es: "Sí", pt: "Sim" }, value: 100 },
      { text: { es: "Parcialmente", pt: "Parcialmente" }, value: 50 },
      { text: { es: "No", pt: "Não" }, value: 0 },
      { text: { es: "No sé", pt: "Não sei" }, value: 25 },
      { text: { es: "No aplica", pt: "Não se aplica" }, value: -1 }
    ]
  },
  {
    id: 3,
    text: {
      es: "¿{providerName} mantiene un inventario actualizado de los activos TIC que soportan los servicios prestados a {financialEntityName}?",
      pt: "{providerName} mantém um inventário atualizado dos ativos TIC que suportam os serviços prestados a {financialEntityName}?"
    },
    categoryId: 2,
    options: [
      { text: { es: "Sí", pt: "Sim" }, value: 100 },
      { text: { es: "Parcialmente", pt: "Parcialmente" }, value: 50 },
      { text: { es: "No", pt: "Não" }, value: 0 },
      { text: { es: "No sé", pt: "Não sei" }, value: 25 },
      { text: { es: "No aplica", pt: "Não se aplica" }, value: -1 }
    ]
  },
  {
    id: 4,
    text: {
      es: `¿${MEO} ha proporcionado a {financialEntityName} toda la documentación necesaria sobre seguridad?`,
      pt: `${MEO} forneceu a {financialEntityName} toda a documentação necessária sobre segurança?`
    },
    categoryId: 2,
    options: [
      { text: { es: "Sí", pt: "Sim" }, value: 100 },
      { text: { es: "Parcialmente", pt: "Parcialmente" }, value: 50 },
      { text: { es: "No", pt: "Não" }, value: 0 },
      { text: { es: "No sé", pt: "Não sei" }, value: 25 },
      { text: { es: "No aplica", pt: "Não se aplica" }, value: -1 }
    ]
  },
  {
    id: 5,
    text: {
      es: "¿Se han realizado pruebas de seguridad en los últimos 6 meses?",
      pt: "Foram realizados testes de segurança nos últimos 6 meses?"
    },
    categoryId: 3,
    options: [
      { text: { es: "Sí", pt: "Sim" }, value: 100 },
      { text: { es: "Parcialmente", pt: "Parcialmente" }, value: 50 },
      { text: { es: "No", pt: "Não" }, value: 0 },
      { text: { es: "No sé", pt: "Não sei" }, value: 25 },
      { text: { es: "No aplica", pt: "Não se aplica" }, value: -1 }
    ]
  }
];

export const categories: Category[] = [
  {
    id: 1,
    name: {
      es: "Cumplimiento Normativo",
      pt: "Conformidade Regulamentar"
    }
  },
  {
    id: 2,
    name: {
      es: "Gestión de Activos",
      pt: "Gestão de Ativos"
    }
  },
  {
    id: 3,
    name: {
      es: "Seguridad y Pruebas",
      pt: "Segurança e Testes"
    }
  }
];